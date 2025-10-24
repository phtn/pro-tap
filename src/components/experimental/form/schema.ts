import {ClassName} from '@/app/types'
import {ServerTime} from '@/lib/firebase/types/user'
import {IconName} from '@/lib/icons'
import z from 'zod'

// Define option type for selects and checkbox groups

export type UserFieldName = 'name' | 'tel' | 'email' | 'inquiry'

// Type for field validators
type FieldValidator = (value: string | number) => true | string

// Define base field properties
export interface BaseFieldConfig<T> {
  name: keyof T
  error: false | string
  label?: string
  value?: string | number
  defaultValue?: string | number
  required?: boolean
  autoComplete?: string
  placeholder?: string
  helperText?: string
  validators?: Record<string, FieldValidator>
  className?: string
}

// Text field config
export interface TextFieldConfig<T> extends BaseFieldConfig<T> {
  type: 'text' | 'email' | 'number' | 'password' | 'tel'
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

export const genderOptions: ISelectFieldItem[] = [
  {
    id: '1',
    value: 'male',
    name: 'male',
    label: 'Male',
    icon: 'circle-solid',
    iconStyle: 'text-blue-500',
    // description: 'Biological male',
  },
  {
    id: '2',
    value: 'female',
    name: 'female',
    label: 'Female',
    icon: 'circle-solid',
    iconStyle: 'text-pink-500',
    // description: 'Biological female',
  },
]

export const themeOptions: ISelectFieldItem[] = [
  {
    id: '1',
    icon: 'slash',
    value: 'auto',
    name: 'auto',
    label: 'Auto',
    description: 'Auto-detect',
  },
  {
    id: '2',
    icon: 'dark-theme',
    value: 'dark',
    name: 'dark',
    label: 'Dark',
    description: 'Dark Theme',
  },
  {
    id: '3',
    icon: 'dark-theme',
    value: 'light',
    name: 'light',
    label: 'Light',
    description: 'Light Theme',
  },
]

// export const fieldGroups: FieldGroup[] = [
//   {
//     title: 'UserInfoData',
//     fields: [
//       {
//         name: 'displayName',
//         type: 'text',
//         label: 'Display Name',
//         placeholder: 'Your display name',
//         helperText: 'The name shown in your profile.',
//         required: true,
//         error: false,
//       },
//       {
//         name: 'firstName',
//         type: 'text',
//         label: 'First Name',
//         placeholder: 'Your given name',
//         helperText: 'Your given name.',
//         required: false,
//         error: false,
//       },
//       {
//         name: 'middleName',
//         type: 'text',
//         label: 'Middle Name',
//         placeholder: 'Your middle name',
//         helperText: 'Your middle name.',
//         required: false,
//         error: false,
//       },
//       {
//         name: 'lastName',
//         type: 'text',
//         label: 'Last Name',
//         placeholder: 'Your last name',
//         helperText: 'Your last name.',
//         required: false,
//         error: false,
//       },
//       {
//         name: 'gender',
//         type: 'select',
//         label: 'Gender',
//         helperText: 'Your biological gender.',
//         placeholder: 'Select your gender',
//         required: true,
//         options: genderOptions,
//         error: false,
//       },
//       {
//         name: 'username',
//         type: 'text',
//         label: 'Username',
//         placeholder: 'Enter your username',
//         helperText: 'Enter your username',
//         required: false,
//         error: false,
//       },
//       {
//         name: 'bio',
//         type: 'text',
//         label: 'Bio',
//         placeholder: 'Enter your bio',
//         required: false,
//         error: false,
//       },
//       {
//         name: 'avatar',
//         type: 'text',
//         label: 'Avatar',
//         placeholder: 'Upload your avatar',
//         required: false,
//         error: false,
//       },

//       {
//         name: 'theme',
//         type: 'select',
//         label: 'Theme',
//         placeholder: 'Select your theme',
//         required: true,
//         options: themeOptions,
//         error: false,
//       },
//     ],
//   },
// ]
