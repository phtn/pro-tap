'use client'
import { ErrorComp } from '@/components/error'

export default function ErrorBoundary ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorComp error={error} reset={reset} name='Root' />
}
