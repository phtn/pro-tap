import {FieldGroup, themeOptions} from '@/components/experimental/form/schema'
import {z} from 'zod'

export const UserProfileSchema = z.object({
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
  username: z.string().nullable(),
  displayName: z.string().nullable(),
  theme: z.union([z.literal('light'), z.literal('dark'), z.literal('auto')]),
  isPublished: z.boolean(),
})

export type UserProfile = z.infer<typeof UserProfileSchema>

export const profileInitial: UserProfile = {
  username: null,
  displayName: null,
  bio: null,
  isPublished: false,
  socialLinks: {},
  theme: 'auto',
  avatar: null,
}
export const profileFieldGroups: FieldGroup<UserProfile>[] = [
  {
    title: 'UserProfile',
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
