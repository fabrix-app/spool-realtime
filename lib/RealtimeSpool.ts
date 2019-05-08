import { Spool } from '@fabrix/fabrix/dist/common'
import { Utils as RouterUtils } from '@fabrix/spool-router'
import * as Primus from 'primus'

const primusDefaults = {
  transformer: 'engine.io'
}

import * as Validator from './validator'

import * as api from './api/index'
import * as config from './config/index'
import * as pkg from '../package.json'

export class RealtimeSpool extends Spool {
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
    const listener = isExpress ? 'webserver:http' : 'webserver:http:ready'
    const pathname = this.app.config.get('realtime.prefix') ? `${this.app.config.get('realtime.prefix')}/primus` : 'primus'

    // The path for primus/primus.js
    const path = this.app.config.get('realtime.path') || this.app.config.get('main.paths.www') || __dirname

    const primusConfig = Object.assign(
      {},
      { pathname: pathname },
      this.app.config.get('realtime.primus')
    )

    const plugins = this.app.config.get('realtime.plugins') || {}

    return new Promise((resolve, reject) => {
      this.app.once(listener, (httpServer) => {

        if (Array.isArray(httpServer)) {
          httpServer = httpServer[0]
        }

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

        try {
          Object.keys(plugins).forEach(k => {
            this._sockets.use(k, plugins[k])
          })
        }
        catch (err) {
          reject(err)
        }

        // Attach spark connection events
        Object.keys(this.app.sparks || {}).forEach(k => {
          this.sockets.on('connection', this.app.sparks[k].connection)
        })

        // Attach spark disconnection events
        Object.keys(this.app.sparks || {}).forEach(k => {
          this.sockets.on('disconnection', this.app.sparks[k].disconnection)
        })

        this._sockets.save(path + '/primus.js', function save(err) {
          if (err) {
            return reject(err)
          }
          return resolve()
        })
      })
    })
  }

  /**
   * Unload primus
   */
  async unload() {
    this._sockets.destroy({ timeout: 5000 })
    return Promise.resolve()
  }

  /**
   * Perform a Sanity Check
   */
  async sanity() {
    return Promise.resolve()
      .then( () => {
        if (!this._sockets) {
          throw new Error('Sockets does not exist')
        }
        return
      })
      .then( () => {
        if (!this._sockets.Spark) {
          throw new Error('Socket Spark does not exist')
        }
        return
      })
      .catch(err => {
        return Promise.reject(err)
      })
  }
}
