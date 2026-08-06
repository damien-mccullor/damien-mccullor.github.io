/*
 * LOGIC BRIEFING:
 * Login — Secret admin login page at /#/login (not linked in navigation)
 * On mount: checks for an existing Supabase Auth session; redirects to /backoffice if found.
 * On submit: calls supabase.auth.signInWithPassword(); redirects to /backoffice on success.
 * On failure: displays a red error message below the form.
 * State: email, password, error, loading.
 */

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import supabase from '../lib/supabaseClient'
import { brandColors } from '../constants/brandColors'
import './Login.css'

function Login() {
  /* SECTION: STATE — form fields, error message, loading flag */
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  /* SECTION: SESSION CHECK ON MOUNT — redirect if already authenticated */
  useEffect(() => {
    if (!supabase) return
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate('/backoffice', { replace: true })
    })
  }, [navigate])

  /* SECTION: SUBMIT HANDLER — authenticates via Supabase signInWithPassword */
  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!supabase) {
      setError('Authentication service unavailable. Please try again later.')
      return
    }

    setLoading(true)
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)

    if (authError) {
      setError('Invalid login credentials. Please try again.')
    } else {
      navigate('/backoffice', { replace: true })
    }
  }

  return (
    <div className="login">

      {/* SECTION: LOGIN CARD */}
        <div className="login__card" style={{ backgroundColor: 'var(--theme-surface)' }}>
        <h1 className="login__title" style={{ color: 'var(--theme-text)' }}>Admin Login</h1>
        <p className="login__subtitle" style={{ color: brandColors.textMuted }}>
          This page is not publicly linked.
        </p>

        <form onSubmit={handleSubmit} className="login__form" noValidate>

          {/* SECTION: ERROR MESSAGE */}
          {error && (
            <div className="login__error" role="alert">
              {error}
            </div>
          )}

          {/* SECTION: EMAIL FIELD */}
          <div className="login__field">
            <label htmlFor="email" className="login__label" style={{ color: 'var(--theme-text)' }}>
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@codeboxx.com"
              className="login__input"
              autoComplete="email"
              required
            />
          </div>

          {/* SECTION: PASSWORD FIELD */}
          <div className="login__field">
            <label htmlFor="password" className="login__label" style={{ color: 'var(--theme-text)' }}>
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="login__input"
              autoComplete="current-password"
              required
            />
          </div>

          {/* SECTION: SUBMIT BUTTON */}
          <button
            type="submit"
            className="login__submit"
            disabled={loading}
            style={{ backgroundColor: brandColors.accent, color: brandColors.dark }}
          >
            {loading ? 'Signing in…' : 'Login'}
          </button>

        </form>
      </div>

    </div>
  )
}

export default Login
