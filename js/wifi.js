// wifi.js

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

const wifiList = document.getElementById('wifi-list')
let activeCard = null

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

    cardDiv.addEventListener('click', () =>
      toggleDetails(cardDiv.querySelector('button')),
    )

    wifiList.appendChild(cardDiv)
  })
}

function toggleDetails(button) {
  const card = button.parentElement

  if (card === activeCard) {
    card.querySelector('.details').remove()
    activeCard = null
  } else {
    if (activeCard) {
      activeCard.querySelector('.details').remove()
    }

    const detailsDiv = document.createElement('div')
    detailsDiv.className = 'details'
    detailsDiv.innerHTML = `
      <p>${wifiScenarios.find((wifi) => wifi.nombre === card.querySelector('h3').textContent).descripcion}</p>
      <h4>Ataques:</h4>
      <ul>
        ${wifiScenarios
          .find((wifi) => wifi.nombre === card.querySelector('h3').textContent)
          .ataques.map((ataque) => `<li>${ataque}</li>`)
          .join('')}
      </ul>
      <p>Recomendación: ${wifiScenarios.find((wifi) => wifi.nombre === card.querySelector('h3').textContent).recomendacion}</p>
    `

    card.appendChild(detailsDiv)
    activeCard = card
  }
}

renderWifi()
