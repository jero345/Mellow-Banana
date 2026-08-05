import { createContext, useContext } from 'react'

/**
 * Language context, kept apart from <LanguageProvider> so that file exports a
 * component only and Fast Refresh keeps working.
 *
 * `t(key)`   → UI string from src/i18n/dictionary.js
 * `f(field)` → resolves a { es, en } field from the data layer
 */
export const LanguageContext = createContext(null)

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used inside <LanguageProvider>')
  return ctx
}
