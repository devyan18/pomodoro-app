import { useEffect, useState, useRef } from 'react'
import { useMusic } from './providers/MusicProvider'

export default function Reloj () {
  const [timer, setTimer] = useState(0)
  const intervalRef = useRef()
  const { handlePlay, handleStop } = useMusic()
  const [timing, setTiming] = useState(10)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimer((timer) => timer + 1)
    }, 1000)

    return () => {
      clearInterval(intervalRef.current)
    }
  }, [])

  useEffect(() => {
    if (timer >= timing) {
      if (timing === 50) {
        setTiming(10)
        handleStop()
      } else {
        setTiming(50)
        handlePlay()
      }
      setTimer(0)
    }
  }, [timer])

  return (
    <div>
      <h1>Reloj</h1>
      <h2>{timer}</h2>
    </div>
  )
}
