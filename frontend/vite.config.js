import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Esto es CRUCIAL para Docker
    port: 5173, 
    watch: {
      usePolling: true // Ayuda a que los cambios se detecten en Windows/Docker
    }
  }
})