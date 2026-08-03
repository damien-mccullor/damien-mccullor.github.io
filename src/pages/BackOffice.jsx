/*
 * LOGIC BRIEFING:
 * BackOffice — Protected admin dashboard at /#/backoffice
 * Auth guard: checks session on mount; redirects to /login if unauthenticated.
 * Fetches all messages from Supabase `messages` table ordered by created_at DESC.
 * Supports: view message in modal, delete message, logout.
 * State: messages array, loading, error, selectedMessage (modal), deleting set.
 */

import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import supabase from '../lib/supabaseClient'
import { brandColors } from '../constants/brandColors'
import './BackOffice.css'

function BackOffice() {
  /* SECTION: STATE */
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [deletingIds, setDeletingIds] = useState(new Set())
  const navigate = useNavigate()

  /* SECTION: AUTH GUARD + FETCH ON MOUNT */
  useEffect(() => {
    if (!supabase) { navigate('/login', { replace: true }); return }
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { navigate('/login', { replace: true }); return }
      fetchMessages()
    })
  }, [navigate])

  /* SECTION: FETCH MESSAGES */
  const fetchMessages = useCallback(async () => {
    setLoading(true)
    setError('')
    const { data, error: fetchError } = await supabase
      .from('messages')
      .select('id, name, email, message, created_at')
      .order('created_at', { ascending: false })
    setLoading(false)
    if (fetchError) {
      setError('Failed to load messages. Please refresh.')
    } else {
      setMessages(data || [])
    }
  }, [])

  /* SECTION: DELETE MESSAGE — optimistic update */
  async function handleDelete(id) {
    setDeletingIds(prev => new Set(prev).add(id))
    setMessages(prev => prev.filter(m => m.id !== id))
    await supabase.from('messages').delete().eq('id', id)
    setDeletingIds(prev => { const s = new Set(prev); s.delete(id); return s })
  }

  /* SECTION: MODAL ESCAPE KEY LISTENER */
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') setSelectedMessage(null)
    }
    if (selectedMessage) document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [selectedMessage])

  /* SECTION: LOGOUT */
  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/', { replace: true })
  }

  return (
    <div className="backoffice">

      {/* SECTION: TOP BAR */}
      <div className="backoffice__topbar" style={{ backgroundColor: brandColors.dark }}>
        <h1 className="backoffice__title" style={{ color: brandColors.accent }}>Back Office</h1>
        <button
          className="backoffice__logout"
          onClick={handleLogout}
          style={{ backgroundColor: brandColors.midDark, color: brandColors.textLight, border: `1px solid ${brandColors.textMuted}` }}
        >
          Logout
        </button>
      </div>

      {/* SECTION: MESSAGES PANEL */}
      <div className="backoffice__content" style={{ backgroundColor: brandColors.lightBg }}>
        <h2 className="backoffice__subtitle" style={{ color: brandColors.textDark }}>Messages</h2>

        {/* SECTION: LOADING STATE */}
        {loading && <p className="backoffice__status" style={{ color: brandColors.textMuted }}>Loading messages…</p>}

        {/* SECTION: ERROR STATE */}
        {error && <p className="backoffice__status backoffice__status--error">{error}</p>}

        {/* SECTION: EMPTY STATE */}
        {!loading && !error && messages.length === 0 && (
          <p className="backoffice__status" style={{ color: brandColors.textMuted }}>No messages yet.</p>
        )}

        {/* SECTION: MESSAGES TABLE */}
        {!loading && !error && messages.length > 0 && (
          <div className="backoffice__table-wrap">
            <table className="backoffice__table">
              <thead>
                <tr style={{ backgroundColor: brandColors.dark, color: brandColors.textLight }}>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {messages.map(msg => (
                  <tr key={msg.id} className="backoffice__row" style={{ backgroundColor: brandColors.white }}>
                    <td style={{ color: brandColors.textDark }}>{msg.name}</td>
                    <td style={{ color: brandColors.textMuted }}>{msg.email}</td>
                    <td style={{ color: brandColors.textMuted }}>{new Date(msg.created_at).toLocaleString()}</td>
                    <td className="backoffice__actions">
                      <button
                        className="backoffice__btn backoffice__btn--view"
                        onClick={() => setSelectedMessage(msg)}
                        style={{ backgroundColor: brandColors.accent, color: brandColors.dark }}
                      >
                        View
                      </button>
                      <button
                        className="backoffice__btn backoffice__btn--delete"
                        onClick={() => handleDelete(msg.id)}
                        disabled={deletingIds.has(msg.id)}
                        style={{ backgroundColor: brandColors.midDark, color: brandColors.textLight }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* SECTION: VIEW MODAL */}
      {selectedMessage && (
        <div
          className="backoffice__backdrop"
          onClick={() => setSelectedMessage(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="backoffice__modal"
            onClick={e => e.stopPropagation()}
            style={{ backgroundColor: brandColors.white }}
          >
            <button
              className="backoffice__modal-close"
              onClick={() => setSelectedMessage(null)}
              aria-label="Close modal"
              style={{ color: brandColors.textMuted }}
            >
              ✕
            </button>
            <h3 className="backoffice__modal-title" style={{ color: brandColors.textDark }}>Message from {selectedMessage.name}</h3>
            <p className="backoffice__modal-meta" style={{ color: brandColors.textMuted }}>
              {selectedMessage.email} &nbsp;·&nbsp; {new Date(selectedMessage.created_at).toLocaleString()}
            </p>
            <p className="backoffice__modal-body" style={{ color: brandColors.textDark }}>{selectedMessage.message}</p>
          </div>
        </div>
      )}

    </div>
  )
}

export default BackOffice
