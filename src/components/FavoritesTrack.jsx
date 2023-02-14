import { useFavorites } from '../providers/FavoritesProvider'
import { useMusic } from '../providers/MusicProvider'
import TrackItem from './TrackItem'

export default function FavoritesTrack () {
  const { favorites, saveFavoritesToDisk } = useFavorites()
  const { handleSetTrackAndPlay } = useMusic()

  return (
    <div className='favorite_screen'>
      <button
        onClick={() => saveFavoritesToDisk(favorites)}
      >save favorites
      </button>
      <ul className='favorite_list'>
        {
          favorites.map((track) => (
            <TrackItem isFavorite track={track} key={track.id} onPlay={() => handleSetTrackAndPlay(track)} />
          ))
        }
      </ul>
    </div>
  )
}
