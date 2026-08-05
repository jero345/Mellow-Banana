import { useCallback, useEffect, useMemo, useState } from 'react'
import { dictionary } from './dictionary'
import { LanguageContext } from './useLang'

const STORAGE_KEY = 'mb-lang'

// Spanish is the site's primary language; the switch is opt-in and remembered.
function initialLang() {
  if (typeof window === 'undefined') return 'es'
  return window.localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'es'
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(initialLang)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
  }, [lang])

  const t = useCallback((key) => dictionary[lang][key] ?? dictionary.es[key] ?? key, [lang])

  /** Resolve a { es, en } field from the data layer. */
  const f = useCallback((field) => (field == null ? '' : (field[lang] ?? field.es ?? '')), [lang])

  const toggle = useCallback(() => setLang((l) => (l === 'es' ? 'en' : 'es')), [])

  const value = useMemo(() => ({ lang, setLang, toggle, t, f }), [lang, toggle, t, f])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
