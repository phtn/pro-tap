import {createFormHook, createFormHookContexts} from '@tanstack/react-form'
import {SubmitButton} from './components'
import {SelectField, TextField} from './fields'
const {fieldContext, formContext} = createFormHookContexts()

export const {useAppForm} = createFormHook({
  fieldComponents: {
    TextField,
    SelectField,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
})
