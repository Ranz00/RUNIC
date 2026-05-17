import React, { useState, useEffect } from 'react'

// TODO: Migrar la lógica de password.js aquí.
// El verificador de contraseñas actual usa:
// - analyzePassword() para calcular el score (0-4)
// - commonPasswords array con 20 contraseñas débiles
// - updateStrengthBar() y updateFeedback() para la UI
//
// Futura integración con /api/check-password:
// - Enviar la contraseña al backend para análisis
// - El backend compara contra diccionario en servidor
// - Retorna score y análisis de patrones
function PasswordAnalyzer() {
  const [password, setPassword] = useState('')
  const [result, setResult] = useState(null)

  // TODO: Descomentar y adaptar cuando el backend esté listo.
  // const analyzePasswordAPI = async (pwd) => {
  //   const response = await fetch('/api/check-password', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ password: pwd }),
  //   })
  //   return await response.json()
  // }

  // Lógica temporal: análisis local (migrar de password.js)
  const analyzePassword = (pwd) => {
    const commonPasswords = [
      '123456', 'password', 'qwerty', 'abc123', 'root',
      'oceano', 'dragon', 'master', '123123', 'admin',
      'welcome', 'login', 'pass', 'test', 'amor',
      'amanecer', 'rey', 'football', 'shadow', 'superman',
    ]

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

  const handleChange = (e) => {
    const pwd = e.target.value
    setPassword(pwd)
    setResult(analyzePassword(pwd))
  }

  const getStrengthClass = () => {
    if (!result) return ''
    if (result.score <= 1) return 'weak'
    if (result.score <= 3) return 'medium'
    return 'strong'
  }

  return (
    <section>
      <h2>Contraseñas Seguras</h2>
      <p>
        Ingresa una contraseña para verificar su fortaleza. El análisis se
        realiza en tiempo real mientras escribes.
      </p>

      <input
        type="password"
        value={password}
        onChange={handleChange}
        placeholder="Ingresa tu contraseña"
        id="password-input"
      />

      <div id="strength-bar" className={getStrengthClass()} />

      {result && (
        <ul id="password-feedback">
          {Object.entries(result).map(([key, value]) => {
            if (key === 'isCommon' && value) {
              return (
                <li key={key} style={{ color: 'red' }}>
                  Contraseña común: ✗
                </li>
              )
            }
            if (key === 'isCommon') return null
            return (
              <li key={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)} {value ? '✓' : '✗'}
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}

export default PasswordAnalyzer
