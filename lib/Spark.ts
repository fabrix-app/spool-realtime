import {FabrixGeneric as Generic, FabrixModel} from '@fabrix/fabrix/dist/common'

/**
 * @module Spark
 * @description Spark
 */
export class Spark extends Generic {
  connection(spark) {
    throw new Error('Connection should be overwritten by sub class!')
  }
  disconnection(spark) {
    throw new Error('Disconnection should be overwritten by sub class!')
  }
}
