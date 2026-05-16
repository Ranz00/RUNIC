// Definición de los casos de phishing
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

// Función para renderizar los casos de phishing
function renderCases() {
  const container = document.getElementById('phishing-container')

  phishingCases.forEach((caso) => {
    const emailDiv = document.createElement('div')
    emailDiv.className = 'email'

    // Mostrar el remitente, asunto y cuerpo del correo
    emailDiv.innerHTML = `
      <h3>${caso.remitente}</h3>
      <p><strong>Asunto:</strong> ${caso.asunto}</p>
      <p><strong>Cuerpo:</strong> ${caso.cuerpo}</p>
    `

    container.appendChild(emailDiv)
  })
}

// Llamar a renderCases al cargar el script
renderCases()

// Event delegation en phishing-container
document
  .getElementById('phishing-container')
  .addEventListener('click', function (event) {
    if (event.target.classList.contains('señal')) {
      const casoId = event.target.getAttribute('data-id')
      const señalDiv = document.createElement('div')
      señalDiv.textContent = phishingCases[casoId - 1].cuerpo.split(
        `<span class="señal" data-id="${casoId}" data-index="0">restablece tu contraseña</span>`,
      )[1]
      event.target.appendChild(señalDiv)
      event.target.classList.add('encontrada')

      // Verificar si todas las señales del caso están encontradas
      if (
        event.target.parentElement.querySelectorAll('.señal.encontrada')
          .length ===
        phishingCases[casoId - 1].cuerpo.split(
          '<span class="señal" data-id="' +
            casoId +
            '" data-index="0">restablece tu contraseña</span>',
        ).length
      ) {
        alert(`¡Caso resuelto!`)
      }
    }
  })
