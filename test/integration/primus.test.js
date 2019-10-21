'use strict'
/* global describe, it */
const assert = require('assert')
const supertest = require('supertest')
const qs = require('qs')
const _ = require('lodash')

let Primus = require('primus')
  , Socket
  , client

describe('# Primus Integration', () => {
  let socketUser, socketLibrary

  before((done) => {
    Socket = Primus.createSocket({
      transformer: 'engine.io',
      // ...global.app.config.get('realtime.primus'),
      // plugin: global.app.config.get('realtime.plugins')
    })
    client = new Socket(`http://localhost:${global.app.config.get('web.port')}`)
    socketUser = supertest.agent(global.app.spools.express.server)

    client.on('connection', function (spark) {
      console.log('Primus Integration BEFORE: connected', spark)
    })

    client.on('open', function () {
      console.log('Primus Integration BEFORE: open')
    })

    client.on('destroy', function (spark) {
      console.log('Primus Integration BEFORE: destroy', spark)
    })

    client.on('online', function (spark) {
      console.log('Primus Integration BEFORE: online', spark)
    })

    client.on('offline', function (spark) {
      console.log('Primus Integration BEFORE: offline', spark)
    })

    client.on('data', function message(data) {
      console.log('Primus Integration BEFORE: Received from TestSpark Handler', data)
    })

    client.on('error', function error(err) {
      console.error('Primus Integration BEFORE ERROR:', err, err.message);
    })

    socketUser
      .get(`/primus/primus.js`)
      .expect(200)
      .end((err, res) => {
        assert.ok(res.body)
        done(err)
      })
  })

  describe('## Primus utils', () => {
    it('should emit and get test response from server', (done) => {

      let count = 0
      client.on('data', function message(data) {
        if (data && data.pong) {
          count++
          if (count === 1) {
            done()
          }
        }
      })

      client.write({ping: true})

      // setTimeout(function(){
      //   done()
      // }, 100 )
    })
  })

  // after((done) => {
  //   client.end()
  //   done()
  // })
})
