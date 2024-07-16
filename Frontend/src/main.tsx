import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { HelmetProvider } from 'react-helmet-async'
import ThemeProvider from './theme/theme.tsx'
import { AuthProvider } from './components/AuthContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <HelmetProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </HelmetProvider>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>,
)
