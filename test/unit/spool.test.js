'use strict'

const assert = require('assert')

describe('spool', () => {
  let spool, extension
  before(() => {
    spool = global.app.spools['realtime']
    extension = global.app.sockets
  })
  it('should be loaded into the app.spools collection', () => {
    assert(spool)
    assert(extension)
  })
  describe('#validate', () => {
    it.skip('TODO test')
  })
  describe('#configure', () => {
    it.skip('TODO test')
  })
  describe('#initialize', () => {
    it.skip('TODO test')
  })
})
