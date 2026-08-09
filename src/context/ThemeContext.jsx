/* eslint-disable react-refresh/only-export-components */

/*
 * LOGIC BRIEFING:
 * ThemeContext — Global light/dark theme provider
 * Reads preference from localStorage; defaults to 'light' on first visit (no OS detection).
 * Sets data-theme attribute on <html> element to activate CSS custom property overrides.
 * Provides theme and toggleTheme to all consumers.
 */

import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  /* SECTION: INITIAL THEME — localStorage → 'light' (no OS detection) */
  const [theme, setThemeState] = useState(() => {
    const stored = localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') return stored
    return 'light' // no OS detection — user explicitly chooses via toggle
  })

  /* SECTION: APPLY THEME — set data-theme on <html> and persist to localStorage */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  function toggleTheme() {
    setThemeState(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
