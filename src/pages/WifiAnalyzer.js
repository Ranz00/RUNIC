import React, { useState, useEffect } from 'react'

// TODO: Migrar la lógica de wifi.js aquí.
// El analizador actual usa:
// - loadWifiScenarios() con fetch a JSONPlaceholder
// - titulosMock y descripcionesMock para datos en español
// - renderWifi() y toggleDetails() para la UI
//
// Futura integración con /api/wifi-scenarios:
// - El backend retorna redes ficticias con perfil de riesgo
// - Tipo de cifrado y escenarios de ataque asociados
// - Actualizables sin tocar el frontend
function WifiAnalyzer() {
  const [scenarios, setScenarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeCard, setActiveCard] = useState(null)

  // TODO: Descomentar y adaptar cuando el backend esté listo.
  // useEffect(() => {
  //   const loadScenarios = async () => {
  //     try {
  //       const response = await fetch('/api/wifi-scenarios')
  //       if (!response.ok) throw new Error('Error en la respuesta del servidor')
  //       const data = await response.json()
  //       setScenarios(data)
  //     } catch (err) {
  //       setError(err.message)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  //   loadScenarios()
  // }, [])

  // Datos temporales: migrar de wifi.js (fetch a JSONPlaceholder)
  useEffect(() => {
    const loadScenarios = async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/posts',
        )
        if (!response.ok) throw new Error('Error en la respuesta del servidor')
        const posts = await response.json()

        // Mapeo temporal: se elimina al conectar el backend real
        const titulosMock = {
          1: 'WiFi_Gratis_Shopping',
          2: 'CafeNet_2G',
          3: 'Oficina_WPA2',
          4: 'HomeNet_5G',
          5: 'Empresa_Segura',
        }

        const descripcionesMock = {
          1: 'Red abierta sin contraseña. Cualquiera puede conectarse y espiar tu tráfico.',
          2: 'Red con cifrado WEP obsoleto. Vulnerable a ataques de cracking en minutos.',
          3: 'Red con WPA2, estándar actual. Segura si la contraseña es compleja.',
          4: 'Red con WPA3, protocolo más reciente. Máxima seguridad disponible.',
          5: 'Red corporativa con WPA3 y autenticación adicional. Muy segura.',
        }

        const obtenerTipo = (id) => {
          const tipos = ['Abierta', 'WEP', 'WPA2', 'WPA3']
          return tipos[id % 4]
        }

        const obtenerRiesgo = (id) => {
          const riesgos = ['alto', 'medio', 'bajo']
          return riesgos[id % 3]
        }

        const obtenerAtaques = (tipo) => {
          const ataquesMap = {
            Abierta: ['Sniffing', 'Evil Twin', 'MITM'],
            WEP: ['Cracking WEP', 'Inyección de paquetes'],
            WPA2: ['Diccionario', 'Fuerza bruta'],
            WPA3: ['Ninguno conocido actualmente'],
          }
          return ataquesMap[tipo]
        }

        const obtenerRecomendacion = (tipo) => {
          if (tipo === 'Abierta' || tipo === 'WEP')
            return 'No utilizar. Cambiar a red segura.'
          if (tipo === 'WPA2') return 'Usar contraseña compleja.'
          return 'Utilizar siempre.'
        }

        const mapped = posts.slice(0, 5).map((post) => {
          const tipo = obtenerTipo(post.id)
          return {
            id: post.id,
            nombre: titulosMock[post.id] ?? post.title.substring(0, 25),
            tipo,
            riesgo: obtenerRiesgo(post.id),
            ataques: obtenerAtaques(tipo),
            descripcion:
              descripcionesMock[post.id] ?? post.body.substring(0, 100),
            recomendacion: obtenerRecomendacion(tipo),
          }
        })

        setScenarios(mapped)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadScenarios()
  }, [])

  const toggleDetails = (id) => {
    setActiveCard(activeCard === id ? null : id)
  }

  if (loading) {
    return (
      <section>
        <p className="confirmacion">Cargando escenarios de red...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section>
        <p className="error-msg">Error al cargar los escenarios. Inténtalo de nuevo.</p>
      </section>
    )
  }

  return (
    <section>
      <h2>Redes Wi-Fi</h2>
      <p>
        Haz clic en cada red para ver sus detalles de seguridad y aprender qué
        tipo de protección tiene cada una.
      </p>

      <div id="wifi-list">
        {scenarios.map((wifi) => (
          <div
            key={wifi.id}
            className="wifi-card"
            onClick={() => toggleDetails(wifi.id)}
          >
            <h3>{wifi.nombre}</h3>
            <p>Tipo: {wifi.tipo}</p>
            <span className={`badge badge-${wifi.riesgo}`}>{wifi.riesgo}</span>
            <button onClick={(e) => { e.stopPropagation(); toggleDetails(wifi.id); }}>
              Ver detalles
            </button>

            {activeCard === wifi.id && (
              <div className="details">
                <p>{wifi.descripcion}</p>
                <h4>Ataques:</h4>
                <ul>
                  {wifi.ataques.map((ataque, i) => (
                    <li key={i}>{ataque}</li>
                  ))}
                </ul>
                <p>Recomendación: {wifi.recomendacion}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default WifiAnalyzer
