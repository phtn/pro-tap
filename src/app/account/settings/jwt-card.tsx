'use client'

import {HyperCard} from '@/components/experimental/card/hyper-card'
import {Button} from '@/components/ui/button'
import {CardContent} from '@/components/ui/card'
import {Icon} from '@/lib/icons'
import {ActivationTokenPayload} from '@/lib/jwt/tok.types'
import {ReactNode, useCallback, useState} from 'react'

interface Props {
  id: string | null
  token: string
  payload: ActivationTokenPayload
  signature?: string
}
export function JWTCard({id, token, payload, signature}: Props) {
  const [copiedSection, setCopiedSection] = useState<string | null>(null)
  const header = {alg: payload.alg, typ: payload.typ}

  // Parse JWT if token is provided
  const parseJWT = (jwtToken: string) => {
    try {
      const parts = jwtToken.split('.')
      if (parts.length !== 3) return null

      const headerDecoded = JSON.parse(atob(parts[0]))
      const payloadDecoded = JSON.parse(atob(parts[1]))
      const signatureDecoded = parts[2]

      return {
        header: headerDecoded,
        payload: payloadDecoded,
        signature: signatureDecoded,
        raw: {
          header: parts[0],
          payload: parts[1],
          signature: parts[2],
        },
      }
    } catch {
      return null
    }
  }

  const parsed = token ? parseJWT(token) : null
  const displayHeader = header ?? parsed?.header
  const displayPayload = payload ?? parsed?.payload
  const displaySignature = signature ?? parsed?.signature ?? ''

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text)
    setCopiedSection(section)
    setTimeout(() => setCopiedSection(null), 2000)
  }

  const formatJSON = (obj: any) => {
    return JSON.stringify(obj, null, 2)
  }

  const renderPayloadData = (obj: any) => {
    return (
      <div className='flex items-center space-x-1 overflow-x-scroll gap-y-1'>
        {Object.entries(obj).map(([key, value]) => (
          <div
            key={key}
            className='flex flex-col w-fit px-1.5 py-1 rounded-md items-start justify-between'>
            <span className='text-xs font-space uppercase min-w-fit'>
              {key}
            </span>
            <span className='hidden text-foreground font-semibold break-words text-right'>
              {typeof value === 'object'
                ? JSON.stringify(value)
                : String(value)}
            </span>
          </div>
        ))}
      </div>
    )
  }

  const renderFriendlyData = (obj: any) => {
    return (
      <div className='flex items-center space-x-2'>
        {Object.entries(obj).map(([key, value]) => (
          <div
            key={key}
            className='flex flex-col w-fit px-2 py-0.5 border-[0.33px] border-origin rounded-md items-start justify-between'>
            <span className='text-xs font-doto tracking-widest uppercase min-w-fit'>
              {key}
            </span>
            <span className='text-foreground font-space break-words'>
              {typeof value === 'object'
                ? JSON.stringify(value)
                : String(value)}
            </span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <HyperCard className='w-full max-w-2xl'>
      <CardContent className='space-y-2 p-1'>
        <div className='border-b px-2'>
          {id ? (
            <label className='text-xs font-space tracking-wider'>{id}</label>
          ) : (
            <Icon name='spinners-dots' className='size-3.5' />
          )}
        </div>
        <div className=''>
          <div className='flex items-center justify-between px-2'>
            <label className='text-sm uppercase tracking-widest font-space text-sky-600 dark:text-sky-400'>
              Token
            </label>
            <Button
              variant='ghost'
              size='sq'
              onClick={() => copyToClipboard(token, 'token')}>
              {copiedSection === 'token' ? (
                <Icon name='check' className='size-3.5' />
              ) : (
                <Icon name='shape-subtract' className='size-4 opacity-70' />
              )}
            </Button>
          </div>
          <div className='flex items-center justify-between font-space p-3 text-sm break-all text-muted-foreground'>
            <span className=''>{token.substring(0, 12)}</span>
            <Icon name='line-node' className='size-4 text-primary rotate-45' />
            <span className='text-xs'>
              {token.substring(token.length / 2, token.length / 2 + 8)}
            </span>
            <Icon name='line-node' className='size-4 text-primary rotate-45' />
            <span>{token.substring(token.length - 12)}</span>
          </div>
        </div>

        {/* Header Section */}
        {displayHeader && (
          <div className='border-b'>
            <div className='px-2 flex items-center justify-between'>
              <label className='text-sm uppercase tracking-widest font-space text-pink-600 dark:text-pink-400'>
                Header
              </label>
              <Button
                size='sq'
                variant='ghost'
                className='hidden'
                onClick={() =>
                  copyToClipboard(formatJSON(displayHeader), 'header')
                }>
                {copiedSection === 'header' ? (
                  <Icon name='check' className='size-3.5 text-teal-500' />
                ) : (
                  <Icon name='shape-subtract' className='size-4' />
                )}
              </Button>
            </div>
            <div className='p-1'>{renderFriendlyData(displayHeader)}</div>
          </div>
        )}

        {/* Payload Section */}
        {displayPayload && (
          <div className=''>
            <div className='px-2 flex items-center justify-between'>
              <label className='text-sm uppercase tracking-widest font-space text-indigo-600 dark:text-indigo-400'>
                Payload
              </label>
              <Button
                size='sq'
                variant='ghost'
                className='opacity-80'
                onClick={() =>
                  copyToClipboard(formatJSON(displayPayload), 'payload')
                }>
                {copiedSection === 'payload' ? (
                  <Icon name='check' className='size-3.5' />
                ) : (
                  <Icon name='shape-subtract' className='size-4' />
                )}
              </Button>
            </div>
            <div className='p-1'>{renderPayloadData(displayPayload)}</div>
          </div>
        )}

        {/* Signature Section */}
        {displaySignature && (
          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <label className='text-sm font-medium text-purple-600 dark:text-purple-400'>
                Signature
              </label>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => copyToClipboard(displaySignature, 'signature')}>
                {copiedSection === 'signature' ? (
                  <Icon name='check' className='h-4 w-4' />
                ) : (
                  <Icon name='shape-subtract' className='h-4 w-4' />
                )}
              </Button>
            </div>
            <div className='bg-muted p-1 rounded-md font-mono text-xs break-all text-muted-foreground'>
              {displaySignature}
            </div>
          </div>
        )}
      </CardContent>
    </HyperCard>
  )
}
interface RowItemProps {
  label?: string
  value?: ReactNode
  children?: ReactNode
}

const RowItem = ({label, value, children}: RowItemProps) => (
  <div className='flex items-center justify-between font-space p-3 text-xs break-all'>
    <div className='text-xs w-full font-medium font-space uppercase text-foreground'>
      {label}
    </div>
    {value}
    {children}
  </div>
)
export const NewCard = ({id, token}: Props) => {
  const renderToken = useCallback(
    () => (
      <div className='flex items-center'>
        <span className='whitespace-nowrap tracking-wide'>
          {token.substring(0, 12)}
        </span>
        <Icon name='line-node' className='size-4 rotate-45 mx-4 opacity-60' />
        <span className='whitespace-nowrap tracking-wide'>
          {token.substring(token.length - 12)}
        </span>
      </div>
    ),
    [],
  )
  return (
    <HyperCard className='w-full max-w-2xl rounded-md dark:bg-dysto border-origin dark:border-greyed/40'>
      <CardContent className='space-y-2 p-1'>
        <div className='border-b border-dotted dark:border-greyed h-8 ps-2 pe-3 flex items-center justify-between'>
          {id ? (
            <label className='text-xs font-space tracking-wider opacity-80'>
              {id}
            </label>
          ) : (
            <Icon name='spinners-dots' className='size-3.5' />
          )}
          <Icon name='eye' className='size-4' />
        </div>
        <div className=''>
          <RowItem label='token' value={renderToken()} />
        </div>
        <div></div>
      </CardContent>
    </HyperCard>
  )
}
