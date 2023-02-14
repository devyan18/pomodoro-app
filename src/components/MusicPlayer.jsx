import ChevronRightIcon from '../icons/ChevronRight'
import ReactPlayer from 'react-player'
import StopIcon from '../icons/Stop'
import PlayIcon from '../icons/Play'
import { useMusic } from '../providers/MusicProvider'

export default function MusicPlayer () {
  const {
    track,
    playing,
    handleEnded,
    volumen,
    handleProgress,
    togglePlaying,
    setDuration,
    progress,
    handleNextTrack
  } = useMusic()

  return (
    <div className='music_player_container'>
      <div className='music_player'>
        <img
          src={track.image || track.banner}
          alt={track.title}
          className={`track_image ${playing ? 'rotate' : ''}`}
        />
        <p className='music_title'>{track.title}</p>
        <ReactPlayer
          url={track.url}
          playing={playing}
          onEnded={handleEnded}
          controls
          onDuration={setDuration}
          style={{ display: 'none' }}
          volume={volumen}
          onProgress={handleProgress}
          config={{
            youtube: {
              listType: 'playlist',
              loop: true,
              autoplay: true,
              embedOptions: {
                playsinline: 0
              }
            }
          }}
        />
        <div className='controls'>
          <button onClick={togglePlaying} className='player_control_button'>
            {playing
              ? (
                <StopIcon width='30px' height='30px' />
                )
              : (
                <PlayIcon width='30px' height='30px' />
                )}
          </button>
          <button
            onClick={handleNextTrack}
            className='player_control_button_sm'
          >
            <ChevronRightIcon width='30px' height='30px' />
          </button>
        </div>
      </div>
      <div className='progress_bar'>
        <div className='progress_bar_left' style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}
