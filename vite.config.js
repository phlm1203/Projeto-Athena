import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // O GitHub Pages serve o site em https://phlm1203.github.io/Projeto-Athena/
  // (dentro de uma subpasta), então todos os caminhos precisam partir daí.
  base: '/Projeto-Athena/',
})
