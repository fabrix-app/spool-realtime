/**
 * Spool Configuration
 *
 * @see {@link https://fabrix.app/docs/spools/config
 */
export const spool = {

  /**
   * API and config resources provided by this Spool.
   */
  provides: {
    resources: [],
    api: {
      controllers: [ ]
      // ...
    },
    config: [ ]
  },

  /**
   * Configure the lifecycle of this spool; that is, how it boots up, and which
   * order it loads relative to other spools.
   */
  lifecycle: {
    configure: {
      /**
       * List of events that must be fired before the configure lifecycle
       * method is invoked on this Spool
       */
      listen: [ 'spool:router:configured'],

      /**
       * List of events emitted by the configure lifecycle method
       */
      emit: [ ]
    },
    initialize: {
      listen: [ 'spool:router:initialized'],
      emit: [ ]
    }
  }
}
