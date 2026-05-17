import React from 'react'

// TODO: Migrar el <header> de index.html aquí.
// El SVG del logo y la imagen img/RUNIC-logo-r.png
// se mantienen igual. Reemplazar el header estático
// de cada página HTML por este componente compartido.
function Header() {
  return (
    <header>
      <div className="header-content">
        <div className="logo">
          <svg width="36" height="36" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="rune-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6b7cff" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            <polygon
              points="26,6 45,14 45,38 26,46 7,38 7,14"
              fill="none"
              stroke="url(#rune-grad)"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <polyline
              points="17,23 26,17 35,23 26,37 17,23"
              fill="none"
              stroke="url(#rune-grad)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <img src="/img/RUNIC-logo-r.png" alt="RUNIC logo" />
        </div>
        <div className="logo-text">
          <p>Plataforma educativa de ciberseguridad</p>
        </div>
      </div>
    </header>
  )
}

export default Header
