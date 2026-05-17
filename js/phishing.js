// =============================================
//  Simulador de Phishing
//  Muestra correos electrónicos sospechosos para
//  que el usuario aprenda a identificar enlaces
//  fraudulentos (phishing).
//  Cada correo contiene "señales" (enlaces) que
//  el usuario debe descubrir haciendo clic.
// =============================================

// Lista de casos de phishing simulados.
// Cada caso tiene un remitente, un asunto y un
// cuerpo que contiene enlaces sospechosos.
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

// Renderiza todos los casos de phishing dentro
// del contenedor de la página. Cada caso se 
// muestra como un "correo electrónico" simulado.
function renderCases() {
  const container = document.getElementById('phishing-container')

  phishingCases.forEach((caso) => {
    const emailDiv = document.createElement('div')
    emailDiv.className = 'email'

    emailDiv.innerHTML = `
      <h3>${caso.remitente}</h3>
      <p><strong>Asunto:</strong> ${caso.asunto}</p>
      <p><strong>Cuerpo:</strong> ${caso.cuerpo}</p>
    `

    container.appendChild(emailDiv)
  })
}

renderCases()

// Escucha los clics dentro del contenedor de phishing.
// Cuando el usuario hace clic en una "señal" (enlace
// sospechoso), se revela información adicional sobre el caso.
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

      // Si todas las señales del caso fueron encontradas,
      // mostramos un mensaje de caso resuelto
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
