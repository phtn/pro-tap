import {ClassName} from '@/app/types'
import {cn} from '@/lib/utils'
import {AnyFieldApi} from '@tanstack/react-form'
import {SexyButton} from '../sexy-button-variants'

export const FieldInfo = ({field}: {field: AnyFieldApi}) => (
  <>
    {field.state.meta.isTouched && field.state.meta.errors.length ? (
      <em>{field.state.meta.errors.join(', ')}</em>
    ) : null}
    {field.state.meta.isValidating ? 'Validating...' : null}
  </>
)

interface SubmitButtonProps {
  pending: boolean
  className?: ClassName
  label?: string
}

export const SubmitButton = ({
  pending,
  className,
  label,
}: SubmitButtonProps) => {
  return (
    <SexyButton
      type='submit'
      disabled={pending}
      rightIcon={pending ? 'spinners-ring' : 'arrow-up'}
      variant='ghost'
      className={cn(
        'md:px-12 bg-transparent hover:bg-primary hover:text-white dark:text-foreground text-background dark:inset-shadow-[0_1px_rgb(160_160_160)]/0 inset-shadow-[0_1px_rgb(160_160_160)]/0',
        className,
      )}
      iconStyle='size-4 md:size-12'>
      <span className=' md:text-lg'>
        {pending ? 'Saving...' : (label ?? 'Submit')}
      </span>
    </SexyButton>
  )
}
