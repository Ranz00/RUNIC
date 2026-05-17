import React from 'react'
import { NavLink } from 'react-router-dom'

// TODO: Reemplazar los <nav> duplicados en cada HTML
// por este componente. NavLink maneja automáticamente
// la clase 'active' cuando la ruta coincide.
// Las rutas apuntan a los endpoints del backend futuro:
// - /api/check-password
// - /api/phishing-cases
// - /api/wifi-scenarios
function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" end>
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink to="/password">Contraseñas</NavLink>
        </li>
        <li>
          <NavLink to="/phishing">Phishing</NavLink>
        </li>
        <li>
          <NavLink to="/wifi">Redes Wi-Fi</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
