'use strict'

const _ = require('lodash')
const smokesignals = require('smokesignals')
const PrimusRedisRooms = require('primus-redis-rooms')

module.exports = _.defaultsDeep({
  pkg: {
    name: require('../../package').name + '-test'
  },
  api: {},
  config: {
    main: {
      spools: [
        require('@fabrix/spool-router').RouterSpool,
        require('@fabrix/spool-express').ExpressSpool,
        require('../../dist').RealtimeSpool
      ]
    },
    web: {
      express: require('express'),
      middlewares: {
        order: [
          'static',
          'addMethods',
          'cookieParser',
          'session',
          'bodyParser',
          'methodOverride',
          'router',
          'www',
          '404',
          '500'
        ],
        static: require('express').static('test/static')
      }
    },
    realtime: {
      primus: {
        redis: {
          host: 'localhost',
          port: 6379,
          channel: 'primus' // Optional, defaults to `'primus`'
        },
        transformer: 'websockets'
      },
      plugins: {
        redis: PrimusRedisRooms
      }
    }
  }
}, smokesignals.FailsafeConfig)


