// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      allow: ['.']
    },
    watch: {
      ignored: [
        'node_modules/**',
        '.git/**',
        '**/.env' // add this line to ignore .env file
      ]
    }
  }
})
