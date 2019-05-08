// 'use strict'
// /* global describe, it */
// const assert = require('assert')
// const cb = require('assert-called')
// const PORT = 3459
// const ROOM = 'our-room'
//
// const Primus = require('primus')
// // const PrimusRedisRooms = require('primus-redis-rooms')
//
// let client
// const primus = new Primus('http://localhost:3000')
//
// function getClient() {
//   return Primus.connect('http://localhost:3000', {})
// }
//
// describe('global.app.sockets', () => {
//   before(() => {
//     client = primus
//
//     client.on('open', function (spark) {
//       console.log('SPARK')
//     })
//
//     // client.on('data', cb(function (msg) {
//     //   assert.deepEqual(msg, { hello: 'world' })
//     // }))
//   })
//
//   it('should exist', () => {
//     assert.ok(global.app.sockets)
//   })
//
//   // function onConnected(spark) {
//   //   let room
//   //
//   //   spark.join(ROOM)
//   //
//   //   room = global.app.sockets.room(ROOM)
//   //
//   //   global.app.sockets.on('leave', cb(function (room_, spark_) {
//   //     assert.equal(room, room_, '`leave` event should have correct `room` param')
//   //     assert.equal(spark, spark_, '`leave` event should have correct `spark` param')
//   //   }))
//   //
//   //   room.on('empty', cb(function () {
//   //     assert.equal(room.sparks.length, 0, 'room should emit `empty` only when empty')
//   //
//   //     global.app.sockets.server.close()
//   //     spark.end()
//   //     client.end()
//   //
//   //     process.exit() // XXX WTF is keeping the process up here?!
//   //   }))
//   //
//   //   assert.equal(spark._rooms[0], room, 'spark should join room correctly')
//   //   assert.equal(room.sparks[0], spark, 'spark should be added to room')
//   //
//   //   spark.join(ROOM)
//   //   assert.equal(spark._rooms.length, 1, 'spark shouldn\'t be added twice')
//   //   assert.equal(room.sparks.length, 1, 'spark shoudn\'t be added twice')
//   //
//   //   spark.leave(ROOM)
//   //   assert.equal(spark._rooms.length, 0, 'spark should be removed correctly')
//   //   assert.equal(room.sparks.length, 0, 'spark should be removed correctly from the room')
//   // }
//   //
//   // function getClient(primus) {
//   //   return new (primus.Socket)('http://localhost:' + primus.port)
//   // }
//   //
//   // describe('global.app.sockets connections', () => {
//   //   it('should run', (done) => {
//   //     // global.app.sockets.on('connection', cb(onConnected))
//   //
//   //     client = getClient(global.app.sockets)
//   //
//   //     global.app.sockets.on('connection', function() {
//   //       console.log('CONNECTED')
//   //       // done()
//   //     })
//   //
//   //     done()
//   //   })
//   // })
//
// })
