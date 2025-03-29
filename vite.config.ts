import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: ['49ef-2401-4900-8819-f8b-29a-8f7a-6b4a-36be.ngrok-free.app'], // or 'all' for all hosts
  },
})
