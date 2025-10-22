'use client'

import { marked, Renderer } from 'marked'
import { useEffect, useMemo, useState } from 'react'

interface MarkdownRendererProps {
  content: string
  headings?: Array<{ id: string; text: string; level: number }>
}

export function MarkdownRenderer({
  content,
  headings = [],
}: MarkdownRendererProps) {
  const [html, setHtml] = useState<string>('')

  const rawHtml = useMemo(() => {
    const renderer = new Renderer()
    let headingIndex = 0

    renderer.heading = ({ tokens, depth }: { tokens: unknown[]; depth: number }) => {
      const text = tokens.map((token: unknown) => (token as { text?: string; raw?: string }).text || (token as { text?: string; raw?: string }).raw).join('')
      const level = depth + 1 // marked uses 0-based depth
      const heading = headings[headingIndex]
      const id =
        heading && heading.level === level && heading.text === text
          ? heading.id
          : `heading-${text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')}`
      headingIndex++
      return `<h${level} id="${id}">${text}</h${level}>`
    }

    return marked(content, { renderer })
  }, [content, headings])

  useEffect(() => {
    const sanitizeHtml = async () => {
      if (typeof window !== 'undefined') {
        const DOMPurify = await import('dompurify')
        const sanitized = DOMPurify.default.sanitize(rawHtml as string)
        setHtml(sanitized)
      }
    }
    sanitizeHtml()
  }, [rawHtml])

  return (
    <div
      className='py-8 prose prose-sm dark:prose-invert max-w-none h-screen overflow-scroll pb-64 scroll-smooth'
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
