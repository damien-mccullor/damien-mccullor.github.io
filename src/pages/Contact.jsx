/*
 * LOGIC BRIEFING:
 * Contact — Public contact form at /#/contact
 * Controlled form with name, email, message fields.
 * Validates inputs client-side, then inserts to Supabase `messages` table on submit.
 * Displays success (green, auto-dismiss) or failure (red) feedback after submission.
 * State: formData (name/email/message), errors (validation), feedback (status/message).
 */

import { useState } from 'react'
import supabase from '../lib/supabaseClient'
import { brandColors } from '../constants/brandColors'
import { useLanguage } from '../context/LanguageContext'
import './Contact.css'

function Contact() {
  /* SECTION: STATE — form fields, validation errors, submission feedback */
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [feedback, setFeedback] = useState(null) // { type: 'success'|'error', text: string }
  const [submitting, setSubmitting] = useState(false)
  const { t } = useLanguage()

  /* SECTION: INPUT HANDLER */
  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  /* SECTION: VALIDATION */
  function validate() {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = t('contact.err_name')
    if (!formData.email.trim()) {
      newErrors.email = t('contact.err_email_required')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('contact.err_email_format')
    }
    if (!formData.message.trim()) newErrors.message = t('contact.err_message')
    return newErrors
  }

  /* SECTION: SUBMIT HANDLER — validates then inserts to Supabase messages table */
  async function handleSubmit(e) {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setSubmitting(true)
    setFeedback(null)

    if (!supabase) {
      setFeedback({ type: 'error', text: t('contact.error') })
      setSubmitting(false)
      return
    }

    const { error } = await supabase
      .from('messages')
      .insert([{ name: formData.name, email: formData.email, message: formData.message }])

    setSubmitting(false)

    if (error) {
      setFeedback({ type: 'error', text: t('contact.error') })
    } else {
      setFormData({ name: '', email: '', message: '' })
      setErrors({})
      setFeedback({ type: 'success', text: t('contact.success') })
      setTimeout(() => setFeedback(null), 4000)
    }
  }

  return (
    <div className="contact">

      {/* SECTION: PAGE HEADER */}
      <section className="contact__header" style={{ backgroundColor: brandColors.dark, color: brandColors.textLight }}>
        <h1 className="contact__title" style={{ color: brandColors.accent }}>{t('contact.title')}</h1>
        <p className="contact__subtitle" style={{ color: brandColors.textMuted }}>
          {t('contact.subtitle')}
        </p>
      </section>

      {/* SECTION: FORM SECTION */}
      <section className="contact__form-section" style={{ backgroundColor: 'var(--theme-bg)' }}>
        <form className="contact__form" onSubmit={handleSubmit} noValidate style={{ backgroundColor: 'var(--theme-surface)' }}>

          {/* SECTION: FEEDBACK MESSAGE */}
          {feedback && (
            <div
              className={`contact__feedback contact__feedback--${feedback.type}`}
              role="alert"
            >
              <span className="contact__feedback-icon">
                {feedback.type === 'success' ? '✓' : '✗'}
              </span>
              {feedback.text}
            </div>
          )}

          {/* SECTION: NAME FIELD */}
          <div className="contact__field">
            <label htmlFor="name" className="contact__label" style={{ color: 'var(--theme-text)' }}>
              {t('contact.name_label')}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t('contact.name_placeholder')}
              className={`contact__input${errors.name ? ' contact__input--error' : ''}`}
              autoComplete="name"
            />
            {errors.name && <span className="contact__error">{errors.name}</span>}
          </div>

          {/* SECTION: EMAIL FIELD */}
          <div className="contact__field">
            <label htmlFor="email" className="contact__label" style={{ color: 'var(--theme-text)' }}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t('contact.email_placeholder')}
              className={`contact__input${errors.email ? ' contact__input--error' : ''}`}
              autoComplete="email"
            />
            {errors.email && <span className="contact__error">{errors.email}</span>}
          </div>

          {/* SECTION: MESSAGE FIELD */}
          <div className="contact__field">
            <label htmlFor="message" className="contact__label" style={{ color: 'var(--theme-text)' }}>
              {t('contact.message_label')}
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={t('contact.message_placeholder')}
              rows={6}
              className={`contact__textarea${errors.message ? ' contact__input--error' : ''}`}
            />
            {errors.message && <span className="contact__error">{errors.message}</span>}
          </div>

          {/* SECTION: SUBMIT BUTTON */}
          <button
            type="submit"
            className="contact__submit"
            disabled={submitting}
            style={{ backgroundColor: brandColors.accent, color: brandColors.dark }}
          >
            {submitting ? t('contact.sending') : t('contact.submit')}
          </button>

        </form>
      </section>

    </div>
  )
}

export default Contact
