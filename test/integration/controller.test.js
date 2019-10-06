'use strict'
/* global describe, it */
const assert = require('assert')
const supertest = require('supertest')
const qs = require('qs')
const _ = require('lodash')

let Primus = require('primus')
  , Socket
  , client

describe('# Controller Integration', () => {
  let socketUser, socketLibrary

  before((done) => {
    Socket = Primus.createSocket(global.app.config.get('realtime.primus'))
    client = new Socket(`http://localhost:${global.app.config.get('web.port')}`)

    client.on('data', function message(data) {
      console.log('Controller Integration BEFORE: Received from TestSpark Handler', data)
    })

    client.on('error', function error(err) {
      console.error('Controller Integration  BEFORE ERROR:', err, err.message);
    })

    socketUser = supertest.agent(global.app.spools.express.server)

    socketUser
      .get(`/primus/primus.js`)
      .expect(200)
      .end((err, res) => {
        assert.ok(res.body)
        done(err)
      })
  })

  describe('## Controller', () => {
    it('should be available in a controller', (done) => {
      socketUser
        .post(`/broadcast`)
        .expect(200)
        .send({
          message: 'in a bottle'
        })
        .end((err, res) => {

          client.on('data', function message(data) {
            if (data.message === 'in a bottle') {
              done()
            }
          })
          assert.ok(res.body)
        })
    })
  })
})
