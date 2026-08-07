/*
 * LOGIC BRIEFING:
 * Portfolio — Public resume page at /#/portfolio
 * Displays education (degree + certifications), work experience, projects, and a PDF resume download.
 * At least 2 AI-generated images. No Supabase calls. No state. Static presentational page.
 */

import { brandColors } from '../constants/brandColors'
import { useLanguage } from '../context/LanguageContext'
import imgMobile from '../assets/images/Portfolio_Project_Mobile.svg'
import imgAPI from '../assets/images/Portfolio_Project_API.svg'
import imgMERN from '../assets/images/Portfolio_Project_MERN.svg'
import imgDevPortfolio from '../assets/images/Portfolio_Project_DevPortfolio.svg'
import './Portfolio.css'

/* SECTION: EDUCATION DATA — 1 degree, 5 certifications */
const education = [
  {
    institution: 'Wayland Baptist University',
    degree: 'Bachelor of Science in Cybersecurity',
    status: 'Junior — In Progress',
    dates: 'Jan 2026 – Expected May 2027',
  },
  {
    institution: 'CodeBoxx Academy',
    degree: 'Full Stack Developer Program',
    status: 'In Progress — Certificate of Completion',
    dates: 'Dec 2025 – Aug 2026',
  },
]

const certifications = [
  { name: 'PCEP — Certified Entry-Level Python Programmer', issuer: 'Python Institute', year: '2025' },
  { name: 'Data Analytics Essentials', issuer: 'Cisco Networking Academy', year: '2025' },
  { name: 'Python Essentials 2 (Advanced Module)', issuer: 'Cisco Networking Academy', year: '2025' },
  { name: 'Database Fundamentals: Working with SQL Commands', issuer: 'Certificate of Completion', year: '2025' },
  { name: 'AWS Cloud Practitioner Training', issuer: 'Certificate of Completion', year: '2025' },
]

/* SECTION: WORK EXPERIENCE DATA — 2 entries, reverse chronological */
const workExperience = [
  {
    title: 'Lead Simulation Supervisor / Battle Director',
    organization: 'Hawaii Air National Guard — 169th Aircraft Control and Warning Squadron',
    dates: 'Mar 2015 – Apr 2024',
    bullets: [
      'Led data synthesis efforts for mission post-analysis, identifying manual processing inefficiencies that resulted in a 15% improvement in reporting efficiency.',
      'Managed and synthesized complex operational data, identifying critical data points for generating command-level reports and decision support.',
      'Mentored 30+ personnel and enforced cybersecurity compliance standards across classified systems.',
      'Interpreted complex sensor feeds and geospatial data, generating accurate mission intelligence reports for strategic decision-making.',
    ],
  },
  {
    title: 'Operations Specialist — Multiple Duty Stations',
    organization: 'United States Navy',
    dates: 'Jun 2000 – Mar 2013',
    bullets: [
      'Analyzed radar data for 500+ contacts per watch cycle, producing actionable intelligence for command personnel.',
      'Reduced data entry errors by 8% through systematic validation processes and enforced data quality standards.',
      'Managed and validated 500+ relational data entries per watch cycle, ensuring long-term data integrity for operational analysis and reporting.',
    ],
  },
]

/* SECTION: PROJECTS DATA — 3 full-stack engineering projects; images added in SR-7 */
const projects = [
  {
    name: 'Rocket Food Delivery — Customer & Courier Mobile App',
    tech: ['React Native', 'Expo SDK', 'Java Spring Boot', 'JWT Auth', 'REST API'],
    description:
      'Architected a cross-platform mobile food delivery application using React Native and Expo SDK connected to a Java Spring Boot REST API. Implemented JWT token-based authentication, dynamic ordering workflows with real-time confirmation modals, and developed dual-role session routing for customers and couriers with strict order state transition locks.',
    image: imgMobile,
  },
  {
    name: 'Rocket Food Delivery — Enterprise REST API & Back-Office',
    tech: ['Java 17', 'Spring Boot', 'MySQL', 'Hibernate', 'JUnit 5', 'Thymeleaf'],
    description:
      'Architected an enterprise back-office management system across a 9-table relational database using Java 17, Spring Boot, and MySQL. Engineered the REST API following strict Test-Driven Development with JUnit 5 and MockMvc. Secured all operations with parameterized SQL queries to eliminate injection vulnerabilities.',
    image: imgAPI,
  },
  {
    name: 'CodeBloggs — Developer Platform & DevOps Suite',
    tech: ['MongoDB', 'Express', 'React', 'Node.js', 'Redux', 'Selenium', 'Lighthouse'],
    description:
      'Collaborated in an Agile two-person team to build a full-stack developer social platform using the MERN stack with Redux-Thunk state management. Executed DevOps quality auditing using Google Lighthouse and automated end-to-end regression testing with a comprehensive Selenium IDE test suite.',
    image: imgMERN,
  },
  {
    name: 'Personal Developer Portfolio',
    tech: ['React', 'Vite', 'Supabase', 'GitHub Actions', 'GitHub Pages'],
    description:
      'Designed and deployed a personal portfolio web application using React and Vite, with client-side contact form persistence via Supabase and a fully automated CI/CD deployment pipeline via GitHub Actions to GitHub Pages.',
    image: imgDevPortfolio,
  },
]

function Portfolio() {
  const { t } = useLanguage()
  return (
    <div className="portfolio">

      {/* SECTION: PAGE HEADER */}
      <section className="portfolio__header" style={{ backgroundColor: brandColors.dark, color: brandColors.textLight }}>
        <h1 className="portfolio__title" style={{ color: brandColors.accent }}>{t('portfolio.title')}</h1>
        <p className="portfolio__subtitle" style={{ color: brandColors.textMuted }}>
          {t('portfolio.subtitle')}
        </p>
        {/* download attr triggers file download; file must be in public/ */}
        <a
          href="/FSD-Resume.pdf"
          download
          className="portfolio__download-btn"
          style={{ backgroundColor: brandColors.accent, color: brandColors.dark }}
        >
          {t('portfolio.download')}
        </a>
      </section>

      {/* SECTION: EDUCATION */}
      <section className="portfolio__section" style={{ backgroundColor: brandColors.lightBg }}>
        <h2 className="portfolio__section-title" style={{ color: brandColors.dark }}>{t('portfolio.education_title')}</h2>

        {education.map(({ institution, degree, status, dates }) => (
          <div key={institution} className="portfolio__edu-card" style={{ backgroundColor: 'var(--theme-surface)' }}>
            <h3 className="portfolio__edu-institution" style={{ color: 'var(--theme-text)' }}>{institution}</h3>
            <p className="portfolio__edu-degree" style={{ color: brandColors.accentDark }}>{degree}</p>
            <p className="portfolio__edu-meta" style={{ color: brandColors.textMuted }}>{status} &nbsp;|&nbsp; {dates}</p>
          </div>
        ))}

        {/* SECTION: CERTIFICATIONS */}
        <h3 className="portfolio__sub-title" style={{ color: 'var(--theme-text)' }}>{t('portfolio.cert_title')}</h3>
        <ul className="portfolio__cert-list">
          {certifications.map(({ name, issuer, year }) => (
            <li key={name} className="portfolio__cert-item">
              <span className="portfolio__cert-name" style={{ color: 'var(--theme-text)' }}>{name}</span>
              <span className="portfolio__cert-meta" style={{ color: brandColors.textMuted }}>{issuer} &nbsp;|&nbsp; {year}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* SECTION: WORK EXPERIENCE */}
      <section className="portfolio__section portfolio__section--dark" style={{ backgroundColor: brandColors.midDark }}>
        <h2 className="portfolio__section-title" style={{ color: brandColors.accent }}>{t('portfolio.work_title')}</h2>
        {workExperience.map(({ title, organization, dates, bullets }) => (
          <div key={title} className="portfolio__work-card">
            <h3 className="portfolio__work-title" style={{ color: brandColors.accent }}>{title}</h3>
            <p className="portfolio__work-org" style={{ color: brandColors.textLight }}>{organization}</p>
            <p className="portfolio__work-dates" style={{ color: brandColors.textMuted }}>{dates}</p>
            <ul className="portfolio__work-bullets">
              {bullets.map((bullet, i) => (
                <li key={i} style={{ color: brandColors.textLight }}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* SECTION: PROJECTS */}
      <section className="portfolio__section" style={{ backgroundColor: brandColors.lightBg }}>
        <h2 className="portfolio__section-title" style={{ color: brandColors.dark }}>{t('portfolio.projects_title')}</h2>
        <div className="portfolio__project-grid">
          {projects.map(({ name, tech, description, image }) => (
            <div key={name} className="portfolio__project-card" style={{ backgroundColor: 'var(--theme-surface)' }}>
              {/* image slot filled in SR-7 */}
              {image
                ? <img src={image} alt={`Screenshot of ${name}`} className="portfolio__project-img" />
                : <div className="portfolio__project-img-placeholder" style={{ backgroundColor: brandColors.midDark }} />}
              <div className="portfolio__project-body">
                <h3 className="portfolio__project-name" style={{ color: 'var(--theme-text)' }}>{name}</h3>
                <ul className="portfolio__project-tech">
                  {tech.map(t => (
                    <li key={t} className="portfolio__project-tag" style={{ backgroundColor: brandColors.dark, color: brandColors.accent }}>{t}</li>
                  ))}
                </ul>
                <p className="portfolio__project-desc" style={{ color: brandColors.textMuted }}>{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}

export default Portfolio
