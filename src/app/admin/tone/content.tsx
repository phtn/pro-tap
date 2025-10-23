'use client'

import {useTone} from '@/ctx/tone'

export const ToneConfig = () => {
  const {
    isStarted,
    isPlaying,
    volume,
    startAudio,
    togglePlay,
    setVolume,
    playNote,
  } = useTone()

  const notes: string[] = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5']

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-8'>
      <div className='bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 max-w-2xl w-full border border-white/20'>
        <h1 className='text-4xl font-bold text-white mb-2 text-center'>
          Tone.js Context Demo
        </h1>
        <p className='text-blue-200 text-center mb-8'>
          React Context API with TypeScript
        </p>

        {!isStarted ? (
          <div className='text-center'>
            <button
              onClick={startAudio}
              className='bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transform transition hover:scale-105'>
              Start Audio Context
            </button>
            <p className='text-blue-200 mt-4 text-sm'>
              Click to initialize audio (required by browsers)
            </p>
          </div>
        ) : (
          <div className='space-y-6'>
            {/* Transport Controls */}
            <div className='bg-white/5 rounded-xl p-6 border border-white/10'>
              <h2 className='text-xl font-semibold text-white mb-4'>
                Transport Controls
              </h2>
              <button
                onClick={togglePlay}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition ${
                  isPlaying
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}>
                {isPlaying ? 'Stop Loop' : 'Play Loop'}
              </button>
            </div>

            {/* Volume Control */}
            <div className='bg-white/5 rounded-xl p-6 border border-white/10'>
              <h2 className='text-xl font-semibold text-white mb-4'>
                Volume: {volume} dB
              </h2>
              <input
                type='range'
                min='-40'
                max='0'
                step='1'
                value={volume}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setVolume(Number(e.target.value))
                }
                className='w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer'
              />
            </div>

            {/* Piano Keys */}
            <div className='bg-white/5 rounded-xl p-6 border border-white/10'>
              <h2 className='text-xl font-semibold text-white mb-4'>
                Play Notes
              </h2>
              <div className='grid grid-cols-4 gap-3'>
                {notes.map((note: string) => (
                  <button
                    key={note}
                    onClick={() => playNote(note, '8n')}
                    className='bg-gradient-to-br from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white font-bold py-4 rounded-lg shadow-lg transform transition hover:scale-105 active:scale-95'>
                    {note}
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className='bg-blue-500/10 border border-blue-400/30 rounded-xl p-4'>
              <p className='text-blue-200 text-sm text-center'>
                Status:{' '}
                <span className='font-semibold text-white'>
                  {isPlaying ? 'Playing' : 'Stopped'}
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
