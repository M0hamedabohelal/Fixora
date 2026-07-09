import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'leaflet/dist/leaflet.css';
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <main className="min-h-screen relative overflow-x-hidden text-slate-800">
      <App />
    </main>
  </StrictMode>,
)
