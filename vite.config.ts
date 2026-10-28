/** Configuración de Vite y de los plugins utilizados para desarrollar y compilar el sitio. */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// Calcula la ruta absoluta del proyecto para resolver correctamente el alias de imports.
const projectRoot = path.dirname(fileURLToPath(import.meta.url))

// Configuración estándar de Vite.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(projectRoot, 'src'),
    },
  },
  server: {
    host: 'localhost',
    port: 5173,
    strictPort: false,
  },
  preview: {
    host: 'localhost',
    port: 4173,
    strictPort: false,
  },
})
