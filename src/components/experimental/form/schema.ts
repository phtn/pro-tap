import {ClassName} from '@/app/types'
import {ServerTime} from '@/lib/firebase/types/user'
import {IconName} from '@/lib/icons'
import {ChangeEvent, FocusEvent, HTMLInputTypeAttribute, ReactNode} from 'react'
import z from 'zod'

// Define option type for selects and checkbox groups

type InputMode =
  | 'search'
  | 'text'
  | 'email'
  | 'tel'
  | 'url'
  | 'none'
  | 'numeric'
  | 'decimal'
  | undefined
export type UserFieldName = 'name' | 'tel' | 'email' | 'inquiry'

// Type for field validators
export type FieldValidator = (value: string | number) => true | string

// Define base field properties
export interface BaseFieldConfig<T> {
  name: keyof T
  error?: false | string
  label?: string
  value?: string | number
  defaultValue?: string | number
  required?: boolean
  autoComplete?: string
  placeholder?: string
  helperText?: ReactNode
  validators?: Record<string, FieldValidator>
  className?: string
  disabled?: boolean
  type?: HTMLInputTypeAttribute
  inputMode?: InputMode
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void
}

// Text field config
export interface TextFieldConfig<T> extends BaseFieldConfig<T> {
  type: 'text' | 'email' | 'number' | 'password' | 'tel' | 'file'
}

export type FieldOption = {
  value: string
  label: string
  icon: IconName
  description?: string
  iconStyle?: ClassName
}
// Select field config
export interface SelectFieldConfig<T> extends BaseFieldConfig<T> {
  type: 'select'
  options: FieldOption[]
  // onValueChange: (value: string) => void;
}

// Union type for all field types
export type FieldConfig<T> = TextFieldConfig<T> | SelectFieldConfig<T>

// Type for field groups
export interface FieldGroup<T> {
  title: string
  fields: FieldConfig<T>[]
}

export const serverTimeSchema = z.custom<ServerTime>().optional()

export interface ISelectFieldItem extends FieldOption {
  id: string
  name: string
}
