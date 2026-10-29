import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { LanguageProvider } from './i18n/LanguageProvider'
import { ContentProvider } from './content/ContentProvider'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ContentProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </ContentProvider>
    </BrowserRouter>
  </StrictMode>,
)
