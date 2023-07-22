import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { Buffer } from 'buffer'

export default defineConfig({
  resolve: {
    alias: {
      crypto: 'crypto-browserify',
      stream: 'stream-browserify',
      assert: 'assert',
      http: 'stream-http',
      https: 'https-browserify',
      os: 'os-browserify',
      url: 'url',
      util: 'util/', // Add an alias for the "util" module. For reasons I don't understand, without the '/' after, this throws errors
    },
  },
  plugins: [react()],
  server: {
    port: 3000,
    // cors: false,
    proxy: {
      '/sandbox/:path*': {
        target: 'http://localhost:20000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/sandbox/, ''),
      },
    },
  },
  define: {
    'process.env': {},
    Buffer: [Buffer],
  },
})
