import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  base: '',
  build: {
    emptyOutDir: true,
    outDir: resolve(__dirname, '../dist')
  }
})
