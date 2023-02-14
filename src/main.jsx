import { FavoritesProvider } from './providers/FavoritesProvider'
import { MusicProvider } from './providers/MusicProvider'
import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './App'
import './style.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MusicProvider>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </MusicProvider>
  </React.StrictMode>
)
