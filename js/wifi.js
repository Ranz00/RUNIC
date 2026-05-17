// =============================================
//  Analizador de Redes Wi-Fi
//  Muestra distintos escenarios de redes con
//  diferentes niveles de seguridad (WEP, WPA2,
//  WPA3, abierta). El usuario puede hacer clic
//  en cada tarjeta para ver los detalles.
// =============================================

// Escenarios de redes Wi-Fi simulados.
// Cada red tiene un nombre, tipo de seguridad,
// nivel de riesgo, posibles ataques y una
// recomendación de uso.
const wifiScenarios = [
  {
    id: 1,
    nombre: 'WiFi_Gratis_Shopping',
    tipo: 'Abierta',
    riesgo: 'alto',
    ataques: ['Sniffing', 'Evil Twin', 'MITM'],
    descripcion:
      'Una red sin contraseña que permite el sniffing y los ataque de Evil Twin.',
    recomendacion: 'No utilizar. Cambia a una red segura.',
  },
  {
    id: 2,
    nombre: 'CafeNet_2G',
    tipo: 'WEP',
    riesgo: 'alto',
    ataques: ['Cracking WEP', 'Inyección de paquetes'],
    descripcion:
      'Red protegida con WEP que es vulnerable a los ataques de cracking y inyección.',
    recomendacion: 'Cambiar a WPA2 o WPA3.',
  },
  {
    id: 3,
    nombre: 'Oficina_WPA2',
    tipo: 'WPA2',
    riesgo: 'medio',
    ataques: ['Diccionario', 'Fuerza bruta si clave débil'],
    descripcion:
      'Red protegida con WPA2 que puede ser vulnerable a ataques de diccionario y fuerza bruta.',
    recomendacion: 'Aumentar la complejidad de la contraseña.',
  },
  {
    id: 4,
    nombre: 'HomeNet_5G',
    tipo: 'WPA3',
    riesgo: 'bajo',
    ataques: ['Ninguno conocido actualmente'],
    descripcion: 'Red protegida con WPA3, considerada más segura.',
    recomendacion: 'Utilizar siempre.',
  },
  {
    id: 5,
    nombre: 'Empresa_Segura',
    tipo: 'WPA3',
    riesgo: 'bajo',
    ataques: ['Ninguno conocido actualmente'],
    descripcion: 'Otra red protegida con WPA3, considerada más segura.',
    recomendacion: 'Utilizar siempre.',
  },
]

// Referencia al contenedor donde se renderizan las tarjetas
const wifiList = document.getElementById('wifi-list')

// Controla qué tarjeta tiene los detalles abiertos
let activeCard = null

// Renderiza todas las redes Wi-Fi como tarjetas.
// Cada tarjeta muestra el nombre, tipo y nivel
// de riesgo con un color distintivo.
function renderWifi() {
  wifiScenarios.forEach((wifi) => {
    const cardDiv = document.createElement('div')
    cardDiv.className = 'wifi-card'
    cardDiv.innerHTML = `
      <h3>${wifi.nombre}</h3>
      <p>Tipo: ${wifi.tipo}</p>
      <span class="badge badge-${wifi.riesgo}">${wifi.riesgo}</span>
      <button onclick="toggleDetails(this)">Ver detalles</button>
    `

    // También abre los detalles al hacer clic en la tarjeta
    cardDiv.addEventListener('click', () =>
      toggleDetails(cardDiv.querySelector('button')),
    )

    wifiList.appendChild(cardDiv)
  })
}

// Abre o cierra el panel de detalles de una tarjeta.
// Si ya hay una tarjeta abierta, la cierra primero.
function toggleDetails(button) {
  const card = button.parentElement

  if (card === activeCard) {
    // Si es la misma tarjeta, la cerramos
    card.querySelector('.details').remove()
    activeCard = null
  } else {
    // Cerramos la tarjeta abierta anterior si existe
    if (activeCard) {
      activeCard.querySelector('.details').remove()
    }

    // Buscamos la red correspondiente por su nombre
    const wifi = wifiScenarios.find(
      (w) => w.nombre === card.querySelector('h3').textContent,
    )

    // Creamos el panel con descripción, ataques y recomendación
    const detailsDiv = document.createElement('div')
    detailsDiv.className = 'details'
    detailsDiv.innerHTML = `
      <p>${wifi.descripcion}</p>
      <h4>Ataques:</h4>
      <ul>
        ${wifi.ataques.map((ataque) => `<li>${ataque}</li>`).join('')}
      </ul>
      <p>Recomendación: ${wifi.recomendacion}</p>
    `

    card.appendChild(detailsDiv)
    activeCard = card
  }
}

renderWifi()
