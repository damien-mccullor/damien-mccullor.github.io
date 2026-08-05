/*
 * LOGIC BRIEFING:
 * LanguageContext — Global language/translation provider
 * Reads preference from localStorage; falls back to browser language; defaults to 'en'.
 * Provides language, setLanguage, and t(key) dot-notation lookup to all consumers.
 */

import { createContext, useContext, useState, useEffect } from 'react'
import en from '../i18n/en.json'
import fr from '../i18n/fr.json'

const translations = { en, fr }

const LanguageContext = createContext(null)

/* SECTION: DOT-NOTATION LOOKUP — resolves 'a.b.c' keys into nested JSON values */
function resolve(obj, path) {
  return path.split('.').reduce((acc, key) => acc?.[key], obj) ?? path
}

export function LanguageProvider({ children }) {
  /* SECTION: INITIAL LANGUAGE — localStorage → browser lang → 'en' */
  const [language, setLanguageState] = useState(() => {
    const stored = localStorage.getItem('language')
    if (stored === 'en' || stored === 'fr') return stored
    const browserLang = navigator.language?.slice(0, 2)
    return browserLang === 'fr' ? 'fr' : 'en'
  })

  /* SECTION: PERSIST TO LOCALSTORAGE */
  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  function setLanguage(lang) {
    if (lang === 'en' || lang === 'fr') setLanguageState(lang)
  }

  /* SECTION: TRANSLATION FUNCTION */
  function t(key) {
    return resolve(translations[language], key)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
