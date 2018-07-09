import { Spool } from '@fabrix/fabrix/dist/common'
import * as Primus from 'primus'

const primusDefaults = {
  transformer: 'engine.io'
}

import * as config from './config/index'
import * as pkg from '../package.json'

export class RealtimeSpool extends Spool {
  private _sockets

  constructor(app) {
    super(app, {
      config: config,
      pkg: pkg,
      api: {}
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

  async initialize() {
    return new Promise((resolve, reject) => {
      this.app.once('webserver:http:ready', (httpServer) => {
        if (Array.isArray(httpServer)) {
          httpServer = httpServer[0]
        }
        const primusConfig = this.app.config.get('realtime.primus')
        this._sockets = new Primus(httpServer, Object.assign(primusDefaults, primusConfig.options))
        return resolve()
      })
    })
  }
}
