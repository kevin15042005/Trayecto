import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  preview: {
    port: 1000,
    host: true,
    allowedHosts:['trayecto.onrender.com'],
  },
  plugins: [react()],
})
