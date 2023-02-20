import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback
} from 'react'
import { getFavorites, saveFavorites } from '../services/fs.services'

const FavoritesContext = createContext()

export function FavoritesProvider ({ children }) {
  const [favorites, setFavorites] = useState([])

  const toggleFavorite = useCallback((track) => {
    const isFavorite = favorites.some((item) => item.id === track.id)

    if (isFavorite) {
      const newFavorites = favorites.filter((item) => item.id !== track.id)

      saveFavorites(newFavorites)
      setFavorites(newFavorites)
    } else {
      const newFavorites = [track, ...favorites]

      saveFavorites(newFavorites)
      setFavorites(newFavorites)
    }
  }, [favorites])

  const saveFavoritesToDisk = async () => {
    await saveFavorites(favorites)
  }

  const getFavoritesFromDisk = async () => {
    const favorites = await getFavorites()

    setFavorites(favorites)
  }

  useEffect(() => {
    getFavoritesFromDisk()
  }, [])

  useEffect(() => {
    if (!favorites.length) return

    saveFavoritesToDisk()
  }, [favorites])

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        setFavorites,
        toggleFavorite,
        saveFavoritesToDisk,
        getFavoritesFromDisk
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => useContext(FavoritesContext)
