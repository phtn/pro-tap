'use client'

import {Input} from '@/components/ui/input'
import {Slider} from '@/components/ui/slider'
import {useSliderWithInput} from '@/hooks/use-slider-with-input'
import {Dispatch, SetStateAction, useEffect} from 'react'

interface RangeSliderWithInputProps {
  setSelectedValue: Dispatch<SetStateAction<number>>
}

export const RangeSliderWithInput = ({
  setSelectedValue,
}: RangeSliderWithInputProps) => {
  const minValue = 1
  const maxValue = 1000
  const initialValue = [100]

  const {
    sliderValue,
    inputValues,
    validateAndUpdateValue,
    handleInputChange,
    handleSliderChange,
  } = useSliderWithInput({minValue, maxValue, initialValue})

  useEffect(() => {
    if (inputValues[0]) {
      setSelectedValue(+inputValues[0])
    }
  }, [inputValues])

  return (
    <div className='*:not-first:mt-4'>
      <div className='flex h-64 flex-col items-center justify-center gap-4'>
        <Input
          type='text'
          inputMode='numeric'
          className='hidden h-9 w-full p-2 text-right text-base font-space border-none bg-zinc-100'
          value={inputValues[0]}
          onChange={(e) => handleInputChange(e, 0)}
          onBlur={() => validateAndUpdateValue(inputValues[0], 0)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              validateAndUpdateValue(inputValues[0], 0)
            }
          }}
          aria-label='Enter value'
        />
        <Slider
          className='data-[orientation=vertical]:min-h-0'
          value={sliderValue}
          onValueChange={handleSliderChange}
          min={minValue}
          max={maxValue}
          orientation='vertical'
          aria-label='Slider with input'
        />
      </div>
    </div>
  )
}
