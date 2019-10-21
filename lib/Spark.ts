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

  /**
   * When a connection starts from a client, the spark will be here
   * @param spark
   */
  connection(spark) {
    throw new Error('Connection should be overwritten by sub class!')
  }

  /**
   * When a connection sends data, it's the responsibility of the Spark class to filter it.
   * @param spark
   */
  data(spark) {
    throw new Error('Data should be overwritten by sub class!')
  }

  /**
   * When a connection is lost from a client, the spark will be here
   * @param spark
   */
  disconnection(spark) {
    throw new Error('Disconnection should be overwritten by sub class!')
  }
}
