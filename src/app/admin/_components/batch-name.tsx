import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'

interface BatchNameProps {
  setBatch: (batch: string) => void
  batch: string
  disabled: boolean
}

export const BatchName = ({setBatch, batch, disabled}: BatchNameProps) => {
  const handleBatchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBatch(e.target.value)
  }

  return (
    <div className='h-full w-full flex flex-col items-start font-figtree space-y-1'>
      <Label htmlFor='batch-name' className='pb-1'>
        <span className='opacity-60 md:text-base text-xs tracking-tight font-medium'>
          Batch
        </span>
      </Label>
      <Input
        id='batch-name'
        defaultValue={batch}
        onChange={handleBatchChange}
        className='border-transparent dark:border-transparent font-space dark:bg-origin md:w-fit w-36 pl-2 pr-2 md:h-10 h-7 bg-muted'
        disabled={disabled}
      />
    </div>
  )
}
