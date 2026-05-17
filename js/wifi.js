// =============================================
//  Analizador de Redes Wi-Fi — RUNIC
//  Indicador 3: Integración Frontend – API
// =============================================
// TODO: Reemplazar con /api/wifi-scenarios cuando el backend
// Node.js + Express esté listo.

let wifiScenarios = []
// Mapeo temporal: nombres en español para posts de JSONPlaceholder.
// Se elimina al conectar el backend real.
const titulosMock = {
  1: 'WiFi_Gratis_Shopping',
  2: 'CafeNet_2G',
  3: 'Oficina_WPA2',
  4: 'HomeNet_5G',
  5: 'Empresa_Segura',
}

// Mapeo temporal: descripciones en español para posts de JSONPlaceholder.
// Se elimina al conectar el backend real.
const descripcionesMock = {
  1: 'Red abierta sin contraseña. Cualquiera puede conectarse y espiar tu tráfico.',
  2: 'Red con cifrado WEP obsoleto. Vulnerable a ataques de cracking en minutos.',
  3: 'Red con WPA2, estándar actual. Segura si la contraseña es compleja.',
  4: 'Red con WPA3, protocolo más reciente. Máxima seguridad disponible.',
  5: 'Red corporativa con WPA3 y autenticación adicional. Muy segura.',
}

function obtenerTipo(id) {
  const tipos = ['Abierta', 'WEP', 'WPA2', 'WPA3']
  return tipos[id % 4]
}

function obtenerRiesgo(id) {
  const riesgos = ['alto', 'medio', 'bajo']
  return riesgos[id % 3]
}

function obtenerAtaques(tipo) {
  const ataquesMap = {
    Abierta: ['Sniffing', 'Evil Twin', 'MITM'],
    WEP: ['Cracking WEP', 'Inyección de paquetes'],
    WPA2: ['Diccionario', 'Fuerza bruta'],
    WPA3: ['Ninguno conocido actualmente'],
  }
  return ataquesMap[tipo]
}

function obtenerRecomendacion(tipo) {
  if (tipo === 'Abierta' || tipo === 'WEP')
    return 'No utilizar. Cambiar a red segura.'
  if (tipo === 'WPA2') return 'Usar contraseña compleja.'
  return 'Utilizar siempre.'
}

// Transforma post de API → objeto wifi
function mapearPostAWifi(post) {
  const tipo = obtenerTipo(post.id)
  return {
    id: post.id,
    nombre: titulosMock[post.id] ?? post.title.substring(0, 25),
    tipo,
    riesgo: obtenerRiesgo(post.id),
    ataques: obtenerAtaques(tipo),
    descripcion: descripcionesMock[post.id] ?? post.body.substring(0, 100),
    recomendacion: obtenerRecomendacion(tipo),
  }
}

function mostrarCargando() {
  wifiList.innerHTML =
    '<p class="confirmacion">Cargando escenarios de red...</p>'
}

function mostrarError() {
  wifiList.innerHTML =
    '<p class="error-msg">Error al cargar los escenarios. Inténtalo de nuevo.</p>'
}

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
    const wifi = wifiScenarios.find(
      (w) => w.nombre === card.querySelector('h3').textContent,
    )
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

// Fetch: obtiene datos de API externa, mapea y renderiza
async function loadWifiScenarios() {
  mostrarCargando()
  try {
    const respuesta = await fetch('https://jsonplaceholder.typicode.com/posts')
    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`)
    }
    const posts = await respuesta.json()
    // Primeros 5 resultados → formato wifi
    wifiScenarios = posts.slice(0, 5).map(mapearPostAWifi)
    wifiList.innerHTML = ''
    renderWifi()
  } catch (error) {
    console.error('Error al cargar escenarios:', error.message)
    mostrarError()
  }
}

loadWifiScenarios()
