/*
 * LOGIC BRIEFING:
 * Footer — Site-wide footer rendered on every page via Layout.
 * Three-column layout: logo on left, contact info in center, logo on right.
 * Switches logo between BGFF (light mode) and WGFF (dark mode) based on active theme.
 * No Supabase calls. Static presentational component.
 * AI tool used for logos: Gemini, ChatGPT, GitHub Copilot.
 */

import { brandColors } from '../constants/brandColors'
import { useTheme } from '../context/ThemeContext'
import logoFooterDark from '../assets/black-background/BGFF.png'
import logoFooterLight from '../assets/white_background/WGFF.png'
import './Footer.css'

/* SECTION: COMPONENT */
function Footer() {
  const year = new Date().getFullYear()
  const { theme } = useTheme()
  const logoFooter = theme === 'dark' ? logoFooterLight : logoFooterDark

  return (
    <footer className="footer" style={{ backgroundColor: 'var(--theme-header)', color: brandColors.textMuted, borderTop: `1px solid var(--theme-border)` }}>

      {/* SECTION: LEFT LOGO */}
      <img src={logoFooter} alt="Damien McCullor" className="footer__logo" />

      {/* SECTION: CENTER CONTENT */}
      <div className="footer__center">

        {/* SECTION: CONTACT INFO */}
        <div className="footer__contact">
          <a
            href="mailto:damien.mccullor@yahoo.com"
            className="footer__email"
            aria-label="Send email to Damien McCullor"
            style={{ fill: brandColors.accentDark }}
          >
            {/* envelope icon — email address intentionally not in DOM to prevent scraping */}
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
          </a>
        </div>

      {/* SECTION: SOCIAL LINKS — inline SVGs, no icon library */}
      <div className="footer__social">
        <a
          href="https://www.linkedin.com/in/damien-mccullor"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn profile"
          className="footer__social-link"
          style={{ fill: brandColors.textMuted }}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
          </svg>
        </a>

        <a
          href="https://github.com/damien-mccullor"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile"
          className="footer__social-link"
          style={{ fill: brandColors.textMuted }}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
          </svg>
        </a>
      </div>

      {/* SECTION: COPYRIGHT */}
        <p className="footer__copyright">
          &copy; {year} Damien McCullor. All rights reserved.
        </p>

      </div>{/* end footer__center */}

      {/* SECTION: RIGHT LOGO */}
      <img src={logoFooter} alt="" aria-hidden="true" className="footer__logo" />

    </footer>
  )
}

export default Footer
