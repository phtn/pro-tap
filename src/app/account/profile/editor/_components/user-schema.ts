import {FieldGroup, genderOptions} from '@/components/experimental/form/schema'
import {z} from 'zod'

export const UserContactSchema = z.object({
  email: z.email().nullable(),
  phoneNumber: z.string().nullable(),
  address: z.string().nullable(),
})

export const UserBiodataSchema = z.object({
  firstName: z.string().nullable(),
  middleName: z.string().nullable(),
  lastName: z.string().nullable(),
  gender: z.union([z.literal('male'), z.literal('female')]).nullable(),
})

export const UserInfoSchema = UserBiodataSchema.extend({
  ...UserContactSchema.shape,
})

export type UserInfoType = z.infer<typeof UserInfoSchema>

export const userInfoInitial: UserInfoType = {
  email: null,
  phoneNumber: null,
  address: null,
  firstName: '',
  middleName: '',
  lastName: '',
  gender: null,
}

export const fieldGroups: FieldGroup<UserInfoType>[] = [
  {
    title: 'UserInfoData',
    fields: [
      {
        name: 'firstName',
        label: 'First Name',
        placeholder: 'Your given name',
        helperText: 'Your given name.',
        required: false,
        error: false,
        type: 'text',
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
        name: 'email',
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
    ],
  },
]
