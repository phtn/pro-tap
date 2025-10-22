import {Counter} from '@/components/react-bits/counter'

interface CardCounterProps {
  value: number
}

export const CardCounter = ({value}: CardCounterProps) => {
  return (
    <Counter
      gap={0}
      padding={1}
      fontSize={14}
      value={value}
      fontWeight={400}
      className='border px-0 w-fit text-lg'
      places={[1000, 100, 10, 1]}
    />
  )
}
