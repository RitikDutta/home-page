import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/home-page/', // 👈 MUST match your GitHub repo name
  plugins: [react()],
})
