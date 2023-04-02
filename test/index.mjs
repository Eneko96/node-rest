import { it, expect, describe } from 'vitest'

import { Enexpress } from '../rest.mjs'

describe('Enexpress', () => {
  it('should be a class', () => {
    expect(Enexpress).toBeInstanceOf(Function)
  })

  it('should have a constructor', () => {
    expect(new Enexpress()).toBeInstanceOf(Enexpress)
  })

  it('should open a server', () => {
    const app = new Enexpress()
    app.listen(4000)

    app.get('/', (req, _res) => {
      expect(req).toBeInstanceOf(Object)
    })
  })
})
