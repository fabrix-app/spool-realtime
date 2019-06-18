import joi from 'joi'
import { realtimeConfig } from '../schemas/realtimeConfig'

export const validateConfig = {
  config(config) {
    return new Promise((resolve, reject) => {
      joi.validate(config, realtimeConfig, (err, value) => {
        if (err) {
          return reject(new TypeError('config.realtime: ' + err))
        }
        return resolve(value)
      })
    })
  }
}
