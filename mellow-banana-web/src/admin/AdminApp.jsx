import { useEffect, useState } from 'react'
import { Link, NavLink, Navigate, Route, Routes } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Button, TextInput } from './ui'
import { importDefaults, isEmpty } from './db'
import { useContent } from '../content/useContent'
import ProjectsPage from './pages/Projects'
import ProjectEditor from './pages/ProjectEditor'
import TextsPage from './pages/Texts'
import SettingsPage from './pages/Settings'
import { ClientsPage, IndustriesPage, PillarsPage, ServicesPage } from './pages/Collections'

const SECTIONS = [
  { to: 'projects', label: 'Proyectos' },
  { to: 'services', label: 'Servicios' },
  { to: 'pillars', label: 'Cómo lo hacemos' },
  { to: 'clients', label: 'Clientes' },
  { to: 'industries', label: 'Sectores' },
  { to: 'texts', label: 'Textos del sitio' },
  { to: 'settings', label: 'Ajustes generales' },
]

function Shell({ children }) {
  return (
    <div className="min-h-svh bg-neutral-50 font-normal text-neutral-900 antialiased">{children}</div>
  )
}

function Centered({ children }) {
  return (
    <Shell>
      <div className="grid min-h-svh place-items-center p-6">
        <div className="w-full max-w-sm rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
          <p className="mb-6 text-sm font-semibold tracking-wide text-neutral-500 uppercase">
            Mellow &amp; Banana · Admin
          </p>
          {children}
        </div>
      </div>
    </Shell>
  )
}

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError('Correo o contraseña incorrectos.')
    setBusy(false)
  }

  return (
    <Centered>
      <form onSubmit={submit} className="space-y-4">
        <TextInput label="Correo" type="email" autoComplete="email" value={email} onChange={setEmail} required />
        <TextInput
          label="Contraseña"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={setPassword}
          required
        />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <Button type="submit" className="w-full" disabled={busy}>
          {busy ? 'Entrando…' : 'Entrar'}
        </Button>
      </form>
    </Centered>
  )
}

/** Offered once, on an empty database: copies the current site into it. */
function FirstRun({ onDone }) {
  const { reload } = useContent()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)

  const run = async () => {
    setBusy(true)
    setError(null)
    try {
      await importDefaults()
      reload()
      onDone()
    } catch (e) {
      setError(e.message)
      setBusy(false)
    }
  }

  return (
    <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-5">
      <h2 className="font-semibold text-amber-900">La base de datos está vacía</h2>
      <p className="mt-1 text-sm text-amber-800">
        Importa el contenido que tiene el sitio hoy (proyectos, textos, servicios, clientes…) para
        empezar a editar desde ahí.
      </p>
      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
      <Button className="mt-4" onClick={run} disabled={busy}>
        {busy ? 'Importando…' : 'Importar contenido actual'}
      </Button>
    </div>
  )
}

function Layout({ session }) {
  const [empty, setEmpty] = useState(false)

  useEffect(() => {
    isEmpty().then(setEmpty).catch(() => {})
  }, [])

  return (
    <Shell>
      <div className="md:flex">
        <aside className="border-b border-neutral-200 bg-white md:sticky md:top-0 md:h-svh md:w-60 md:shrink-0 md:border-r md:border-b-0">
          <div className="flex h-full flex-col p-4">
            <p className="px-2 text-sm font-semibold">Mellow &amp; Banana</p>
            <p className="px-2 text-xs text-neutral-500">Administrador</p>
            <nav className="mt-6 flex gap-1 overflow-x-auto md:flex-col md:overflow-visible">
              {SECTIONS.map((s) => (
                <NavLink
                  key={s.to}
                  // Absolute: in React Router 7 a relative link inside a splat route
                  // resolves against the current URL, so sections would nest forever.
                  to={`/admin/${s.to}`}
                  className={({ isActive }) =>
                    `rounded-md px-2 py-1.5 text-sm whitespace-nowrap ${
                      isActive ? 'bg-neutral-900 text-white' : 'text-neutral-700 hover:bg-neutral-100'
                    }`
                  }
                >
                  {s.label}
                </NavLink>
              ))}
            </nav>
            <div className="mt-6 space-y-2 border-t border-neutral-200 px-2 pt-4 text-sm md:mt-auto">
              <Link to="/" target="_blank" className="block text-neutral-700 hover:underline">
                Ver sitio ↗
              </Link>
              <p className="truncate text-xs text-neutral-500">{session.user.email}</p>
              <button
                type="button"
                onClick={() => supabase.auth.signOut()}
                className="text-neutral-700 hover:underline"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1 px-4 pb-16 md:px-8">
          <div className="pt-6">{empty ? <FirstRun onDone={() => setEmpty(false)} /> : null}</div>
          {/* Remount on import so every screen reloads what was just written. */}
          <Routes key={empty ? 'empty' : 'ready'}>
            <Route index element={<Navigate to="/admin/projects" replace />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="projects/:slug" element={<ProjectEditor />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="pillars" element={<PillarsPage />} />
            <Route path="clients" element={<ClientsPage />} />
            <Route path="industries" element={<IndustriesPage />} />
            <Route path="texts" element={<TextsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/admin/projects" replace />} />
          </Routes>
        </main>
      </div>
    </Shell>
  )
}

/**
 * /admin — sign in with a Supabase user that is listed in `public.admins`.
 * Everything else is enforced by row-level security on the database.
 */
export default function AdminApp() {
  const [session, setSession] = useState(undefined)
  const [isAdmin, setIsAdmin] = useState(null)

  useEffect(() => {
    if (!supabase) return
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data } = supabase.auth.onAuthStateChange((_event, s) => setSession(s))
    return () => data.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!session) return
    supabase
      .from('admins')
      .select('user_id')
      .eq('user_id', session.user.id)
      .maybeSingle()
      .then(({ data }) => setIsAdmin(!!data))
  }, [session])

  useEffect(() => {
    document.title = 'Admin · Mellow & Banana'
  }, [])

  if (!supabase) {
    return (
      <Centered>
        <p className="text-sm text-neutral-700">
          Falta configurar Supabase: define <code>VITE_SUPABASE_URL</code> y{' '}
          <code>VITE_SUPABASE_PUBLISHABLE_KEY</code> en las variables de entorno y vuelve a publicar.
        </p>
      </Centered>
    )
  }

  if (session === undefined) return <Centered><p className="text-sm text-neutral-500">Cargando…</p></Centered>
  if (!session) return <Login />
  if (isAdmin === null) return <Centered><p className="text-sm text-neutral-500">Verificando acceso…</p></Centered>

  if (!isAdmin) {
    return (
      <Centered>
        <p className="text-sm text-neutral-700">
          La cuenta <strong>{session.user.email}</strong> no tiene permisos de administrador.
        </p>
        <Button variant="secondary" className="mt-4" onClick={() => supabase.auth.signOut()}>
          Cerrar sesión
        </Button>
      </Centered>
    )
  }

  return <Layout session={session} />
}
