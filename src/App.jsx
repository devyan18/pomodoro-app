import { useEffect, useState } from 'react'
import { validatePomodoroDir } from './services/fs.services'
import { useMusic } from './providers/MusicProvider'
import initalTracks from './initialTracks.json'
import MusicPlayer from './components/MusicPlayer'
import Tracks from './components/Tracks'
import Layout from './components/Layout'
import Reloj from './reloj'
import './App.css'

export default function App () {
  const [view, setView] = useState(false)

  const {
    handleChangeTracks
  } = useMusic()

  useEffect(() => {
    validatePomodoroDir()
    handleChangeTracks(initalTracks.tracks)
  }, [])

  return (
    <Layout>
      <div className='sectors'>
        <div className='sector'>
          <button
            onClick={() => setView(!view)}
          >Click
          </button>
          {view && <Reloj />}
        </div>
        <Tracks />
      </div>
      <MusicPlayer />
    </Layout>
  )
}

/*
<ReorderList
  handleChangeTracks={handleChangeTracks}
  handleSelectTrack={handleSelectTrack}
  tracks={initalTracks.tracks}
  track={track}
/>
*/
