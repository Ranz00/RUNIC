# RUNIC
> Risk & User Network Intelligence Center

RUNIC es una plataforma educativa de ciberseguridad que hice como proyecto
para la materia de Desarrollo de Aplicaciones Web en la Universidad Americana.
La idea era convertir conceptos abstractos — contraseñas débiles, phishing,
redes WiFi inseguras — en experiencias interactivas que cualquier usuario
pueda entender sin conocimientos técnicos previos.
Todo el proyecto corre en el navegador, sin backend, sin dependencias,
sin build tools. HTML, CSS y JS puro.
> 
## ¿Qué hace?
- **Contraseñas Seguras** — Verificador de fortaleza en tiempo real. Analiza
  longitud, mayúsculas, números, símbolos y compara contra un diccionario
  de contraseñas comunes mientras el usuario escribe.
- **Phishing** — Simulador de correos fraudulentos. Muestra emails sospechosos
  con enlaces ocultos que el usuario debe identificar haciendo clic. Cada
  señal encontrada revela por qué ese elemento es fraudulento.
- **Redes Wi-Fi** — Analizador de seguridad de redes inalámbricas. Presenta
  escenarios ficticios con distintos niveles de cifrado (Abierta, WEP, WPA2,
  WPA3), vectores de ataque reales y recomendaciones de uso. Los datos se
  cargan dinámicamente desde una API externa mediante `fetch()`.
  
## Stack
HTML5 semántico, CSS3 con custom properties y grid, JavaScript vanilla ES6.
Sin frameworks, sin librerías, sin dependencias externas. Para la sección
de WiFi implementé `fetch()` con `async/await` consumiendo JSONPlaceholder
como simulación de la API real.
La estructura React ya está armada en `src/` — componentes, router, shells
por página — lista para migrar cuando haga falta.

## Estructura
RUNIC/
├── index.html              # Landing con las 3 herramientas
├── password.html           # Verificador de contraseñas
├── phishing.html           # Simulador de phishing
├── wifi.html               # Analizador de redes Wi-Fi (fetch API)
├── css/
│   └── styles.css          # Estilos compartidos, variables CSS, responsive
├── js/
│   ├── password.js         # Análisis en tiempo real
│   ├── phishing.js         # Detección de señales en emails
│   └── wifi.js             # Fetch + mapeo + render dinámico
├── src/                    # Estructura React preparada para migración
│   ├── App.js              # Router: /, /password, /phishing, /wifi
│   ├── components/         # Header y Nav compartidos
│   └── pages/              # Shells por herramienta
├── img/                    # Logo y assets
└── README.md
