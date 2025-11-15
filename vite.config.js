import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,      // biar bisa diakses dari LAN / localhost
    port: 3000,      // ganti port biar gak bentrok dengan 5173
  },
})
