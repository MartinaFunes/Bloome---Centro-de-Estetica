/** Punto de entrada: la aplicación React en el elemento raíz del HTML e importa los estilos globales. */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '@fontsource-variable/playfair-display/wght.css'
import '@fontsource-variable/playfair-display/wght-italic.css'
import '@fontsource-variable/raleway/wght.css'
import './index.css'

// Marca que JavaScript está activo: las animaciones de aparición solo se aplican en ese caso,
// así el contenido nunca queda oculto si algo falla.
document.documentElement.classList.add('js')

//React en el elemento #root del HTML y activa las comprobaciones de desarrollo.
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
