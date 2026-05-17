import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Nav from './components/Nav'
import Home from './pages/Home'
import PasswordAnalyzer from './pages/PasswordAnalyzer'
import PhishingDetector from './pages/PhishingDetector'
import WifiAnalyzer from './pages/WifiAnalyzer'

// TODO: Migrar lógica de vanilla JS de index.html, password.html,
// phishing.html y wifi.html a estos componentes React.
// El router reemplaza la navegación por archivos HTML separados.
function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Nav />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/password" element={<PasswordAnalyzer />} />
            <Route path="/phishing" element={<PhishingDetector />} />
            <Route path="/wifi" element={<WifiAnalyzer />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
