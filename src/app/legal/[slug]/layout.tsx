'use client'
import {Button} from '@/components/ui/button'
import {legalDocuments} from '@/legal/documents'
import {Icon} from '@/lib/icons'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {ReactNode, useState} from 'react'
import {SpaceX} from '../_components/spacex'
import {TocDrawer} from '../_components/toc-drawer'

interface LegalDocumentLayoutProps {
  children?: ReactNode
}

export default function LegalDocumentLayout({
  children,
}: LegalDocumentLayoutProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const endpoint = usePathname().split('/').pop()
  const handlePrint = () => {
    window.print()
  }

  const otherDocs = legalDocuments.filter((doc) => doc.slug !== endpoint)
  const currentDoc = legalDocuments.find((doc) => doc.slug === endpoint)

  return (
    <div className='h-screen bg-background'>
      {/* Header */}
      <header className='absolute w-full top-0 z-40 border-b border-border backdrop-blur-2xl supports-[backdrop-filter]:bg-origin/40'>
        <div className='flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center gap-4'>
            <Link
              href='/legal'
              className='inline-flex items-center justify-center rounded-md p-2 hover:bg-muted'
              aria-label='Back to legal documents'>
              <Icon name='arrow-left' className='h-5 w-5' />
            </Link>

            <div>
              <h1 className='text-xl capitalize font-medium font-figtree text-foreground tracking-tighter'>
                {endpoint?.split('-').join(' ')}
              </h1>
              <p className='text-sm text-muted-foreground'>
                {/*{document.description}*/}
              </p>
            </div>
          </div>

          <Icon name='protap' className='h-8 w-24' />

          <div className='flex items-center space-x-2'>
            <Button
              variant='ghost'
              onClick={handlePrint}
              className='inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium print:hidden'
              aria-label='Print document'>
              <Icon name='printer' className='h-4 w-4' />
              <span className='hidden sm:inline font-figtree opacity-60'>
                Print
              </span>
            </Button>
            <button
              // onClick={() => setIsDrawerOpen(true)}
              className='inline-flex items-center justify-center rounded-md p-2 hover:bg-muted lg:hidden'
              aria-label='Toggle table of contents'>
              <Icon name='text-align-right' className='h-5 w-5' />
            </button>
          </div>
        </div>
      </header>

      <div className='flex'>
        {/* TOC Drawer for mobile */}
        <TocDrawer
          isOpen={isDrawerOpen}
          onOpenChange={setIsDrawerOpen}
          document={currentDoc}
        />

        {/* Main content */}
        <main className='flex-1 mx-auto max-w-[60rem] px-4 sm:px-6 lg:px-8'>
          {children}
        </main>

        <aside className='absolute left-0 hidden w-96 md:h-screen overflow-y-scroll border-r border-border bg-muted/30 p-6 lg:block print:hidden'>
          <SpaceX />
          <div className='sticky top-8 font-figtree'>
            <div className='mb-8 opacity-70'>Resources</div>

            {otherDocs.map((doc) => (
              <Link
                key={doc.slug}
                href={`/legal/${doc.slug}`}
                className='w-fit group flex items-center justify-between bg-background transition-all hover:border-primary-hover hover:bg-muted/60 mb-2 md:mb-3'>
                <div>
                  <p className='font-semibold text-foreground group-hover:text-primary'>
                    {doc.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <SpaceX />
        </aside>

        {/* Desktop TOC Sidebar */}
        <aside className='absolute right-0 hidden w-96 md:h-screen overflow-y-scroll border-l border-border bg-muted/30 lg:block print:hidden p-6'>
          <SpaceX />
          <div className='sticky top-8 font-figtree'>
            <div className='mb-8 opacity-70'>Table of Contents</div>

            <nav className='hidden space-y-3 text-sm'>
              {/*{document.headings.map((heading) => (
                <a
                  key={heading.id}
                  href={`#${heading.id}`}
                  className={`block truncate rounded font-figtree tracking-tight px-2 py-1 text-muted-foreground transition-colors hover:bg-background hover:text-foreground ${
                    heading.level === 2 ? 'font-medium' : 'ml-2'
                  }`}>
                  <span className=''>{heading.text}</span>
                </a>
              ))}*/}
            </nav>
          </div>
          <SpaceX />
        </aside>
      </div>
    </div>
  )
}
