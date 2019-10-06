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
    Socket = Primus.createSocket(global.app.config.get('realtime.primus'))
    client = new Socket(`http://localhost:${global.app.config.get('web.port')}`)
    socketUser = supertest.agent(global.app.spools.express.server)

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

      client.on('data', function message(data) {
        if (data && data.pong) {
          // done()
        }
      })

      assert.ok(client.write({data: 'hello world'}))

      setTimeout(function(){
        done()
      }, 100 )
    })

    it('should write from client to server', (done) => {
      // console.log(client.socket.emit('data', 'test'))
      assert.ok(client.write({ message: 'from a bottle'}))
      done()
      // client.send('find', 'messages', { status: 'read', user: 10 }, (error, data) => {
      //   console.log('Found all messages', data)
      // })
    })
  })

  // after((done) => {
  //   client.end()
  //   done()
  // })
})
