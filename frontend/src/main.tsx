import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './app/ThemeProvider.tsx'
import { AuthProvider } from './features/auth/context/AuthProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
    <App />
    </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
