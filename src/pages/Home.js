import React from 'react'
import { Link } from 'react-router-dom'

// TODO: Migrar la grilla de tarjetas de index.html aquí.
// Cada card enlaza a su ruta correspondiente.
// En la versión final, las cards podrían cargar datos
// dinámicos desde los endpoints del backend.
function Home() {
  return (
    <>
      <section className="hero">
        <h2>Bienvenido a RUNIC</h2>
        <p>Selecciona una herramienta para comenzar</p>
      </section>

      <div className="card-grid">
        <Link to="/password" className="card">
          <h3>Contraseñas Seguras</h3>
          <p>
            Verifica la fortaleza de tus contraseñas y aprende buenas prácticas
            para proteger tus cuentas.
          </p>
        </Link>

        <Link to="/phishing" className="card">
          <h3>Phishing</h3>
          <p>
            Aprende a identificar correos electrónicos fraudulentos y protégete
            del robo de información.
          </p>
        </Link>

        <Link to="/wifi" className="card">
          <h3>Redes Wi-Fi</h3>
          <p>
            Analiza la seguridad de distintas redes inalámbricas y descubre
            cuáles son seguras.
          </p>
        </Link>
      </div>
    </>
  )
}

export default Home
