import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
    </BrowserRouter>
  </StrictMode>,
)
