import { useState, useCallback, useEffect } from 'react'

export default function useMusicPlayer () {
  const [listOfTracks, setListOfTracks] = useState([])
  const [playing, setPlaying] = useState(false)
  const [volumen, setVolumen] = useState(1)
  const [track, setTrack] = useState('')
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  const handlePlay = () => {
    setPlaying(true)
  }

  const handleStop = () => {
    setPlaying(false)
  }

  const handleSetTrackAndPlay = useCallback((track) => {
    setListOfTracks([track])
    setTrack(track)
    setPlaying(true)
  }, [])

  const getNextElementOfArray = useCallback((index, array) => {
    if (index === array.length - 1) {
      return array[0]
    }
    return array[index + 1]
  }, [])

  const handleChangeTracks = useCallback((newListOfTraks) => {
    setListOfTracks(newListOfTraks)
  }, [])

  const togglePlaying = () => {
    setPlaying(!playing)
  }

  const handleSelectTrack = (track) => {
    setTrack(track)
    setPlaying(true)
  }

  const handleChangeVolumen = (e) => {
    setVolumen(e.target.value / 100)
  }

  const handleNextTrack = () => {
    const nextTrack = getNextElementOfArray(listOfTracks.indexOf(track), listOfTracks)
    setTrack(nextTrack)
    setPlaying(true)
  }

  const handleEnded = () => {
    if (listOfTracks.length === 1) {
      setPlaying(false)
      return
    }

    handleNextTrack()
  }

  const handleProgress = (state) => {
    if (duration) {
      const calcProgress = (state.playedSeconds / duration) * 100
      setProgress(calcProgress)
    }
  }

  useEffect(() => {
    if (listOfTracks.length > 0) {
      setTrack(listOfTracks[0])
    }
  }, [listOfTracks])

  return {
    handleChangeTracks,
    togglePlaying,
    handleSelectTrack,
    handleChangeVolumen,
    handleEnded,
    handleNextTrack,
    handleProgress,
    setDuration,
    handleStop,
    handlePlay,
    handleSetTrackAndPlay,
    progress,
    volumen,
    track,
    playing,
    duration
  }
}
