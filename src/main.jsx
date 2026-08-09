/*
 * LOGIC BRIEFING:
 * main.jsx — application bootstrap for the Vite React portfolio.
 * Mounts the root app inside HashRouter and the language/theme providers.
 * Loads the global stylesheet and the top-level App component.
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import { ThemeProvider } from './context/ThemeContext'
import './index.css'
import App from './App.jsx'

/* SECTION: ROOT RENDER */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <ThemeProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </ThemeProvider>
    </HashRouter>
  </StrictMode>,
)
