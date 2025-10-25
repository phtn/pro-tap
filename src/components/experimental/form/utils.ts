import {createFormHook, createFormHookContexts} from '@tanstack/react-form'
import {SubmitButton} from './components'
import {FileField, SelectField, TextField} from './fields'
const {fieldContext, formContext} = createFormHookContexts()

export const {useAppForm, withForm} = createFormHook({
  fieldComponents: {
    TextField,
    SelectField,
    FileField,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
})
