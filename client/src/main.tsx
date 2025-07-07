import '@/styles/globals.css';

import App from './App'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './contexts/ThemeContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
     <App />
    </ThemeProvider>
  </StrictMode>,
)
