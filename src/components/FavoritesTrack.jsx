import { useEffect, useState } from 'react'
import { useFavorites } from '../providers/FavoritesProvider'
import ReorderList from './ReorderList'

export default function FavoritesTrack () {
  const { favorites, saveFavoritesToDisk } = useFavorites()

  const [filter, setFilter] = useState('')
  const [favoritesWithFilter, setFavoritesWithFilter] = useState(favorites)

  const filterFavorites = () => favorites.filter((track) => {
    if (filter === '') {
      return favorites
    }

    const trackTitle = track.title.toLowerCase()
    const trackArtist = track.artist.toLowerCase()

    return trackTitle.includes(filter.toLowerCase()) || trackArtist.includes(filter.toLowerCase())
  })

  const handleChangeFilter = (e) => {
    setFilter(e.target.value)
  }

  const handleReorder = (newList) => {
    if (favorites === favoritesWithFilter) {
      saveFavoritesToDisk(newList)
    }
  }

  useEffect(() => {
    setFavoritesWithFilter(filterFavorites())
  }, [filter, favorites])

  return (
    <div className='favorite_screen'>
      <h2>Favorites</h2>
      <div className='favorite_filter'>
        <input type='text' placeholder='Filter...' onChange={handleChangeFilter} />
      </div>

      <ReorderList
        items={favoritesWithFilter}
        onReorder={(list) => handleReorder(list)}
      />
    </div>
  )
}
