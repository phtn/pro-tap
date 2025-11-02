import {
  FieldGroup,
  ISelectFieldItem,
} from '@/components/experimental/form/schema'
import {z} from 'zod'
import type {Id} from '../../../../../../convex/_generated/dataModel'
import {UserProfileProps} from '../../../../../../convex/userProfiles/d'

export const themeOptions: ISelectFieldItem[] = [
  {
    id: '1',
    icon: 'slash',
    value: 'auto',
    name: 'auto',
    label: 'Auto',
    description: '',
  },
  {
    id: '2',
    icon: 'dark-theme',
    value: 'dark',
    name: 'dark',
    label: 'Dark',
    description: '',
  },
  {
    id: '3',
    icon: 'circle-solid',
    value: 'light',
    name: 'light',
    label: 'Light',
    description: '',
  },
]
const convexFileId = z.custom<Id<'files'>>(
  (value) => typeof value === 'string',
  {
    message: 'Invalid Convex id',
  },
)

export const UserProfileSchema = z.object({
  bio: z.string().nullable(),
  socialLinks: z
    .object({
      facebook: z.string().optional(),
      twitter: z.string().optional(),
      instagram: z.string().optional(),
      tiktok: z.string().optional(),
      linkedin: z.string().optional(),
    })
    .partial()
    .default({}),
  username: z.string().nullable(),
  displayName: z.string().nullable(),
  proId: z.string(),
  customLinks: z
    .array(
      z.object({
        id: z.string(),
        label: z.string(),
        url: z.string(),
      }),
    )
    .optional(),
  isPublic: z.boolean(),
  showAnalytics: z.boolean(),
  phone: z.string().nullable(),
  cardId: z.string().nullable(),
  email: z.string().nullable(),
  visible: z.boolean(),
  avatarUrl: z.string().nullable(),
  metaTitle: z.string().nullable(),
  metaDescription: z.string().nullable(),
  gallery: z.array(convexFileId).optional(),
  website: z.string().nullable(),
  createdAt: z.number().optional(),
  updatedAt: z.number().optional(),
  theme: z
    .object({
      primaryColor: z.string(),
      backgroundColor: z.string(),
      layoutStyle: z.enum(['minimal', 'card', 'list']),
    })
    .optional(),
})

export type UserProfile = z.infer<typeof UserProfileSchema>

export const profileInitial: UserProfileProps = {
  username: null,
  displayName: null,
  bio: null,
  socialLinks: {},
  proId: '',
  customLinks: [],
  visible: false,
  email: null,
  avatarUrl: null,
  cardId: null,
  phone: null,
  website: null,
  isPublic: false,
  showAnalytics: false,
  metaTitle: null,
  metaDescription: null,
  gallery: [] as Id<'files'>[],
}
export const profileFieldGroups: FieldGroup<UserProfileProps>[] = [
  {
    title: 'UserProfile',
    fields: [
      {
        name: 'username',
        type: 'text',
        label: 'Username',
        placeholder: 'Enter your username',
        helperText: 'Check availability',
        required: false,
        error: false,
      },
      // {
      //   name: 'avatar',
      //   type: 'file',
      //   label: 'Avatar',
      //   placeholder: 'Upload your avatar',
      //   required: false,
      //   error: false,
      // },
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
        name: 'bio',
        type: 'text',
        label: 'Bio',
        helperText: 'Your interests, hobbies, and passions.',
        placeholder: 'Tell us about yourself',
        required: false,
        error: false,
      },

      // {
      //   name: 'theme',
      //   type: 'select',
      //   label: 'Theme',
      //   placeholder: 'Select your theme',
      //   required: true,
      //   options: themeOptions,
      //   error: false,
      // },
    ],
  },
]
