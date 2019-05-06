
import * as joi from 'joi'

export const realtimeConfig =  joi.object().keys({
  primus: joi.object(),
  plugins: joi.object()
})
