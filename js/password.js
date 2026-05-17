// =============================================
//  Verificador de fortaleza de contraseñas
//  Analiza la contraseña en tiempo real mientras
//  el usuario escribe y muestra el nivel de
//  seguridad mediante una barra y una lista
//  de requisitos cumplidos o faltantes.
// =============================================

// Las contraseñas más comunes y débiles que todo
// el mundo usa. Si la contraseña está aquí,
// automáticamente se considera insegura.
const commonPasswords = [
  '123456',
  'password',
  'qwerty',
  'abc123',
  'root',
  'oceano',
  'dragon',
  'master',
  '123123',
  'admin',
  'welcome',
  'login',
  'pass',
  'test',
  'amor',
  'amanecer',
  'rey',
  'football',
  'shadow',
  'superman',
]

// Analiza la contraseña y devuelve un puntaje
// del 0 al 4 según qué tan segura es.
// Revisa: longitud, mayúsculas, números, símbolos
// y si está en la lista de contraseñas comunes.
function analyzePassword(pwd) {
  let score = 0
  const hasLength = pwd.length >= 8
  const hasUpper = /[A-Z]/.test(pwd)
  const hasNumber = /\d/.test(pwd)
  const hasSymbol = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pwd)
  const isCommon = commonPasswords.includes(pwd)

  if (hasLength) score++
  if (hasUpper) score++
  if (hasNumber) score++
  if (hasSymbol) score++

  return { score, hasLength, hasUpper, hasNumber, hasSymbol, isCommon }
}

// Actualiza la barra visual según el puntaje.
// 0-1 = débil (rojo), 2-3 = medio (naranja), 4 = fuerte (verde)
function updateStrengthBar(score) {
  const strengthBar = document.getElementById('strength-bar')
  strengthBar.className = ''

  if (score <= 1) strengthBar.classList.add('weak')
  else if (score <= 3) strengthBar.classList.add('medium')
  else strengthBar.classList.add('strong')
}

// Muestra una lista con cada requisito y si
// la contraseña lo cumple (✓) o no (✗)
function updateFeedback(result) {
  const feedback = document.getElementById('password-feedback')
  feedback.innerHTML = ''

  for (const [key, value] of Object.entries(result)) {
    if (key === 'isCommon') {
      if (value) {
        const item = document.createElement('li')
        item.textContent = 'Contraseña común: ✗'
        item.style.color = 'red'
        feedback.appendChild(item)
      }
    } else {
      const item = document.createElement('li')
      item.textContent = `${key.charAt(0).toUpperCase() + key.slice(1)} ${value ? '✓' : '✗'}`
      if (key === 'isCommon' && !value) item.style.color = 'green'
      feedback.appendChild(item)
    }
  }
}

// Escucha cada tecla que el usuario escribe en
// el campo de contraseña y actualiza todo en vivo
document
  .getElementById('password-input')
  .addEventListener('input', function (event) {
    const pwd = event.target.value
    const result = analyzePassword(pwd)
    updateStrengthBar(result.score)
    updateFeedback(result)
  })
