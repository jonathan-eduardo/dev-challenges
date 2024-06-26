import { useEffect, useState, useRef, MouseEvent } from 'react'
import styles from './song-card.module.css'
import PreviousIcon from '../images/Stop_and_play_fill_reverse.svg'
import PauseIcon from '../images/pause_icon.svg'
import PlayIcon from '../images/Play_fill.svg'
import NextIcon from '../images/Stop_and_play_fill.svg'
import { useMusicPlayer } from './music-player'

type Song = {
  title: string
  author: string
  cover: string
  songUrl: string
  durationInSeconds: number
}

export default function SongCard({
  title,
  author,
  cover,
  songUrl,
  durationInSeconds,
}: Song) {
  const { skip, previous } = useMusicPlayer()
  const [duration, setDuration] = useState('00:00')
  const [progress, setProgress] = useState('00:00')
  const [progressBar, setProgressBar] = useState('0%')
  const [playing, setPlaying] = useState(false)
  const songAudio = useRef<HTMLAudioElement>(null)
  const songTimeout = useRef<number | null>(null)

  useEffect(() => {
    if (songAudio.current) {
      const songDuration = formatTime(durationInSeconds)
      setDuration(songDuration)
    }
  }, [durationInSeconds])

  useEffect(() => {
    return () => {
      if (songTimeout.current) {
        clearTimeout(songTimeout.current)
      }
    }
  }, [])

  function handleButtonClick() {
    if (songAudio.current) {
      const action = songAudio.current.paused ? 'play' : 'pause'
      songAudio.current[action]()
      setPlaying(!playing)
    }
  }

  function handlePlay() {
    setPlaying(true)
  }

  function handlePause() {
    setPlaying(false)
  }

  function formatTime(progress: number | undefined) {
    if (progress) {
      const minutes = Math.floor((progress % 3600) / 60)
      let seconds = Math.round(progress % 60)

      seconds = seconds < 60 ? seconds : 0
      const padTime = (time: number) => String(time).padStart(2, '0')

      return `${padTime(minutes)}:${padTime(seconds)}`
    }
    return '00:00'
  }

  function handleEnd() {
    setPlaying(false)
    handleNextSong()
  }

  function handleUpdate() {
    const currentProgress = formatTime(songAudio.current?.currentTime)
    setProgress(currentProgress)
    handleProgressBar()
  }

  function handleNextSong() {
    if (skip()) {
      resetCurrentSongAndPlay()
    }
  }

  function handlePreviousSong() {
    previous()
    resetCurrentSongAndPlay()
  }

  function handleProgressBar() {
    const currentTime = songAudio.current?.currentTime
    if (currentTime) {
      const progressBarSize = Math.round(
        (currentTime / durationInSeconds) * 100
      )
      setProgressBar(`${progressBarSize}%`)
    }
  }

  function resetCurrentSongAndPlay() {
    if (songTimeout.current) clearTimeout(songTimeout.current)

    songTimeout.current = setTimeout(() => {
      if (songAudio.current) {
        handleProgressBar()
        setProgress('00:00')
        songAudio.current.currentTime = 0
        songAudio.current.play()
      }
    }, 500)
  }

  function handleProgressBarClick(e: MouseEvent) {
    if (songAudio.current) {
      const barSize =
        (e.nativeEvent.offsetX /
          (e.currentTarget as HTMLDivElement).clientWidth) *
        100
      const newAudioTime = (barSize / 100) * durationInSeconds
      songAudio.current.currentTime = newAudioTime
    }
  }

  return (
    <div className={styles.song}>
      <img src={cover} className={styles.songCover} />
      <div className={styles.songInfo}>
        <h1 className={styles.songTitle}>{title}</h1>
        <p className={styles.songAuthor}>{author}</p>
      </div>
      <div className={styles.progress}>
        <div className={styles.progressInfo}>
          <p className={styles.currentProgress}>{progress}</p>
          <p className={styles.progressDuration}>{duration}</p>
        </div>
        <div className={styles.progressBar} onClick={handleProgressBarClick}>
          <div
            className={styles.progressTrack}
            style={{ flexBasis: progressBar }}
          ></div>
        </div>
      </div>
      <div className={styles.songButtons}>
        <button
          className={`${styles.previousBtn} ${styles.btn}`}
          onClick={handlePreviousSong}
        >
          <PreviousIcon />
        </button>
        <button
          onClick={handleButtonClick}
          className={`${styles.playBtn} ${styles.btn}`}
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </button>
        <button
          className={`${styles.nextBtn} ${styles.btn}`}
          onClick={handleNextSong}
        >
          <NextIcon />
        </button>
      </div>
      <audio
        ref={songAudio}
        src={songUrl}
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handleEnd}
        onTimeUpdate={handleUpdate}
      ></audio>
    </div>
  )
}
