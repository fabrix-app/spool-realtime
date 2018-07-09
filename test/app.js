'use strict'

const _ = require('lodash')
const smokesignals = require('smokesignals')

module.exports = _.defaultsDeep({
  pkg: {
    name: require('../package').name + '-test'
  },
  api: {},
  config: {
    main: {
      spools: [
        require('@fabrix/spool-router').RouterSpool,
        require('@fabrix/spool-hapi').HapiSpool,
        require('../dist').RealtimeSpool
      ]
    }
  }
}, smokesignals.FailsafeConfig)


