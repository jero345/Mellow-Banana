import { useCallback, useEffect, useMemo, useState } from 'react'
import { defaults } from './defaults'
import { fetchContent } from './api'
import { ContentContext } from './useContent'

/** Merge the CMS over the bundled content, table by table and string by string. */
function merge(remote) {
  if (!remote) return defaults
  return {
    ...defaults,
    ...remote,
    settings: {
      ...defaults.settings,
      ...remote.settings,
      contact: { ...defaults.settings.contact, ...remote.settings?.contact },
      media: { ...defaults.settings.media, ...remote.settings?.media },
    },
    translations: remote.translations
      ? {
          es: { ...defaults.translations.es, ...remote.translations.es },
          en: { ...defaults.translations.en, ...remote.translations.en },
        }
      : defaults.translations,
  }
}

/**
 * Serves the site's content. It renders straight away with the bundled
 * content and swaps in the CMS version as soon as it arrives, so a slow or
 * failing Supabase never blanks the page.
 */
export function ContentProvider({ children }) {
  const [remote, setRemote] = useState(null)

  const reload = useCallback(
    () =>
      fetchContent()
        .then(setRemote)
        .catch((error) => console.warn('[cms] using bundled content:', error.message)),
    [],
  )

  useEffect(() => {
    reload()
  }, [reload])

  const value = useMemo(() => ({ ...merge(remote), reload }), [remote, reload])

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}

