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
      rightIcon={pending ? 'spinners-ring' : 'save'}
      iconStyle='size-4'
      variant='primary'
      className={cn(className)}>
      {pending ? 'Submitting' : (label ?? 'Submit')}
    </SexyButton>
  )
}
