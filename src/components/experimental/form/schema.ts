import {ProfileFormData, ServerTime} from '@/lib/firebase/types/user'
import {IconName} from '@/lib/icons'
import z from 'zod'

// Define option type for selects and checkbox groups

export type UserFieldName = 'name' | 'tel' | 'email' | 'inquiry'

// Type for field validators
type FieldValidator = (value: string | number) => true | string

// Define base field properties
export interface BaseFieldConfig {
  name: keyof ProfileFormData
  error: false | string
  label?: string
  value?: any
  defaultValue?: string
  required?: boolean
  autoComplete?: string
  placeholder?: string
  helperText?: string
  validators?: Record<string, FieldValidator>
  className?: string
}

export const profileInitialValues: ProfileFormData = {
  displayName: '',
  username: '',
  avatar: '',
  theme: 'auto',
  isPublished: false,
  bio: '',
  firstName: '',
  middleName: '',
  lastName: '',
  gender: null,
}

// Text field config
export interface TextFieldConfig extends BaseFieldConfig {
  type: 'text' | 'email' | 'number' | 'password' | 'tel'
}

export type FieldOption = {
  value: string
  label: string
  icon: IconName
  description?: string
}
// Select field config
export interface SelectFieldConfig extends BaseFieldConfig {
  type: 'select'
  options: FieldOption[]
  // onValueChange: (value: string) => void;
}

// Union type for all field types
export type FieldConfig = TextFieldConfig | SelectFieldConfig

// Type for field groups
export interface FieldGroup {
  title: string
  fields: FieldConfig[]
}

export const serverTimeSchema = z.custom<ServerTime>().optional()

export const userProfileSchema = z.object({
  username: z.string().nullable(),
  displayName: z.string().nullable(),
  bio: z.string().nullable(),
  avatar: z.string().nullable(),
  socialLinks: z
    .object({
      twitter: z.string().optional(),
      github: z.string().optional(),
      linkedin: z.string().optional(),
      website: z.string().optional(),
    })
    .optional(),
  theme: z.union([z.literal('light'), z.literal('dark'), z.literal('auto')]),
  isPublished: z.boolean(),
  createdAt: serverTimeSchema,
  updatedAt: serverTimeSchema,
})

export const userBioDataSchema = z.object({
  firstName: z.string().nullable(),
  middleName: z.string().nullable(),
  lastName: z.string().nullable(),
  gender: z.union([z.literal('male'), z.literal('female')]),
})

export const profileFormDataSchema = userBioDataSchema.extend({
  username: z.string().nullable(),
  displayName: z.string().nullable(),
  bio: z.string().nullable(),
  avatar: z.string().nullable(),
  socialLinks: z
    .object({
      twitter: z.string().optional(),
      github: z.string().optional(),
      linkedin: z.string().optional(),
      website: z.string().optional(),
    })
    .optional(),
  theme: z.union([z.literal('light'), z.literal('dark'), z.literal('auto')]),
  isPublished: z.boolean(),
})

export interface ISelectFieldItem {
  id: string
  icon: IconName
  value: string
  name: string
  label: string
  description?: string
}
export const genderOptions: ISelectFieldItem[] = [
  {
    id: '1',
    icon: 'chevron-up',
    value: 'male',
    name: 'male',
    label: 'Male',
    // description: 'Biological male',
  },
  {
    id: '2',
    icon: 'chevron-down',
    value: 'female',
    name: 'female',
    label: 'Female',
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

export const fieldGroups: FieldGroup[] = [
  {
    title: 'ProfileFormData',
    fields: [
      {
        name: 'displayName',
        type: 'text',
        label: 'Display Name',
        placeholder: 'Your display name',
        helperText: 'The name shown in your profile.',
        required: true,
        error: false,
      },
      {
        name: 'firstName',
        type: 'text',
        label: 'First Name',
        placeholder: 'Your given name',
        helperText: 'Your given name.',
        required: false,
        error: false,
      },
      {
        name: 'middleName',
        type: 'text',
        label: 'Middle Name',
        placeholder: 'Your middle name',
        helperText: 'Your middle name.',
        required: false,
        error: false,
      },
      {
        name: 'lastName',
        type: 'text',
        label: 'Last Name',
        placeholder: 'Your last name',
        helperText: 'Your last name.',
        required: false,
        error: false,
      },
      {
        name: 'gender',
        type: 'select',
        label: 'Gender',
        helperText: 'Your biological gender.',
        placeholder: 'Select your gender',
        required: true,
        options: genderOptions,
        error: false,
      },
      {
        name: 'username',
        type: 'text',
        label: 'Username',
        placeholder: 'Enter your username',
        helperText: 'Enter your username',
        required: false,
        error: false,
      },
      {
        name: 'bio',
        type: 'text',
        label: 'Bio',
        placeholder: 'Enter your bio',
        required: false,
        error: false,
      },
      {
        name: 'avatar',
        type: 'text',
        label: 'Avatar',
        placeholder: 'Upload your avatar',
        required: false,
        error: false,
      },

      {
        name: 'theme',
        type: 'select',
        label: 'Theme',
        placeholder: 'Select your theme',
        required: true,
        options: themeOptions,
        error: false,
      },
    ],
  },
]
