import * as assert from 'assert'
import * as Primus from '../../test/fixtures/primus/primus'

describe('Browser', () => {
  describe('sanity', () => {
    it('should exist', () => {
      const library = Primus.connect(`localhost:${process.env.PORT}`, {})
      assert(library)

    })
  })
})
