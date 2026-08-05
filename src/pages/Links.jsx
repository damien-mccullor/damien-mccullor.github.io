/*
 * LOGIC BRIEFING:
 * Links — Public links page at /#/links
 * Displays 3 professional link cards each with an AI-generated image, title, description, and external URL.
 * All cards open links in a new tab. No Supabase calls. Static presentational page.
 * Uses useLanguage() to render translated titles, descriptions, and labels.
 */

import { brandColors } from '../constants/brandColors'
import { useLanguage } from '../context/LanguageContext'
import imgLinkedIn from '../assets/images/Link_LinkedIn.svg'
import imgResume from '../assets/images/Link_Resume.svg'
import imgGitHub from '../assets/images/Link_GitHub.svg'
import './Links.css'

/* SECTION: LINK CONFIG — keys into translation files; images and URLs are static */
const linkItems = [
  { key: 'linkedin', url: 'https://www.linkedin.com/in/damien-mccullor/', image: imgLinkedIn, alt: 'LinkedIn profile page for Damien McCullor' },
  { key: 'resume',   url: 'https://www.linkedin.com/in/damien-mccullor/overlay/1785702504929/single-media-viewer/?profileId=ACoAAEESn9ABRYXm6p6tiLkdlwy9eiy9F1CqmcQ', image: imgResume, alt: 'Resume document for Damien McCullor on LinkedIn' },
  { key: 'github',   url: 'https://github.com/damien-mccullor', image: imgGitHub, alt: 'GitHub profile for damien-mccullor' },
]

function Links() {
  const { t } = useLanguage()

  return (
    <div className="links">

      {/* SECTION: PAGE HEADER */}
      <section className="links__header" style={{ backgroundColor: brandColors.dark, color: brandColors.textLight }}>
        <h1 className="links__title" style={{ color: brandColors.accent }}>{t('links.title')}</h1>
        <p className="links__subtitle" style={{ color: brandColors.textMuted }}>
          {t('links.subtitle')}
        </p>
      </section>

      {/* SECTION: LINK CARDS */}
      <section className="links__grid-section" style={{ backgroundColor: brandColors.lightBg }}>
        <div className="links__grid">
          {linkItems.map(({ key, url, image, alt }) => (
            <a
              key={key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="links__card"
              style={{ backgroundColor: brandColors.white }}
            >
              <img src={image} alt={alt} className="links__card-img" />
              <div className="links__card-body">
                <h2 className="links__card-title" style={{ color: brandColors.textDark }}>{t(`links.${key}_title`)}</h2>
                <p className="links__card-desc" style={{ color: brandColors.textMuted }}>{t(`links.${key}_desc`)}</p>
                <span className="links__card-cta" style={{ color: brandColors.accentDark }}>{t('links.visit')}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

    </div>
  )
}

export default Links
