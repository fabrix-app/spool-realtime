import { FabrixGeneric as Generic } from '@fabrix/fabrix/dist/common'

/**
 * @module Spark
 * @description Spark
 */
export class Spark extends Generic {
  private _sparks = new Map()

  get sparks () {
    return this._sparks
  }

  getSpark(key) {
    return this._sparks.get(key)
  }

  addSpark(key, spark) {
    return this._sparks.set(key, spark)
  }

  removeSpark(key) {
    return this._sparks.delete(key)
  }

  connection(spark) {
    throw new Error('Connection should be overwritten by sub class!')
  }

  disconnection(spark) {
    throw new Error('Disconnection should be overwritten by sub class!')
  }
}
