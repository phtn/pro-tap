import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import * as Tone from 'tone'

export type Note = 'C4' | 'D4' | 'E4' | 'F4' | 'G4' | 'A4' | 'B4' | 'C5'

// Types
interface ToneContextType {
  isStarted: boolean
  isPlaying: boolean
  volume: number
  startAudio: () => Promise<void>
  stopAudio: () => void
  togglePlay: () => void
  setVolume: (value: number) => void
  playNote: (note: string, duration: string) => void
}

interface ToneProviderProps {
  children: ReactNode
}

// Create Context
const ToneContext = createContext<ToneContextType | undefined>(undefined)

// Provider Component
export const ToneProvider: React.FC<ToneProviderProps> = ({children}) => {
  const [isStarted, setIsStarted] = useState<boolean>(false)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [volume, setVolumeState] = useState<number>(-12)
  const [synth, setSynth] = useState<Tone.PolySynth | null>(null)
  const [loop, setLoop] = useState<Tone.Loop | null>(null)

  // Initialize synth
  useEffect(() => {
    const newSynth = new Tone.PolySynth(Tone.Synth, {
      oscillator: {type: 'sine'},
      envelope: {
        attack: 0.05,
        decay: 0.1,
        sustain: 0.3,
        release: 1,
      },
    }).toDestination()

    newSynth.volume.value = volume
    setSynth(newSynth)

    // Cleanup
    return () => {
      newSynth.dispose()
    }
  }, [])

  // Update volume when changed
  useEffect(() => {
    if (synth) {
      synth.volume.value = volume
    }
  }, [volume, synth])

  const startAudio = useCallback(async (): Promise<void> => {
    try {
      await Tone.start()
      setIsStarted(true)
      console.log('Audio context started')
    } catch (error) {
      console.error('Failed to start audio context:', error)
    }
  }, [])

  const stopAudio = useCallback((): void => {
    if (loop) {
      loop.stop()
      loop.dispose()
      setLoop(null)
    }
    Tone.getTransport().stop()
    setIsPlaying(false)
  }, [loop])

  const togglePlay = useCallback((): void => {
    if (!synth) return

    if (isPlaying) {
      stopAudio()
    } else {
      // Create a simple melody loop
      const notes: string[] = ['C4', 'E4', 'G4', 'B4']
      let index = 0

      const newLoop = new Tone.Loop((time: number) => {
        synth.triggerAttackRelease(notes[index % notes.length], '8n', time)
        index++
      }, '4n')

      newLoop.start(0)
      Tone.getTransport().start()
      setLoop(newLoop)
      setIsPlaying(true)
    }
  }, [isPlaying, synth, stopAudio])

  const playNote = useCallback(
    (note: string, duration: string): void => {
      if (!synth || !isStarted) return
      synth.triggerAttackRelease(note, duration)
    },
    [synth, isStarted],
  )

  const setVolume = useCallback((value: number): void => {
    setVolumeState(value)
  }, [])

  const value: ToneContextType = {
    isStarted,
    isPlaying,
    volume,
    startAudio,
    stopAudio,
    togglePlay,
    setVolume,
    playNote,
  }

  return <ToneContext.Provider value={value}>{children}</ToneContext.Provider>
}

export const useTone = (): ToneContextType => {
  const context = useContext(ToneContext)
  if (context === undefined) {
    throw new Error('useTone must be used within a ToneProvider')
  }
  return context
}
