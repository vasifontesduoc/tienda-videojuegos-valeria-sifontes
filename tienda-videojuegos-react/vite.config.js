import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/tienda-videojuegos-valeria-sifontes/tienda-videojuegos-react/',
})