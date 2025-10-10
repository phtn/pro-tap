import {Dispatch, SetStateAction} from 'react'

interface QrGenFormProps {
  onGenerate: (groupName: string, quantity: number) => Promise<void>
  groupName: string
  setGroupName: Dispatch<SetStateAction<string>>
}

export const QrGenForm = ({
  onGenerate,
  groupName,
  setGroupName,
}: QrGenFormProps) => {
  return (
    <div className='p-6 space-y-6'>
      {/* Generation Controls */}
      <div className='bg-zinc-800/50 rounded-xl p-6 border border-zinc-700/50'>
        <h3 className='text-lg font-semibold text-white mb-4'>
          Generate QR Codes
        </h3>

        {/* Group Name Input */}
        <div className='mb-6'>
          <label className='block text-sm font-medium text-zinc-300 mb-2'>
            Group Name (optional)
          </label>
          <input
            type='text'
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder='Enter group name'
            className='w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>

        {/* Quantity Selection */}
        <div className='mb-6'>
          <label className='block text-sm font-medium text-zinc-300 mb-3'>
            Quantity
          </label>
          {/*<div className='grid grid-cols-5 gap-2'>
            {[50, 100, 200, 500, 1000].map((quantity) => (
              <button
                key={quantity}
                onClick={() => setSelectedQuantity(quantity)}
                disabled={isGenerating}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  selectedQuantity === quantity
                    ? 'bg-blue-600 text-white'
                    : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600 disabled:opacity-50',
                )}>
                {quantity}
              </button>
            ))}
          </div>*/}
        </div>

        {/* Generation Status */}
        {/*{isGenerating && (
          <div className='mb-4'>
            <div className='flex items-center justify-between text-sm text-zinc-300 mb-2'>
              <span>Generating QR codes...</span>
              <span>{generationProgress}%</span>
            </div>
            <div className='w-full bg-zinc-700 rounded-full h-2'>
              <div
                className='bg-blue-600 h-2 rounded-full transition-all duration-300'
                style={{width: `${generationProgress}%`}}
              />
            </div>
          </div>
        )}*/}

        {/* Generated Count */}
        {/*{generatedCount > 0 && !isGenerating && (
          <div className='text-green-400 text-sm font-medium'>
            ✓ Successfully generated {generatedCount} QR codes
          </div>
        )}*/}
      </div>
    </div>
  )
}
