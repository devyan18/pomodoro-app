import { useFavorites } from '../providers/FavoritesProvider'
import HeartContained from '../icons/HeartContained'
import Heart from '../icons/Heart'
import HeartBroke from '../icons/HeartBroke'
import { confirm } from '@tauri-apps/api/dialog'
import { useMusic } from '../providers/MusicProvider'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Drag from '../icons/Drag'
import Options from '../icons/Options'
import { useState } from 'react'

const segToMin = (seg) => {
  const minutes = Math.floor(seg / 60)
  const seconds = seg % 60

  if (seconds < 10) return `${minutes}:0${seconds}`
  return `${minutes}:${seconds}`
}

export default function TrackItemSortable ({
  track,
  isFavorite,
  togglerFavorites = false,
  rounded = false
}) {
  const { handleSetTrackAndPlay } = useMusic()
  const { toggleFavorite } = useFavorites()
  const { track: currentTrack, playing } = useMusic()
  const [viewContextMenu, setViewContextMenu] = useState(false)
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: track.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  const onUnfavorite = (track) => {
    confirm(
      `Are you sure you want to remove to favorite "${track.title}"?`
    ).then((res) => {
      if (res) {
        toggleFavorite(track)
      }
    })
  }

  const handleToggleViewContextMenu = () => {
    setViewContextMenu((prev) => !prev)
  }

  return (
    <div
      className={`track_result_item ${
        currentTrack.id === track.id ? 'current_track' : ''
      } ${rounded ? 'rounded' : ''}`}
      ref={setNodeRef}
      {...attributes}
      style={style}
    >
      <div className='track_result_item_info' data-no-dnd='true'>
        <div className='btn_favorite' {...listeners}>
          <Drag width='35px' height='35px' />
        </div>
        <picture
          onClick={() => {
            handleSetTrackAndPlay(track)
          }}
          loading='lazy'
          data-no-dnd='true'
          className={`track_result_item_banner ${
            currentTrack.id === track.id && playing ? 'rotate' : ''
          }`}
          style={{
            backgroundImage: `url(${track.banner})`
          }}
        >
          <span className='track_result_banner_action'>
            {/* <h1>dentro del banner</h1> */}
          </span>
        </picture>
        <div className='track_result_item_text'>
          <div className='track_result_item_title'>{track.title}</div>
          <div className='row'>
            <div className='track_result_item_artist'>{track.artist}</div>
            <div className='track_result_item_duration'>
              {segToMin(track.duration)} min
            </div>
          </div>
        </div>
      </div>
      <div className='track_result_item_actions' data-no-dnd='true'>
        <div className='btn_favorite' onClick={handleToggleViewContextMenu}>
          <Options width='35px' height='35px' />
          {viewContextMenu && (
            <div className='context_menu'>
              <div className='context_menu_item'>
                <span>Remove from playlist</span>
              </div>
            </div>
          )}
        </div>
        {togglerFavorites
          ? (
            <div
              className='btn_favorite'
              onClick={() => {
                toggleFavorite(track)
              }}
            >
              {isFavorite
                ? (
                  <HeartContained width='35px' height='35px' />
                  )
                : (
                  <Heart width='35px' height='35px' />
                  )}
            </div>
            )
          : (
            <div
              className='btn_favorite'
              data-no-dnd='true'
              onClick={() => {
                onUnfavorite(track)
              }}
            >
              <HeartBroke width='35px' height='35px' />
            </div>
            )}
      </div>
    </div>
  )
}
