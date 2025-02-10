"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, SkipBack, SkipForward } from "lucide-react"
import styles from "./MusicPlayer.module.css"

const tracks = [
  {
    name: "7 Words",
    artist: "Deftones",
    album: "Adrenaline",
    url: "https://kitkats-githunny.github.io/mynotionstuff/Deftones%20-%207%20Words.mp3",
    artwork: "https://kitkats-githunny.github.io/mynotionstuff/pinkcatdeftones.jpg",
  },
  {
    name: "976-EVIL",
    artist: "Deftones",
    album: "Diamond Eyes",
    url: "https://kitkats-githunny.github.io/mynotionstuff/Deftones%20-%20976-EVIL.mp3",
    artwork: "https://kitkats-githunny.github.io/mynotionstuff/bluegirldeftones.jpg",
  },
  {
    name: "Around the Fur",
    artist: "Deftones",
    album: "Around the Fur",
    url: "https://kitkats-githunny.github.io/mynotionstuff/Deftones%20-%20Around%20the%20Fur.mp3",
    artwork: "https://kitkats-githunny.github.io/mynotionstuff/pinkcatdeftones.jpg",
  },
  {
    name: "Beauty School",
    artist: "Deftones",
    album: "Diamond Eyes",
    url: "https://kitkats-githunny.github.io/mynotionstuff/Deftones%20-%20Beauty%20School.mp3",
    artwork: "https://kitkats-githunny.github.io/mynotionstuff/bluegirldeftones.jpg",
  },
  {
    name: "Be Quiet and Drive (Far Away)",
    artist: "Deftones",
    album: "Around the Fur",
    url: "https://kitkats-githunny.github.io/mynotionstuff/Deftones%20-%20Be%20Quiet%20and%20Drive%20(Far%20Away).mp3",
    artwork: "https://kitkats-githunny.github.io/mynotionstuff/pinkcatdeftones.jpg",
  },
  {
    name: "Beware",
    artist: "Deftones",
    album: "Saturday Night Wrist",
    url: "https://kitkats-githunny.github.io/mynotionstuff/Deftones%20-%20Beware.mp3",
    artwork: "https://kitkats-githunny.github.io/mynotionstuff/pinkdiamondeyesdeftones.jpg",
  },
  {
    name: "Change (In the House of Flies)",
    artist: "Deftones",
    album: "White Pony",
    url: "https://kitkats-githunny.github.io/mynotionstuff/Deftones%20-%20Change%20(In%20the%20House%20of%20Flies).mp3",
    artwork: "https://kitkats-githunny.github.io/mynotionstuff/pinkdiamondeyesdeftones.jpg",
  },
  {
    name: "Cherry Waves",
    artist: "Deftones",
    album: "Saturday Night Wrist",
    url: "https://kitkats-githunny.github.io/mynotionstuff/Deftones%20-%20Cherry%20Waves.mp3",
    artwork: "https://kitkats-githunny.github.io/mynotionstuff/pinkdiamondeyesdeftones.jpg",
  },
  {
    name: "Diamond Eyes",
    artist: "Deftones",
    album: "Diamond Eyes",
    url: "https://kitkats-githunny.github.io/mynotionstuff/Deftones%20-%20Diamond%20Eyes.mp3",
    artwork: "https://kitkats-githunny.github.io/mynotionstuff/bluegirldeftones.jpg",
  },
  {
    name: "Digital Bath",
    artist: "Deftones",
    album: "White Pony",
    url: "https://kitkats-githunny.github.io/mynotionstuff/Deftones%20-%20Digital%20Bath.mp3",
    artwork: "https://kitkats-githunny.github.io/mynotionstuff/pinkdiamondeyesdeftones.jpg",
  },
  {
    name: "Engine No. 9",
    artist: "Deftones",
    album: "Adrenaline",
    url: "https://kitkats-githunny.github.io/mynotionstuff/Deftones%20-%20Engine%20No.%209.mp3",
    artwork: "https://kitkats-githunny.github.io/mynotionstuff/pinkcatdeftones.jpg",
  },
  {
    name: "Entombed",
    artist: "Deftones",
    album: "Koi No Yokan",
    url: "https://kitkats-githunny.github.io/mynotionstuff/Deftones%20-%20Entombed.mp3",
    artwork: "https://kitkats-githunny.github.io/mynotionstuff/bluegirldeftones.jpg",
  },
  {
    name: "Feiticeira",
    artist: "Deftones",
    album: "White Pony",
    url: "https://kitkats-githunny.github.io/mynotionstuff/Deftones%20-%20Feiticeira.mp3",
    artwork: "https://kitkats-githunny.github.io/mynotionstuff/pinkdiamondeyesdeftones.jpg",
  },
]

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isBuffering, setIsBuffering] = useState(true)
  const audioRef = useRef<HTMLAudioElement>(null)
  const bufferCheckInterval = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current
      audio.addEventListener("loadedmetadata", handleLoadedMetadata)
      audio.addEventListener("canplay", handleCanPlay)
      audio.addEventListener("waiting", handleWaiting)

      return () => {
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
        audio.removeEventListener("canplay", handleCanPlay)
        audio.removeEventListener("waiting", handleWaiting)
        if (bufferCheckInterval.current) {
          clearInterval(bufferCheckInterval.current)
        }
      }
    }
  }, [audioRef])

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying && !isBuffering) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying, isBuffering])

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleCanPlay = () => {
    setIsBuffering(false)
  }

  const handleWaiting = () => {
    setIsBuffering(true)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const playNextTrack = () => {
    setCurrentTrack((prevTrack) => (prevTrack + 1) % tracks.length)
    setIsBuffering(true)
  }

  const playPreviousTrack = () => {
    setCurrentTrack((prevTrack) => (prevTrack - 1 + tracks.length) % tracks.length)
    setIsBuffering(true)
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value)
    setCurrentTime(time)
    if (audioRef.current) {
      audioRef.current.currentTime = time
    }
  }

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const calculateProgress = () => {
    if (duration === 0 || isNaN(duration) || isNaN(currentTime)) return 0
    return (currentTime / duration) * 100
  }

  const progress = calculateProgress()
  const progressStyle = {
    background: `conic-gradient(#FFC0CB ${progress * 3.6}deg, #FFE5E5 ${progress * 3.6}deg)`,
  }

  return (
    <div className={styles.playerContainer}>
      <div className={styles.progressCircle} style={progressStyle}>
        <div className={styles.innerCircle}>
          <img
            src={tracks[currentTrack].artwork || "/placeholder.svg"}
            alt={tracks[currentTrack].album}
            className={`${styles.artwork} ${isPlaying && !isBuffering ? styles.rotating : ""}`}
          />
          {isBuffering && <div className={styles.bufferingOverlay}>Buffering...</div>}
        </div>
      </div>
      <div className={styles.info}>
        <h1>{tracks[currentTrack].name}</h1>
        <h2>{tracks[currentTrack].album}</h2>
      </div>
      <div className={styles.timeControl}>
        <span>{formatTime(currentTime)}</span>
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className={styles.slider}
          disabled={isBuffering}
        />
        <span>{formatTime(duration)}</span>
      </div>
      <div className={styles.controls}>
        <button className={styles.controlButton} onClick={playPreviousTrack}>
          <SkipBack className={styles.icon} />
        </button>
        <button className={styles.playButton} onClick={togglePlayPause} disabled={isBuffering}>
          {isPlaying && !isBuffering ? <Pause className={styles.playIcon} /> : <Play className={styles.playIcon} />}
        </button>
        <button className={styles.controlButton} onClick={playNextTrack}>
          <SkipForward className={styles.icon} />
        </button>
      </div>
      <audio ref={audioRef} src={tracks[currentTrack].url} onTimeUpdate={handleTimeUpdate} onEnded={playNextTrack} />
    </div>
  )
}

