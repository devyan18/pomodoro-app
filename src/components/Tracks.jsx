import { useState } from 'react'
import FavoritesTrack from './FavoritesTrack'
import SearchTrack from './SearchTrack'

function Tab ({ active, title, onClick }) {
  return (
    <div className={`tab ${active ? 'active_tab' : ''}`} onClick={onClick}>
      <p>{title}</p>
    </div>
  )
}

export default function Tracks () {
  const [tab, setTab] = useState('favorites')

  const handleClickTab = (tab) => {
    setTab(tab)
  }

  return (
    <div className='sector tracks'>
      {tab === 'search' && <SearchTrack />}
      {tab === 'favorites' && <FavoritesTrack />}
      {tab === 'playlist' && <p>playlist section</p>}
      <div className='tabs'>
        <Tab
          title='Favorites'
          active={tab === 'favorites'}
          onClick={() => handleClickTab('favorites')}
        />
        <Tab
          title='Playlist'
          active={tab === 'playlist'}
          onClick={() => handleClickTab('playlist')}
        />
        <Tab
          title='Search'
          active={tab === 'search'}
          onClick={() => handleClickTab('search')}
        />
      </div>
    </div>
  )
}
