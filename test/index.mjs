import { it, expect, describe } from 'vitest'

import { Enexpress } from '../rest.mjs'

const app = new Enexpress()
app.listen(4000)

describe('Enexpress', () => {
  it('should be a class', () => {
    expect(Enexpress).toBeInstanceOf(Function)
  })

  it('should have a constructor', () => {
    expect(app).toBeInstanceOf(Enexpress)
  })

  it('should have a get method', () => {
    const app = new Enexpress()

    app.get('/', (req, _res) => {
      expect(req).toBeInstanceOf(Object)
    })
  })

  it('should have a post method', () => {
    const app = new Enexpress()

    app.post('/', (req, _res) => {
      expect(req).toBeInstanceOf(Object)
    })
  })
})
