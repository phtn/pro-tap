'use client'

import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {Badge} from '@/components/ui/badge'
import {Button} from '@/components/ui/button'
import {Card} from '@/components/ui/card'
import {Icon} from '@/lib/icons'
import {cn} from '@/lib/utils'

import {useState} from 'react'

type TabType = 'all' | 'news' | 'shops' | 'careers'

const tabs: {id: TabType; label: string}[] = [
  {id: 'all', label: 'All'},
  {id: 'news', label: 'News'},
  {id: 'shops', label: 'Shops'},
  {id: 'careers', label: 'Careers'},
]

export function DiscoverFeed() {
  const [activeTab, setActiveTab] = useState<TabType>('all')

  return (
    <div className='w-full min-h-screen bg-background'>
      {/* Header */}
      <header className='border-b border-border bg-origin/50 backdrop-blur-sm sticky top-0 z-50 pt-4 md:pt-6 sm:px-6 lg:px-8'>
        <div className='w-full md:max-w-7xl'>
          <div className='flex items-center justify-between mb-6 px-4'>
            <div>
              <h1 className='text-3xl md:text-4xl font-black -tracking-wider italic font-figtree text-balance'>
                Discover<span className='text-teal-500'>.</span>
              </h1>
              <p className='text-sm md:text-base text-muted-foreground font-figtree pl-1 text-pretty'>
                Browse top picks we matched for you.
              </p>
            </div>
            <Button variant='ghost' className='rounded-full h-12 w-12'></Button>
          </div>

          {/* Tabs and Actions */}
          <div className='flex items-center justify-between w-full gap-4 dark:bg-dark-origin bg-zinc-300 pl-4 pr-2'>
            <div className='flex items-center gap-4 w-full'>
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  size='sm'
                  variant={activeTab === tab.id ? 'secondary' : 'ghost'}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn('rounded-full text-xs px-2', {
                    'bg-white': activeTab === tab.id,
                  })}>
                  {tab.label}
                </Button>
              ))}
            </div>
            <div className='flex items-center gap-2'>
              <Button variant='ghost' className='rounded-full h-10 w-10'>
                <Icon name='search' className='size-4' />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Masonry Grid */}
      <main className='max-w-7xl mx-auto py-8'>
        <div className='columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6'>
          {/* Experience Card 1 */}
          <Card className='rounded-md break-inside-avoid overflow-hidden border-0 bg-sky-200 hover:shadow-lg transition-shadow'>
            <div className='relative h-80'>
              <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
              <Badge
                variant='secondary'
                className='absolute top-4 left-4 rounded-full text-xs font-medium bg-zinc-800 text-white'>
                EXPERIENCES
              </Badge>
              <div className='absolute bottom-0 left-0 right-0 p-6 text-white'>
                <h3 className='text-2xl font-bold mb-2 text-balance'>
                  Stay in the most luxurious boutique hotel
                </h3>
                <div className='flex items-center gap-2'>
                  <Avatar className='h-6 w-6 border-2 border-white'>
                    <AvatarFallback className='text-xs'>AS</AvatarFallback>
                  </Avatar>
                  <span className='text-sm'>Almashared</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Suggested Group Card 1 */}
          <Card className='bg-slate-400/80 rounded-md break-inside-avoid overflow-hidden border-border/50 hover:shadow-lg transition-shadow'>
            <div className='p-6'>
              <div className='flex items-start justify-between mb-4'>
                <Badge
                  variant='secondary'
                  className='rounded-full text-xs font-medium bg-zinc-800 text-white'>
                  SUGGESTED GROUP
                </Badge>
                <div className='flex -space-x-2'>
                  <Avatar className='h-8 w-8 border-2 border-white'>
                    <AvatarImage src='/placeholder.svg?height=32&width=32' />
                    <AvatarFallback>U1</AvatarFallback>
                  </Avatar>
                  <Avatar className='h-8 w-8 border-2 border-white'>
                    <AvatarImage src='/placeholder.svg?height=32&width=32' />
                    <AvatarFallback>U2</AvatarFallback>
                  </Avatar>
                  <Avatar className='h-8 w-8 border-2 border-white'>
                    <AvatarImage src='/placeholder.svg?height=32&width=32' />
                    <AvatarFallback>U3</AvatarFallback>
                  </Avatar>
                </div>
              </div>

              <div className='flex items-center gap-3 mb-4'>
                <div className='h-16 w-16 rounded-2xl bg-white/80 flex items-center justify-center'>
                  <Icon name='user' className='h-8 w-8 text-mint' />
                </div>
              </div>

              <h3 className='font-bold text-xl mb-2'>Wellness Group</h3>
              <div className='flex items-center gap-4 text-sm mb-4'>
                <span>
                  <span className='font-semibold text-foreground'>13K</span>{' '}
                  <span className='text-muted-foreground'>Members</span>
                </span>
                <span>
                  <span className='font-semibold text-foreground'>19</span>{' '}
                  <span className='text-muted-foreground'>Countries</span>
                </span>
              </div>

              <div className='flex flex-wrap gap-2'>
                <Badge
                  variant='secondary'
                  className='rounded-full bg-white/80 text-foreground'>
                  LIFESTYLE
                </Badge>
                <Badge
                  variant='secondary'
                  className='rounded-full bg-white/80 text-foreground'>
                  PRODUCTIVITY
                </Badge>
                <Badge
                  variant='secondary'
                  className='rounded-full bg-zinc-800 text-white'>
                  HEALTH
                </Badge>
                <Badge
                  variant='secondary'
                  className='rounded-full bg-white/80 text-foreground'>
                  SKINCARE
                </Badge>
              </div>
            </div>
          </Card>

          {/* Experience Card 2 */}
          <Card className='bg-slate-400/40 rounded-md break-inside-avoid overflow-hidden border-0 bg-lavender hover:shadow-lg transition-shadow'>
            <div className='relative h-72'>
              <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
              <Badge
                variant='secondary'
                className='absolute top-4 left-4 rounded-full text-xs font-medium bg-zinc-800 text-white'>
                EXPERIENCES
              </Badge>
              <div className='absolute bottom-0 left-0 right-0 p-6 text-white'>
                <h3 className='text-2xl font-bold mb-2 text-balance'>
                  Play all the games you want for free
                </h3>
                <div className='flex items-center gap-2'>
                  <Avatar className='h-6 w-6 border-2 border-white'>
                    <AvatarFallback className='text-xs bg-black'>
                      P
                    </AvatarFallback>
                  </Avatar>
                  <span className='text-sm'>Playhera</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Program Card 2 */}
          <Card className='rounded-md bg-amber-50/80 break-inside-avoid overflow-hidden border-border/50 hover:shadow-lg transition-shadow'>
            <div className='p-6'>
              <div className='flex items-start justify-between mb-4'>
                <Badge
                  variant='secondary'
                  className='rounded-full text-xs font-medium bg-zinc-800 text-white'>
                  Verified
                </Badge>
              </div>

              <div className='flex items-center gap-3 mb-4'>
                <div className='h-12 w-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center'>
                  <span className='text-white font-bold text-lg'>XY</span>
                </div>
                <div>
                  <h3 className='font-semibold text-base'>XYZ</h3>
                  <p className='text-sm text-muted-foreground'>@xyz</p>
                  <p className='text-xs text-muted-foreground'>1 day ago</p>
                </div>
              </div>

              <h4 className='font-semibold text-lg mb-2 text-balance'>
                Leading deliver everything app
              </h4>
              <p className='text-sm text-muted-foreground mb-4 text-pretty'>
                Partner with the leading deliver everything application the
                Middle East and beyond.
              </p>

              <div className='flex items-center gap-2 mb-4'>
                <Icon
                  name='facebook-solid'
                  className='h-4 w-4 text-muted-foreground'
                />
                <Icon
                  name='x-twitter'
                  className='h-4 w-4 text-muted-foreground'
                />
                <Icon
                  name='instagram'
                  className='h-4 w-4 text-muted-foreground'
                />
              </div>

              <div className='space-y-2 pt-4 border-t border-border'>
                <div className='flex items-center gap-2 text-sm'>
                  <span className='font-medium'>$ 1,000 USD</span>
                  <span className='text-muted-foreground'>per 10k views</span>
                </div>
                <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                  <Icon name='eye' className='h-4 w-4' />
                  <span>Views</span>
                </div>
                <div className='flex items-center gap-2 text-sm text-emerald-600'>
                  <Icon name='check' className='h-4 w-4' />
                  <span>Matches your profile</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Suggested Group Card 2 */}
          <Card className='break-inside-avoid overflow-hidden border-border/50 bg-slate-300/60 hover:shadow-lg transition-shadow'>
            <div className='p-6'>
              <div className='flex items-start justify-between mb-4'>
                <Badge
                  variant='secondary'
                  className='rounded-full text-xs font-medium bg-zinc-800 text-white'>
                  SUGGESTED GROUP
                </Badge>
                <div className='flex -space-x-2'>
                  <Avatar className='h-8 w-8 border-2 border-white'>
                    <AvatarImage src='/placeholder.svg?height=32&width=32' />
                    <AvatarFallback>U1</AvatarFallback>
                  </Avatar>
                  <Avatar className='h-8 w-8 border-2 border-white'>
                    <AvatarImage src='/placeholder.svg?height=32&width=32' />
                    <AvatarFallback>U2</AvatarFallback>
                  </Avatar>
                  <Avatar className='h-8 w-8 border-2 border-white'>
                    <AvatarImage src='/placeholder.svg?height=32&width=32' />
                    <AvatarFallback>U3</AvatarFallback>
                  </Avatar>
                </div>
              </div>

              <div className='flex items-center gap-3 mb-4'>
                <div className='h-16 w-16 rounded-2xl bg-white/80 flex items-center justify-center'>
                  <Icon name='user' className='h-8 w-8 text-blush' />
                </div>
              </div>

              <h3 className='font-bold text-xl mb-2'>Creative Hub</h3>
              <div className='flex items-center gap-4 text-sm mb-4'>
                <span>
                  <span className='font-semibold text-foreground'>13K</span>{' '}
                  <span className='text-muted-foreground'>Members</span>
                </span>
                <span>
                  <span className='font-semibold text-foreground'>19</span>{' '}
                  <span className='text-muted-foreground'>Countries</span>
                </span>
              </div>

              <div className='flex flex-wrap gap-2'>
                <Badge
                  variant='secondary'
                  className='rounded-full bg-zinc-800 text-white'>
                  GAMING
                </Badge>
                <Badge
                  variant='secondary'
                  className='rounded-full bg-zinc-800 text-white'>
                  ANIME
                </Badge>
              </div>
            </div>
          </Card>

          {/* User Post Card */}
          <Card className='break-inside-avoid overflow-hidden border-border/50 hover:shadow-lg transition-shadow'>
            <div className='p-6'>
              <div className='flex items-start gap-3 mb-4'>
                <Avatar className='h-12 w-12'>
                  <AvatarImage src='/placeholder.svg?height=48&width=48' />
                  <AvatarFallback>RF</AvatarFallback>
                </Avatar>
                <div className='flex-1'>
                  <h4 className='font-semibold'>Robert Fox</h4>
                  <p className='text-sm text-muted-foreground'>
                    XYZ Group · 1 day ago
                  </p>
                </div>
              </div>

              <p className='text-sm text-muted-foreground text-pretty'>
                Lorem ipsum dolor sit amet consectetur. Convallis velit ultr
                amet nunc. Sed sed eget amet nunc sed eget.
              </p>
            </div>
          </Card>

          {/* Experience Card 3 */}
          <Card className='break-inside-avoid overflow-hidden border-0 bg-gradient-to-br from-slate-400 to-slate-500 hover:shadow-lg transition-shadow'>
            <div className='relative h-80'>
              <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
              <Badge
                variant='secondary'
                className='absolute top-4 left-4 rounded-full text-xs font-medium bg-zinc-800 text-white'>
                EXPERIENCES
              </Badge>
              <div className='absolute bottom-0 left-0 right-0 p-6 text-white'>
                <h3 className='text-2xl font-bold mb-2 text-balance'>
                  Join creative workshops and masterclasses
                </h3>
                <div className='flex items-center gap-2'>
                  <Avatar className='h-6 w-6 border-2 border-white'>
                    <AvatarFallback className='text-xs'>CM</AvatarFallback>
                  </Avatar>
                  <span className='text-sm'>CreativeMind</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
