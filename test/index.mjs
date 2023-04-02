import { describe, it } from 'node:test'
import assert from 'node:assert'

import { Enexpress } from '../rest.mjs'

describe('Enexpress', () => {
  it('should be a class', () => {
    assert.equal(typeof Enexpress, 'function')
  })

  it('should have a constructor', () => {
    assert.equal(typeof Enexpress.constructor, 'function')
  })

  it('should open a server', () => {
    const app = new Enexpress()
    app.listen(4000)

    app.get('/', (req, _res) => {
      assert.equal(req.url, '/')
    })
  })
})
