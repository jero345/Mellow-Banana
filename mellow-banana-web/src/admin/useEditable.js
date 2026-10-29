import { useCallback, useEffect, useRef, useState } from 'react'
import { useContent } from '../content/useContent'

/**
 * Load → edit locally → save, for one admin screen. After a successful save
 * the public content is reloaded, so the site in this tab reflects it at once.
 */
export function useEditable(load, save) {
  const { reload } = useContent()
  const [data, setData] = useState(null)
  const [loadError, setLoadError] = useState(null)
  const [dirty, setDirty] = useState(false)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState(null)
  const timer = useRef(null)

  useEffect(() => {
    let live = true
    load()
      .then((d) => live && setData(d))
      .catch((e) => live && setLoadError(e.message))
    return () => {
      live = false
    }
    // `load` is a module-level function; it never changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Warn before leaving with unsaved edits.
  useEffect(() => {
    if (!dirty) return
    const onLeave = (e) => e.preventDefault()
    window.addEventListener('beforeunload', onLeave)
    return () => window.removeEventListener('beforeunload', onLeave)
  }, [dirty])

  useEffect(() => () => clearTimeout(timer.current), [])

  const update = useCallback((next) => {
    setData((prev) => (typeof next === 'function' ? next(prev) : next))
    setDirty(true)
    setStatus(null)
  }, [])

  const commit = useCallback(async () => {
    setSaving(true)
    setStatus(null)
    try {
      await save(data)
      setDirty(false)
      setStatus({ text: 'Guardado' })
      reload()
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setStatus(null), 3000)
    } catch (e) {
      setStatus({ error: true, text: `No se pudo guardar: ${e.message}` })
    } finally {
      setSaving(false)
    }
  }, [data, save, reload])

  return { data, update, dirty, saving, status, save: commit, loadError }
}
