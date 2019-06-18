
import joi from 'joi'

export const realtimeConfig =  joi.object().keys({
  path: joi.string().allow(null, ''),
  prefix: joi.string().allow(null, ''),
  primus: joi.object(),
  plugins: joi.object()
})
