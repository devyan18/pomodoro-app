import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback
} from 'react'
import { getFavorites, saveFavorites } from '../services/fs.services'
import debounce from 'just-debounce-it'
const FavoritesContext = createContext()

export function FavoritesProvider ({ children }) {
  const [favorites, setFavorites] = useState([])

  const toggleFavorite = useCallback(
    (track) => {
      const isFavorite = favorites.some((item) => item.id === track.id)
      if (isFavorite) {
        const newFavorites = favorites.filter((item) => item.id !== track.id)

        saveFavoritesToDisk(newFavorites)
        return setFavorites(newFavorites)
      } else {
        const newFavorites = [...favorites, track]

        saveFavoritesToDisk(newFavorites)

        return setFavorites(newFavorites)
      }
    },
    [favorites]
  )

  const saveFavoritesToDisk = useCallback(
    debounce((favorites) => saveFavorites(favorites), 500)
    , [])

  useEffect(() => {
    getFavorites().then((favorites) => setFavorites(favorites))
  }, [])

  return (
    <FavoritesContext.Provider
      value={{ favorites, setFavorites, toggleFavorite, saveFavoritesToDisk }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => useContext(FavoritesContext)
