/*
 * LOGIC BRIEFING:
 * Links — Links page stub
 * Placeholder until link-page feature is implemented.
 * No Supabase calls. No state. Static placeholder only.
 */

/*
 * LOGIC BRIEFING:
 * Links — Public links page at /#/links
 * Displays 3 professional link cards each with an AI-generated image, title, description, and external URL.
 * All cards open links in a new tab. No Supabase calls. No state. Static presentational page.
 */

import { brandColors } from '../constants/brandColors'
import imgLinkedIn from '../assets/images/Link_LinkedIn.svg'
import imgResume from '../assets/images/Link_Resume.svg'
import imgGitHub from '../assets/images/Link_GitHub.svg'
import './Links.css'

/* SECTION: LINK DATA — 3 professional links */
const links = [
  {
    title: 'LinkedIn Profile',
    description: 'Professional networking profile showcasing work experience, military career, technical skills, and certifications. Connect to view the full career history and send a message.',
    url: 'https://www.linkedin.com/in/damien-mccullor/',
    image: imgLinkedIn,
    alt: 'LinkedIn profile page for Damien McCullor showing professional networking connections',
  },
  {
    title: 'Online Resume',
    description: 'Full-stack software engineer resume hosted on LinkedIn, including technical projects, Python certifications, military leadership experience, and cybersecurity coursework.',
    url: 'https://www.linkedin.com/in/damien-mccullor/overlay/1785702504929/single-media-viewer/?profileId=ACoAAEESn9ABRYXm6p6tiLkdlwy9eiy9F1CqmcQ',
    image: imgResume,
    alt: 'Resume document for Damien McCullor listing experience and certifications on LinkedIn',
  },
  {
    title: 'GitHub Profile',
    description: 'Open source project repositories including React Native mobile apps, Java Spring Boot REST APIs, and MERN stack applications. View commit history and code quality.',
    url: 'https://github.com/damien-mccullor',
    image: imgGitHub,
    alt: 'GitHub profile for damien-mccullor showing software development repositories and projects',
  },
]

function Links() {
  return (
    <div className="links">

      {/* SECTION: PAGE HEADER */}
      <section className="links__header" style={{ backgroundColor: brandColors.dark, color: brandColors.textLight }}>
        <h1 className="links__title" style={{ color: brandColors.accent }}>Links</h1>
        <p className="links__subtitle" style={{ color: brandColors.textMuted }}>
          Professional Profiles &amp; Resources
        </p>
      </section>

      {/* SECTION: LINK CARDS */}
      <section className="links__grid-section" style={{ backgroundColor: brandColors.lightBg }}>
        <div className="links__grid">
          {links.map(({ title, description, url, image, alt }) => (
            <a
              key={title}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="links__card"
              style={{ backgroundColor: brandColors.white }}
            >
              <img src={image} alt={alt} className="links__card-img" />
              <div className="links__card-body">
                <h2 className="links__card-title" style={{ color: brandColors.textDark }}>{title}</h2>
                <p className="links__card-desc" style={{ color: brandColors.textMuted }}>{description}</p>
                <span className="links__card-cta" style={{ color: brandColors.accentDark }}>Visit &rarr;</span>
              </div>
            </a>
          ))}
        </div>
      </section>

    </div>
  )
}

export default Links
