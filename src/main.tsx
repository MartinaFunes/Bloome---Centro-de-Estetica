/** Punto de entrada: la aplicación React en el elemento raíz del HTML e importa los estilos globales. */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

//React en el elemento #root del HTML y activa las comprobaciones de desarrollo.
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
