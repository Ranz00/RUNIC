// password.js

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

// Función para analizar la contraseña
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

// Función para actualizar la barra de fuerza
function updateStrengthBar(score) {
  const strengthBar = document.getElementById('strength-bar')
  strengthBar.className = '' // Remover clases anteriores

  if (score <= 1) strengthBar.classList.add('weak')
  else if (score <= 3) strengthBar.classList.add('medium')
  else strengthBar.classList.add('strong')
}

// Función para actualizar el feedback
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

// Escuchar evento input en el campo de contraseña
document
  .getElementById('password-input')
  .addEventListener('input', function (event) {
    const pwd = event.target.value
    const result = analyzePassword(pwd)
    updateStrengthBar(result.score)
    updateFeedback(result)
  })
