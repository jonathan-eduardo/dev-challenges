import { createContext, useContext, useState } from 'react'
import styles from './music-player.module.css'
import Background from '../../components/background'
import SongCard from './song-card'

const songs = [
  {
    id: '0428129',
    title: 'Lost in the City Lights',
    author: 'Cosmo Sheldrake',
    cover: '/images/cover-1.png',
    songUrl: '/songs/lost-in-city-lights-145038.mp3',
    durationInSeconds: 72.045688,
  },
  {
    id: '0630743',
    title: 'Forest Lullaby',
    author: 'Lesfm',
    cover: '/images/cover-2.png',
    songUrl: '/songs/forest-lullaby-110624.mp3',
    durationInSeconds: 138.657938,
  },
]

type MusicPlayerContextType = {
  currentSong: number
  skip: () => boolean
  previous: () => boolean
}

const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(
  undefined
)
export const useMusicPlayer = () => {
  const context = useContext(MusicPlayerContext)
  if (!context) {
    throw new Error('It must be used within a MusicPlayerProvided')
  }
  return context
}

export default function MusicPlayer() {
  const [currentSong, setCurrentSong] = useState(0)

  function skip() {
    if (currentSong < songs.length - 1) {
      setCurrentSong(currentSong + 1)
      return true
    }
    return false
  }

  function previous() {
    if (currentSong > 0) {
      setCurrentSong(currentSong - 1)
      return true
    }
    return false
  }

  return (
    <MusicPlayerContext.Provider value={{ currentSong, skip, previous }}>
      <Background customClass={`${styles.musicPlayerBackground}`}>
        <SongCard {...songs[currentSong]} />
      </Background>
    </MusicPlayerContext.Provider>
  )
}
