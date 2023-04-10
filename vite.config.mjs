import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    files: ['test/**/*.mjs', 'test/**/*.js'],
    include: ['test/**/*.mjs', 'test/**/*.js']
  },
  build: {
    rollupOptions: {
      input: {
        index: 'rest.mjs',
        test: 'test/index.mjs'
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
        format: 'es',
        dir: 'dist',
        sourcemap: true,
        sourcemapExcludeSources: true,
        sourcemapPathTransform: (relativePath) => {
          return relativePath
        },
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
        preserveEntrySignatures: 'strict',
        exports: 'auto',
        externalLiveBindings: false,
        inlineDynamicImports: false,
        preferConst: true,
        strict: true
      }
    }
  }
})
