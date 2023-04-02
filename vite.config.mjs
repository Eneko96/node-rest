import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    files: ['test/**/*.mjs', 'test/**/*.js'],
    include: ['test/**/*.mjs', 'test/**/*.js']
  }
})
