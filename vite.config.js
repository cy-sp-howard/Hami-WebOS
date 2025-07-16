import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  base: '',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        userScript: resolve(__dirname, 'src/userScript.js')
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'userScript') {
            return 'webOSUserScripts/[name].js'
          }
          return '[name].js'
        }
      }
    }
  },
  plugins: [cssInjectedByJsPlugin()]
})
