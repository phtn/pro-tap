import ProfileView from '@/app/account/profile/_components/profile-preview'
import { ProfileService } from '@/lib/firebase/profile'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ username: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params
  const profile = await ProfileService.getProfileByUsername(username)

  if (!profile) {
    return {
      title: 'Profile Not Found',
    }
  }

  return {
    title: `${profile.displayName} (@${profile.username})`,
    description: profile.bio || `Check out ${profile.displayName}'s profile`,
  }
}

export default async function PublicProfilePage({ params }: PageProps) {
  const { username } = await params
  const profile = await ProfileService.getProfileByUsername(username)

  if (!profile) {
    notFound()
  }

  return <ProfileView profile={profile} />
}
