'use strict'
/* global describe, it */
const assert = require('assert')

describe('Primus', () => {
  it('should exist', () => {
    assert.ok(global.app.sockets)
  })
})
