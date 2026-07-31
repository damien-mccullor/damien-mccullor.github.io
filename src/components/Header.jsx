/*
 * LOGIC BRIEFING:
 * Header — Sticky site-wide navigation header
 * Renders the logo image (BWG.png, black-background folder) and navigation links to all public pages.
 * Desktop (>768px): logo + horizontal nav links fixed at top.
 * Mobile (≤768px): logo-only header at top; icon-only nav bar fixed at bottom.
 * Login and BackOffice routes are intentionally excluded from navigation.
 * No Supabase calls. No state. Uses NavLink for active-link highlighting.
 */

import { NavLink } from 'react-router-dom'
import { brandColors } from '../constants/brandColors'
import logoHeader from '../assets/black-background/BWG.png'
import './Header.css'

/* SECTION: NAV ITEMS — public pages only; Login and BackOffice excluded */
const navItems = [
  { path: '/',          label: 'Home'      },
  { path: '/portfolio', label: 'Portfolio' },
  { path: '/links',     label: 'Links'     },
  { path: '/contact',   label: 'Contact'   },
]

/* SECTION: INLINE SVG ICONS — one per nav item; no icon library */
const navIcons = {
  '/':          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>,
  '/portfolio': <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8-2h4v2h-4V4z"/></svg>,
  '/links':     <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>,
  '/contact':   <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>,
}

/* SECTION: COMPONENT */
function Header() {
  return (
    <>
      {/* SECTION: DESKTOP HEADER — hidden on mobile via CSS */}
      <header className="header" style={{ backgroundColor: brandColors.white, borderBottom: `1px solid ${brandColors.lightBg}` }}>

        {/* SECTION: LOGO — AI-generated BWG.png inside circular emblem */}
        <NavLink to="/" className="header__logo" aria-label="Damien McCullor — go to home">
          <span className="header__logo-emblem">
            <img src={logoHeader} alt="Damien McCullor logo" className="header__logo-img" />
          </span>
        </NavLink>

        {/* SECTION: DESKTOP NAV */}
        <nav className="header__nav" aria-label="Main navigation">
          {navItems.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              className={({ isActive }) =>
                isActive ? 'header__nav-link header__nav-link--active' : 'header__nav-link'
              }
              style={{ color: brandColors.accent }}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </header>

      {/* SECTION: MOBILE BOTTOM NAV — hidden on desktop via CSS */}
      <nav className="mobile-nav" aria-label="Mobile navigation" style={{ backgroundColor: brandColors.white, borderTop: `1px solid ${brandColors.lightBg}` }}>
        {navItems.map(({ path, label }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/'}
            className={({ isActive }) =>
              isActive ? 'mobile-nav__item mobile-nav__item--active' : 'mobile-nav__item'
            }
            aria-label={label}
          >
            <span className="mobile-nav__icon" style={{ fill: brandColors.textMuted }}>
              {navIcons[path]}
            </span>
          </NavLink>
        ))}
      </nav>
    </>
  )
}

export default Header
