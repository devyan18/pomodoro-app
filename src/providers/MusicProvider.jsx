import { createContext, useContext } from 'react'
import useMusicPlayer from '../hooks/useMusicPlayer'

const MusicContext = createContext()

export function MusicProvider ({ children }) {
  const data = useMusicPlayer()

  return (
    <MusicContext.Provider value={data}>
      {children}
    </MusicContext.Provider>

  )
}

export const useMusic = () => useContext(MusicContext)
