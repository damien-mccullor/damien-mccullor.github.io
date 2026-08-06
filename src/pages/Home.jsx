/*
 * LOGIC BRIEFING:
 * Home — Public landing page at /#/
 * Displays introduction, technical skills (4 categories × 14 skills), soft skills (7 talents), and at least 2 AI-generated images.
 * Uses useLanguage() to render all user-facing text in the selected language.
 * No Supabase calls. No state.
 */

import { brandColors } from '../constants/brandColors'
import { useLanguage } from '../context/LanguageContext'
import imgWorkspace from '../assets/images/Homepage_Image_Workspace.png'
import imgCyber from '../assets/images/Homepage_Image_Cyber.png'
import './Home.css'

/* SECTION: STATIC SKILL ICONS — SVGs keyed by translation ID; text comes from i18n */
const skillIcons = {
  javascript:     <svg viewBox="0 0 24 24" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="2"/><text x="6" y="17" fontSize="10" fontWeight="bold" fill="#F7DF1E" fontFamily="monospace">JS</text></svg>,
  python:         <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C9.3 2 7 3.1 7 4.5V7h5v1H5.5C4.1 8 3 10.3 3 13s1.1 5 2.5 5H7v-2.5C7 14.1 9.3 13 12 13s5 1.1 5 2.5V18h1.5c1.4 0 2.5-2.3 2.5-5s-1.1-5-2.5-5H17V5c0-1.5-2.2-3-5-3zm-1.5 1.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 14a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg>,
  react:          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="2.5"/><ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5"/><ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(120 12 12)"/></svg>,
  react_native:   <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="2" width="12" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/><line x1="9" y1="19" x2="15" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  nodejs:         <svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="12,2 20,7 20,17 12,22 4,17 4,7" fill="none" stroke="currentColor" strokeWidth="1.5"/><text x="8.5" y="15" fontSize="7" fontWeight="bold" fill="currentColor" fontFamily="monospace">N</text></svg>,
  mongodb:        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C8 2 6 8 6 12c0 3.3 1.8 6.1 4.5 7.5L12 22l1.5-2.5C16.2 18.1 18 15.3 18 12c0-4-2-10-6-10z" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>,
  mongoose:       <svg viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="8" rx="8" ry="3" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M4 8v4c0 1.7 3.6 3 8 3s8-1.3 8-3V8" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M4 12v4c0 1.7 3.6 3 8 3s8-1.3 8-3v-4" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>,
  mysql:          <svg viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="6" rx="8" ry="2.5" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M4 6v5c0 1.4 3.6 2.5 8 2.5S20 12.4 20 11V6" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M4 11v5c0 1.4 3.6 2.5 8 2.5S20 17.4 20 16v-5" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>,
  aws:            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 14.5C4 14 2 12 2 9.5A5.5 5.5 0 0 1 12 5a5.5 5.5 0 0 1 10 3.5c0 2.5-2 4.5-4.5 5" fill="none" stroke="currentColor" strokeWidth="1.5"/><polyline points="8,17 12,21 16,17" fill="none" stroke="currentColor" strokeWidth="1.5"/><line x1="12" y1="12" x2="12" y2="21" stroke="currentColor" strokeWidth="1.5"/></svg>,
  git:            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="18" r="2" fill="none" stroke="currentColor" strokeWidth="1.5"/><circle cx="18" cy="6" r="2" fill="none" stroke="currentColor" strokeWidth="1.5"/><circle cx="18" cy="18" r="2" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M8 18h6" stroke="currentColor" strokeWidth="1.5"/><path d="M16 8v8" stroke="currentColor" strokeWidth="1.5"/></svg>,
  github_actions: <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5"/><polygon points="10,8 16,12 10,16" fill="currentColor"/></svg>,
  tableau:        <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="12" width="4" height="9" fill="none" stroke="currentColor" strokeWidth="1.5"/><rect x="10" y="7" width="4" height="14" fill="none" stroke="currentColor" strokeWidth="1.5"/><rect x="17" y="3" width="4" height="18" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>,
  excel:          <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5"/><line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" strokeWidth="1.5"/><line x1="3" y1="15" x2="21" y2="15" stroke="currentColor" strokeWidth="1.5"/><line x1="9" y1="3" x2="9" y2="21" stroke="currentColor" strokeWidth="1.5"/><line x1="15" y1="3" x2="15" y2="21" stroke="currentColor" strokeWidth="1.5"/></svg>,
  dbeaver:        <svg viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="5" rx="8" ry="2.5" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M4 5v14c0 1.4 3.6 2.5 8 2.5S20 20.4 20 19V5" fill="none" stroke="currentColor" strokeWidth="1.5"/><line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="1"/></svg>,
}

const softSkillIcons = {
  communication:     <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  leadership:        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9"/></svg>,
  teamwork:          <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="9" cy="7" r="3"/><circle cx="15" cy="7" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6h6c3.3 0 6 2.7 6 6"/></svg>,
  problem_solving:   <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg>,
  adaptability:      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23,4 23,10 17,10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>,
  critical_thinking: <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  continuous_learning: <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
}

/* SECTION: STATIC CATEGORY STRUCTURE — skill keys per category */
const categoryKeys = [
  { cat: 'languages',        skills: ['javascript', 'python'] },
  { cat: 'frontend_mobile',  skills: ['react', 'react_native'] },
  { cat: 'backend_database', skills: ['nodejs', 'mongodb', 'mongoose', 'mysql'] },
  { cat: 'cloud_tools',      skills: ['aws', 'git', 'github_actions', 'tableau', 'excel', 'dbeaver'] },
]

const softSkillKeys = ['communication', 'leadership', 'teamwork', 'problem_solving', 'adaptability', 'critical_thinking', 'continuous_learning']

function Home() {
  const { t } = useLanguage()

  /* SECTION: BUILD SKILL CATEGORIES FROM TRANSLATION — keys resolved per language */
  const skillCategories = categoryKeys.map(({ cat, skills }) => ({
    category: t(`home.skill_categories.${cat}`),
    skills: skills.map(key => ({
      name: t(`home.skills.${key}.name`),
      description: t(`home.skills.${key}.desc`),
      icon: skillIcons[key],
    })),
  }))

  /* SECTION: BUILD SOFT SKILLS FROM TRANSLATION */
  const softSkills = softSkillKeys.map(key => ({
    name: t(`home.soft_skills.${key}.name`),
    description: t(`home.soft_skills.${key}.desc`),
    icon: softSkillIcons[key],
  }))

  return (
    <div className="home">

      {/* SECTION: INTRODUCTION */}
      <section className="home__intro" style={{ backgroundColor: brandColors.dark, color: brandColors.textLight }}>
        <h1 className="home__name" style={{ color: brandColors.accent }}>Damien McCullor</h1>
        <p className="home__tagline" style={{ color: brandColors.textMuted }}>
          {t('home.tagline')}
        </p>
        <p className="home__bio">
          {t('home.bio')}
        </p>
      </section>

      {/* SECTION: TECHNICAL SKILLS */}
      <section className="home__skills" style={{ backgroundColor: 'var(--theme-bg)' }}>
        <h2 className="home__section-title" style={{ color: 'var(--theme-text)' }}>{t('home.skills_title')}</h2>
        {skillCategories.map(({ category, skills }) => (
          <div key={category} className="home__skill-category">
            <h3 className="home__category-label" style={{ color: brandColors.accentDark }}>{category}</h3>
            <div className="home__skill-grid">
              {skills.map(({ name, description, icon }) => (
                <div key={name} className="home__skill-card" style={{ backgroundColor: 'var(--theme-surface)' }}>
                  {/* SECTION: SKILL ICON */}
                  <span className="home__skill-icon" style={{ color: brandColors.accent }}>{icon}</span>
                  <h4 className="home__skill-name" style={{ color: 'var(--theme-text)' }}>{name}</h4>
                  <p className="home__skill-desc" style={{ color: 'var(--theme-text-muted)' }}>{description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* SECTION: AI IMAGE — workspace, separates technical and soft skills */}
      <figure className="home__image-figure home__image-figure--full" style={{ backgroundColor: brandColors.dark }}>
        <img
          src={imgWorkspace}
          alt="A software developer writing code in VS Code at a dark ambient workstation"
          className="home__image home__image--full"
        />
      </figure>

      {/* SECTION: SOFT SKILLS */}
      <section className="home__soft-skills" style={{ backgroundColor: brandColors.midDark }}>
        <h2 className="home__section-title" style={{ color: brandColors.accent }}>{t('home.soft_title')}</h2>
        <div className="home__soft-grid">
          {softSkills.map(({ name, description, icon }) => (
            <div key={name} className="home__soft-card" style={{ border: `1px solid ${brandColors.accent}33` }}>
              <span className="home__soft-icon" style={{ color: brandColors.accent }}>{icon}</span>
              <h3 className="home__soft-name" style={{ color: brandColors.accent }}>{name}</h3>
              <p className="home__soft-desc" style={{ color: brandColors.textLight }}>{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: AI IMAGE — cyber, closes the page */}
      <figure className="home__image-figure home__image-figure--full" style={{ backgroundColor: brandColors.dark }}>
        <img
          src={imgCyber}
          alt="A holographic cybersecurity network visualization showing interconnected nodes, code, and security locks"
          className="home__image home__image--full"
        />
      </figure>

    </div>
  )
}

export default Home

