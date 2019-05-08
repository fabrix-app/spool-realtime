'use strict'
/* global describe, it */
const assert = require('assert')
const supertest = require('supertest')
const qs = require('qs')
const _ = require('lodash')

let Primus = require('primus')
  , Socket
  , client

describe('Primus', () => {
  let socketUser, socketLibrary

  before((done) => {
    Socket = Primus.createSocket(global.app.config.get('realtime.primus'))
    client = new Socket(`http://localhost:${global.app.config.get('web.port')}`)

    socketUser = supertest.agent(global.app.spools.express.server)
    socketUser
      .get(`/primus/primus.js`)
      .expect(200)
      .end((err, res) => {
        assert.ok(res.body)
        done(err)
      })
  })

  describe('Primus utils', () => {
    it('should emit', (done) => {
      client.emit({data: 'hello world'})
      done()
    })
  })
})
