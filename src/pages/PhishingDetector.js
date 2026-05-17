import React, { useState, useEffect } from 'react'

// TODO: Migrar la lógica de phishing.js aquí.
// El simulador actual usa:
// - phishingCases array con 3 casos de emails falsos
// - renderCases() para mostrar los correos
// - Event delegation para detectar clics en .señal
//
// Futura integración con /api/phishing-cases:
// - Los casos se cargan desde el backend como JSON
// - Actualizables sin tocar el frontend
// - Cada caso tiene remitente, asunto, cuerpo y señales
function PhishingDetector() {
  const [cases, setCases] = useState([])
  const [foundSignals, setFoundSignals] = useState(new Set())

  // TODO: Descomentar y adaptar cuando el backend esté listo.
  // useEffect(() => {
  //   const loadCases = async () => {
  //     const response = await fetch('/api/phishing-cases')
  //     const data = await response.json()
  //     setCases(data)
  //   }
  //   loadCases()
  // }, [])

  // Datos temporales: migrar de phishing.js
  useEffect(() => {
    const phishingCases = [
      {
        id: 1,
        remitente: 'soporte@paypa1.com',
        asunto: 'Tu cuenta ha sido bloqueada',
        cuerpo:
          'Estimado cliente, hemos notado actividad sospechosa en tu cuenta. Por favor, <span class="señal" data-id="1" data-index="0">restablece tu contraseña</span> para seguir utilizando nuestros servicios.',
      },
      {
        id: 2,
        remitente: 'rrhh@empresa-rh.net',
        asunto: 'Aumento de salario anual',
        cuerpo:
          'Estimado/a [Nombre], hemos recibido tu solicitud de aumento. Te informamos que ha sido aprobada y será aplicado en el próximo mes.',
      },
      {
        id: 3,
        remitente: 'seguridad@banc0nacional.com',
        asunto: 'Movimiento sospechoso en tu cuenta bancaria',
        cuerpo:
          'Estimado/a [Nombre], hemos detectado un movimiento sospechoso en tu cuenta. Por favor, <span class="señal" data-id="3" data-index="0">confirma tu cuenta</span> para protegerla.',
      },
    ]
    setCases(phishingCases)
  }, [])

  const handleSignalClick = (casoId) => {
    setFoundSignals((prev) => new Set([...prev, casoId]))
    // TODO: Mejorar la lógica de resolución de casos
    // Actualmente usa alert(), migrar a modal o feedback visual
  }

  return (
    <section>
      <h2>Phishing</h2>
      <p>
        Haz clic en los enlaces sospechosos dentro de cada correo para
        identificarlos. Aprende a distinguir un correo legítimo de uno
        fraudulento.
      </p>

      <div id="phishing-container">
        {cases.map((caso) => (
          <div key={caso.id} className="email">
            <h3>{caso.remitente}</h3>
            <p>
              <strong>Asunto:</strong> {caso.asunto}
            </p>
            <p>
              <strong>Cuerpo:</strong>{' '}
              <span
                dangerouslySetInnerHTML={{ __html: caso.cuerpo }}
                onClick={(e) => {
                  if (e.target.classList.contains('señal')) {
                    handleSignalClick(caso.id)
                  }
                }}
              />
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default PhishingDetector
