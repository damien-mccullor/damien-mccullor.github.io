/*
 * LOGIC BRIEFING:
 * Layout — Site-wide shell wrapper
 * Renders Header at the top, Footer at the bottom, and page content in between.
 * Wraps content in a <main> landmark for accessibility (Lighthouse baseline).
 * Used by App.jsx to wrap every route — no page renders outside this shell.
 * No Supabase calls. No state. No navigation side effects.
 */

import Header from './Header'
import Footer from './Footer'
import './Layout.css'

/* SECTION: COMPONENT */
function Layout({ children }) {
  return (
    <div className="layout">
      {/* SECTION: HEADER */}
      <Header />

      {/* SECTION: MAIN CONTENT — landmark required for Lighthouse accessibility */}
      <main className="layout__main">
        {children}
      </main>

      {/* SECTION: FOOTER */}
      <Footer />
    </div>
  )
}

export default Layout
