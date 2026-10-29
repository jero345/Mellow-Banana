import { createContext, useContext, useMemo } from 'react'
import { defaults } from './defaults'

export const ContentContext = createContext(defaults)

export const useContent = () => useContext(ContentContext)

/** Published projects only, in CMS order. */
export function useProjects() {
  const { projects } = useContent()
  return useMemo(() => projects.filter((p) => p.published !== false), [projects])
}
