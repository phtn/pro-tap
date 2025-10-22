import {legalDocuments} from '@/legal/documents'
import {Metadata} from 'next'
import {notFound} from 'next/navigation'
import {LegalDocumentPage} from '../_components/document-page'

export async function generateStaticParams() {
  return legalDocuments.map((doc) => ({
    slug: doc.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: {slug: string}
}): Promise<Metadata> {
  const {slug} = params
  const doc = legalDocuments.find((d) => d.slug === slug)

  if (!doc) {
    return {}
  }

  return {
    title: doc.title,
    description: doc.description,
  }
}

interface PageProps {
  params: Promise<{slug: string}>
}

export default async function Page({params}: PageProps) {
  const {slug} = await params
  const doc = legalDocuments.find((d) => d.slug === slug)

  if (!doc) {
    notFound()
  }

  return <LegalDocumentPage document={doc} />
}
