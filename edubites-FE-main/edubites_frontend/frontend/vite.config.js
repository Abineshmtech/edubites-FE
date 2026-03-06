import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // allow the dev server to be accessed over the local network
  server: {
    host: true, // same as '0.0.0.0'
  },
  build: {
    chunkSizeWarningLimit: 600,
    sourcemap: false,
  },
})
