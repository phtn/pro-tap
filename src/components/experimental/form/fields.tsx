import {HyperList} from '@/components/list'
import {ModernInput} from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {Icon} from '@/lib/icons'
import {cn} from '@/lib/utils'
import {FieldOption, SelectFieldConfig, TextFieldConfig} from './schema'

export const TextField = <T,>(item: TextFieldConfig<T>) => (
  <div className='relative'>
    <div className='flex items-center'>
      <div className='ps-1 mb-2 font-figtree flex items-center space-x-2 text-xs md:text-sm'>
        <label className='block font-medium tracking-tight whitespace-nowrap'>
          {item.label}
        </label>
        {item.helperText && (
          <div className='flex items-center space-x-2'>
            <Icon
              name='play-solid'
              className={cn('size-3 md:size-4 opacity-30', {
                'text-red-400 opacity-100': item.required,
              })}
            />
            <span className='opacity-80'>{item.helperText}</span>
          </div>
        )}
        {item.error && (
          <span className='text-right text-xs text-mac-red'> {item.error}</span>
        )}
      </div>
    </div>
    <ModernInput
      type={item.type}
      name={item.name as string}
      autoComplete={item.autoComplete}
      required={item.required}
      defaultValue={item.defaultValue ? String(item.defaultValue) : undefined}
      onChange={(e) => {
        const val =
          item.type === 'number' ? Number(e.target.value) : e.target.value
        item.validators?.onChange(val)
      }}
      value={item.value ? String(item.value) : undefined}
      placeholder={item.placeholder}
      className='w-full text-sm tracking-tight font-semibold md:text-base min-h-14 px-5 py-4.5 md:py-7 h-fit rounded-2xl border-[0.33px] dark:border-gray-500/50 outline-none'
    />
  </div>
)

export const SelectField = <T,>(item: SelectFieldConfig<T>) => {
  return (
    <div className='relative pb-2'>
      <div className='flex items-center'>
        <div className='ps-1 mb-2 font-figtree flex items-center space-x-2 text-xs md:text-sm'>
          <label className='block font-medium tracking-tight whitespace-nowrap'>
            {item.label}
          </label>
          {item.helperText && (
            <div className='flex items-center space-x-2'>
              <Icon
                name='play-solid'
                className={cn('size-3 md:size-4 opacity-40', {
                  'text-red-400 opacity-100': item.required,
                })}
              />
              <span className='opacity-60'>{item.helperText}</span>
            </div>
          )}
        </div>
      </div>
      <Select
        name={item.name as string}
        defaultValue={item.defaultValue ? String(item.defaultValue) : undefined}
        onValueChange={(value) => item.validators?.onChange(value)}>
        <SelectTrigger
          size='default'
          className='min-h-14 h-fit py-4 md:py-4 cursor-pointer rounded-2xl dark:bg-background/20 bg-background  border-[0.33px] dark:border-gray-500/50 outline-none text-left w-full'>
          <SelectValue
            placeholder={item.placeholder ?? 'Select an option'}
            className='text-neutral-200 h-full placeholder:text-base'
          />
        </SelectTrigger>
        <SelectContent className='w-full rounded-2xl border-gray-400 [&_*[role=option]]:ps-3 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-4'>
          <HyperList
            data={item.options}
            component={SelectFieldItem}
            itemStyle='border-b border-origin last:border-none'
            keyId='value'
          />
        </SelectContent>
      </Select>
    </div>
  )
}

const SelectFieldItem = ({
  value,
  icon,
  label,
  description,
  iconStyle,
}: FieldOption) => (
  <SelectItem
    value={value}
    className='h-fit py-4 md:py-7 font-medium font-quick cursor-pointer focus:text-panel'>
    <div className='flex items-center px-2 gap-x-4'>
      <Icon name={icon} className={cn('size-5', iconStyle)} />
      <div className='flex flex-col justify-start'>
        <span className='block text-sm tracking-tight font-semibold'>
          {label}
        </span>
        <span className='block text-[12px] font-sans font-normal opacity-60'>
          {description}
        </span>
      </div>
    </div>
  </SelectItem>
)
