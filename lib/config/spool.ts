/**
 * Trailpack Configuration
 *
 * @see {@link http://fabrixjs.io/doc/trailpack/config
 */
export const spool = {

  /**
   * API and config resources provided by this Trailpack.
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
   * Configure the lifecycle of this pack; that is, how it boots up, and which
   * order it loads relative to other trailpacks.
   */
  lifecycle: {
    configure: {
      /**
       * List of events that must be fired before the configure lifecycle
       * method is invoked on this Trailpack
       */
      listen: [ ],

      /**
       * List of events emitted by the configure lifecycle method
       */
      emit: [ ]
    },
    initialize: {
      listen: [ ],
      emit: [ ]
    }
  }
}
