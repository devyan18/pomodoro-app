import { useEffect, useState } from 'react'
import { useFavorites } from '../providers/FavoritesProvider'
import ReorderList from './ReorderList'
import TrackItem from './TrackItem'

export default function FavoritesTrack () {
  const { favorites, setFavorites } = useFavorites()

  const [filter, setFilter] = useState('')
  const [favoritesWithFilter, setFavoritesWithFilter] = useState(favorites)

  const filterFavorites = () =>
    favorites.filter((track) => {
      if (filter === '') {
        return favorites
      }

      const trackTitle = track.title.toLowerCase()
      const trackArtist = track.artist.toLowerCase()

      return (
        trackTitle.includes(filter.toLowerCase()) ||
        trackArtist.includes(filter.toLowerCase())
      )
    })

  const handleChangeFilter = (e) => {
    setFilter(e.target.value)
  }

  useEffect(() => {
    setFavoritesWithFilter(filterFavorites())
  }, [filter, favorites])

  return (
    <div className='favorite_screen'>
      <h2>Favorites</h2>
      <div className='favorite_filter'>
        <input
          type='text'
          placeholder='Filter...'
          onChange={handleChangeFilter}
        />
      </div>

      {favorites.length > 1
        ? favoritesWithFilter.length !== favorites.length
          ? (
            <ul className='favorite_list'>
              {favoritesWithFilter.map((track) => (
                <TrackItem
                  key={track.id}
                  item={track}
                  track={track}
                  isFavorite
                  rounded
                />
              ))}
            </ul>
            )
          : (
            <ReorderList
              initialItems={favorites}
              handleSorter={setFavorites}
            />
            )
        : (
          <ul className='favorite_list'>
            {favoritesWithFilter.map((track) => (
              <TrackItem
                key={track.id}
                item={track}
                track={track}
                isFavorite
                rounded
              />
            ))}
          </ul>
          )}
    </div>
  )
}
