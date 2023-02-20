import ChevronRightIcon from '../icons/ChevronRight'
import ReactPlayer from 'react-player'
import StopIcon from '../icons/Stop'
import PlayIcon from '../icons/Play'
import { useMusic } from '../providers/MusicProvider'

const segToMin = (seg) => {
  const minutes = Math.floor(seg / 60)
  const seconds = Math.floor(seg % 60)
  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
}

const porcentajeToSeg = (porcentaje, duration) => {
  console.log(porcentaje, duration)
  return (porcentaje * duration) / 100
}

export default function MusicPlayer () {
  const {
    track,
    playing,
    duration,
    handleEnded,
    volumen,
    handleProgress,
    togglePlaying,
    setDuration,
    progress,
    handleNextTrack,
    handleChangeVolumen
  } = useMusic()

  return (
    <div className='music_player_container'>
      <div className='progress_bar'>
        <div className='progress_bar_left' style={{ width: `${progress}%` }} />
      </div>
      <div className='music_player'>
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
          <span className='timmer_current_track'>{segToMin(porcentajeToSeg(progress, duration))} / {segToMin(duration)}</span>
        </div>
        <div className='current_playing_track'>
          <img
            src={track.image || track.banner}
            alt={track.title}
            className={`track_image ${playing ? 'rotate' : ''}`}
          />
          <p className='music_title'>
            <b>{track.title}</b><br />
            <span className='music_title_artist'>{track.artist}</span>
          </p>
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
        </div>
        <div className='controls'>
          <div className='volumen_control'>
            <span className='current_volume'>{Math.round(volumen * 100)}%</span>

            <input
              className='volumen_input_control'
              value={volumen * 100}
              type='range'
              onChange={handleChangeVolumen}
              max='100'
              min='0'
            />
          </div>
        </div>
      </div>

    </div>
  )
}
