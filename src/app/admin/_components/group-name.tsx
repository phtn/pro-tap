import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'

interface GroupNameProps {
  setGroup: (group: string) => void
  group: string
  disabled: boolean
}

export const GroupName = ({setGroup, group, disabled}: GroupNameProps) => {
  const handleGroupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroup(e.target.value)
  }

  return (
    <div className='h-full w-full flex flex-col items-start font-figtree space-y-1'>
      <Label htmlFor='group-name' className='pb-1'>
        <span className='opacity-60 md:text-base text-xs tracking-tight font-medium'>
          Group
        </span>
      </Label>
      <Input
        id='group-name'
        disabled={disabled}
        defaultValue={group}
        onChange={handleGroupChange}
        className='text-xs md:text-sm border-transparent uppercase dark:border-transparent font-space dark:bg-origin md:w-fit w-14 pl-2 pr-2 md:h-10 h-7 bg-muted'
      />
    </div>
  )
}
