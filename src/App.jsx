/*
 * LOGIC BRIEFING:
 * App — Root route configuration
 * Defines all client-side routes using react-router-dom.
 * All page components are lazy-loaded for route-level code splitting (Lighthouse baseline).
 * Every route renders inside Layout, which provides the persistent Header and Footer.
 * Login and BackOffice are routable but excluded from the nav links in Header.
 * No Supabase calls. No state.
 */

import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'

/* SECTION: LAZY PAGE IMPORTS — code split per route */
const Home       = lazy(() => import('./pages/Home'))
const Portfolio  = lazy(() => import('./pages/Portfolio'))
const Links      = lazy(() => import('./pages/Links'))
const Contact    = lazy(() => import('./pages/Contact'))
const Login      = lazy(() => import('./pages/Login'))
const BackOffice = lazy(() => import('./pages/BackOffice'))

/* SECTION: COMPONENT */
function App() {
  return (
    <Layout>
      {/* SECTION: SUSPENSE — fallback shown while a page chunk loads */}
      <Suspense fallback={<div className="page-loading">Loading…</div>}>
        <Routes>
          {/* SECTION: PUBLIC ROUTES */}
          <Route path="/"          element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/links"     element={<Links />} />
          <Route path="/contact"   element={<Contact />} />

          {/* SECTION: SECRET / PROTECTED ROUTES — not in navigation */}
          <Route path="/login"      element={<Login />} />
          <Route path="/backoffice" element={<BackOffice />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}

export default App
