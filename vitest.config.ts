/* eslint-disable @typescript-eslint/no-require-imports -- Vitest config stays CommonJS because this package has no type: module. */
const path = require('node:path')
const { defineConfig } = require('vitest/config')

module.exports = defineConfig({
  resolve: { alias: { '@': path.join(__dirname, 'src') } },
  test: { environment: 'node' },
})
