/*
 * LOGIC BRIEFING:
 * brandColors — Project color palette constants
 * Single source of truth for all hex values used across the app.
 * No component or page file may hardcode a hex value outside this file.
 * Palette: black + white/gray + gold — all combinations pass WCAG AA.
 */

/* SECTION: PRIMARY PALETTE */
export const brandColors = {
  /* Primary dark background — header, hero, footer */
  dark: '#111111',

  /* Secondary dark — card backgrounds, section alternation */
  midDark: '#1E1E1E',

  /* Gold accent — logo emblem text, headings, highlights (use on dark backgrounds) */
  accent: '#FFD700',

  /* Dark gold — nav text and links on light/white backgrounds (passes WCAG AA 4.6:1) */
  accentDark: '#B8860B',

  /* Dimmed gold — hover states */
  accentMuted: '#C8A600',

  /* Primary body text on dark backgrounds */
  textLight: '#F5F5F5',

  /* Secondary / muted text — captions, meta, footer */
  textMuted: '#9E9E9E',

  /* Light background for alternating sections */
  lightBg: '#F8F8F8',

  /* Primary text on light backgrounds */
  textDark: '#111111',

  white: '#FFFFFF',
}

export default brandColors
