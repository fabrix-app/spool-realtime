import { ExtensionSpool } from '@fabrix/fabrix/dist/common/spools/extension'
import { SanityError } from '@fabrix/fabrix/dist/errors'

import * as api from './api/index'
import * as config from './config/index'
import * as pkg from '../package.json'

import * as Validator from './validator'

import Primus from 'primus'

const primusDefaults = {
  transformer: 'engine.io'
}

export class RealtimeSpool extends ExtensionSpool {
  private _sockets

  constructor(app) {
    super(app, {
      config: config,
      pkg: pkg,
      api: api
    })

    this.extensions = {
      sockets : {
        get: () => {
          return this.sockets
        },
        set: (newValue) => {
          throw new Error('sockets can not be set through FabrixApp, check spool-realtime instead')
        },
        enumerable: true,
        configurable: true
      }
    }
    return this

  }

  /**
   * Alias for _sockets for access from app.sockets
   */
  get sockets () {
    return this._sockets
  }

  /**
   * Validates Configs
   */
  async validate () {

    const requiredSpools = [
      'router'
    ]

    const spools = Object.keys(this.app.spools)

    if (!spools.some(v => requiredSpools.indexOf(v) >= 0)) {
      return Promise.reject(new Error(`spool-realtime requires spools: ${ requiredSpools.join(', ') }!`))
    }

    return Promise.all([
      Validator.validateConfig.config(this.app.config.get('realtime')),
    ])
  }

  async initialize() {

    const isExpress = this.app.config.get('web.server') === 'express'

    // The emitted event when a server is created by common webserver spools
    const listener = isExpress
      ? 'webserver:http'
      : 'webserver:http:ready'

    // The path name for the sockets
    // Servers will connect at https://myserver.com/<path>/primus
    const pathname = this.app.config.get('realtime.prefix')
      ? `${this.app.config.get('realtime.prefix')}/primus`
      : 'primus'

    this.app.log.debug('Realtime: Primus Socket Path:', `/${pathname}`)

    // The path for client\'s primus/primus.js
    // Uses either the main www path, or the one supplied in the config.realtime.path
    const path = this.app.config.get('realtime.path')
      || this.app.config.get('main.paths.www')
      || __dirname

    this.app.log.debug('Realtime: Primus JS Path:', `/${path}/primus.js`)

    // The configuration fo the Primus instance
    const primusConfig = Object.assign(
      {},
      { pathname: pathname },
      this.app.config.get('realtime.primus')
    )

    // The plugins for primus to use: key/value in realtime.plugins
    const plugins = this.app.config.get('realtime.plugins') || {}

    this.app.emit('sockets:starting')

    // Wrap in a promise to listen for the webserver event
    return new Promise((resolve, reject) => {
      this.app.once(listener, (httpServer) => {

        // Fabrix can run more than one http server,
        // TODO, make selecting a webserver configurable
        if (Array.isArray(httpServer)) {
          httpServer = httpServer[0]
        }

        // Try creating Primus instance
        try {
          this._sockets = Primus(httpServer, Object.assign(
            {},
            primusConfig.options,
            primusDefaults
          ))
        }
        catch (err) {
          this.app.log.error('Primus failed to create', err)
          reject(err)
        }

        // Try Loading the Plugins
        try {
          Object.keys(plugins).forEach(k => {
            this._sockets.plugin(k, plugins[k])
          })
        }
        catch (err) {
          reject(err)
        }

        // Attach spark connection events to all App Sparks
        Object.keys(this.app.sparks || {}).forEach(k => {
          this._sockets.on('connection', this.app.sparks[k].connection)

          if (this.app.sparks[k].data) {
            this._sockets.on('incoming::data', this.app.sparks[k].data)
          }

          if (this.app.sparks[k].initialised) {
            this._sockets.on('initialised', this.app.sparks[k].initialised)
          }

          if (this.app.sparks[k].plugin) {
            this._sockets.on('plugin', this.app.sparks[k].plugin)
          }

          if (this.app.sparks[k].plugout) {
            this._sockets.on('plugout', this.app.sparks[k].plugout)
          }

          if (this.app.sparks[k].log) {
            this._sockets.on('log', this.app.sparks[k].log)
          }

          if (this.app.sparks[k].end) {
            this._sockets.on('end', this.app.sparks[k].end)
          }

          if (this.app.sparks[k].close) {
            this._sockets.on('close', this.app.sparks[k].close)
          }

          this._sockets.on('disconnection', this.app.sparks[k].disconnection)
        })

        // Create the client file on this application
        // TODO, make configurable to serve a CDN version
        this._sockets.save(path + '/primus.js', function save(err) {
          if (err) {
            return reject(err)
          }
          return resolve()
        })
      })
    })
      .then(() => {
        this.app.emit('sockets:ready', this._sockets)
        return
      })
  }

  /**
   * Unload primus
   */
  async unload() {
    return new Promise((resolve, reject) => {

      this.app.emit('sockets:stopping', this._sockets)

      // TODO fix this
      this.sockets.on('destroy', function () {
        this.app.log.debug('primus destroyed')
        // return resolve()
      })

      // Timeout gives sockets sometime to disconnect before calling primus.end
      this.sockets.destroy(this.app.config.get('realtime.destroy'))
      return resolve()
    })
  }

  /**
   * Perform a Sanity Check
   */
  async sanity() {
    return Promise.resolve()
      .then( () => {
        if (!this._sockets) {
          throw new SanityError('Sockets does not exist')
        }
        return
      })
      .then( () => {
        if (!this._sockets.Spark) {
          throw new SanityError('Socket Spark does not exist')
        }
        return
      })
      .catch(err => {
        return Promise.reject(err)
      })
  }
}
