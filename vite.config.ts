import { defineConfig } from 'vite'
import wasm from "vite-plugin-wasm"
import topLevelAwait from "vite-plugin-top-level-await"

export default defineConfig({
  plugins: [topLevelAwait(), wasm()],

  build: {  	
  	rollupOptions: {
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`
      }
    }
  },

  worker: {
    format: "es",
    plugins: [topLevelAwait(), wasm()],
  },
})