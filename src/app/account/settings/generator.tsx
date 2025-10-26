'use client'
import {CardRequest} from '@/app/api/card/generate/route'
import {HyperCard} from '@/components/experimental/card/hyper-card'
import {SexyButton} from '@/components/experimental/sexy-button-variants'
import {HyperList} from '@/components/list'
import {CardContent} from '@/components/ui/card'
import {useAuthCtx} from '@/ctx/auth'
import {useCardGen} from '@/hooks/use-card-gen'
import {Icon} from '@/lib/icons'
import {TokenMetadata} from '@/lib/jwt/tok.types'
import {ReactNode, useCallback, useEffect, useMemo, useState} from 'react'

export const Generator = () => {
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState<TokenMetadata | null>(null)
  const {user} = useAuthCtx()

  const body = useMemo(
    () =>
      ({
        type: 'qr',
        body: {
          series: 'individual',
          group: 'new-algo',
          batch: '0003',
        },
        userId: 'x',
      }) satisfies CardRequest,
    [],
  )

  // const handleBodyCheck = useCallback(() => {
  //   console.log(body)
  // }, [body])

  const {generate} = useCardGen(body)
  const handleGen = useCallback(async () => {
    setLoading(true)
    try {
      const response = await generate()
      if (response.length !== 0) {
        setToken(response[0])
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      console.error('Failed to generate QR code', error)
    }
  }, [generate, user])

  return (
    <main className='size-96 p-4 '>
      <SexyButton
        className=''
        onClick={handleGen}
        rightIcon={loading ? 'spinners-ring' : 'zap-solid'}>
        Generate
      </SexyButton>
      {token && <CardItem token={token} />}
    </main>
  )
}

interface RowItemProps {
  label?: string
  value?: ReactNode
  children?: ReactNode
}

const RowItem = ({label, value, children}: RowItemProps) => (
  <div className='flex items-center justify-between border-b border-dotted dark:border-greyed font-space p-3 text-xs break-all'>
    <div className='text-xs w-full font-medium font-space uppercase text-foreground'>
      {label}
    </div>
    <div className='flex w-fit whitespace-nowrap'>
      {value}
      {children}
    </div>
  </div>
)

interface Props {
  token: TokenMetadata
}

export const CardItem = ({token: card}: Props) => {
  const {token, payload} = card
  const [count, setCount] = useState(1)
  const renderToken = useCallback(
    () => (
      <div className='flex items-center w-full'>
        <span className='whitespace-nowrap tracking-wide w-20'>
          {token.substring(0, 8)}
        </span>
        <Icon name='line-node' className='size-4 rotate-45 mx-4 opacity-60' />
        <span className='whitespace-nowrap tracking-wide w-28 text-right'>
          {token.substring(token.length - 12)}
        </span>
      </div>
    ),
    [token],
  )

  useEffect(() => {
    if (token) {
      console.log(card)
      setCount(count + 1)
    }
  }, [token])

  const rows = [
    {label: 'token', value: renderToken()},
    {label: 'series', value: payload.series},
    {label: 'group', value: payload.group},
  ]

  return (
    <HyperCard className='w-sm rounded-md dark:bg-dysto border-origin dark:border-greyed/40'>
      <CardContent className='space-y-2 p-1'>
        <CardHeader id={payload.sub} count={count} loading={!payload.jti} />
        <HyperList data={rows} component={RowItem} />
      </CardContent>
    </HyperCard>
  )
}

interface CardHeaderProps {
  id: any
  count: number
  loading: boolean
}

const CardHeader = ({id, count, loading}: CardHeaderProps) => {
  return (
    <div className='border-b border-dotted dark:border-greyed h-8 px-1 flex items-center justify-between'>
      {!loading && id ? (
        <div className='flex items-center space-x-3'>
          <span className='font-tek w-7 font-bold text-greyed bg-indigo-50 dark:bg-dark-origin/60 text-center dark:text-catnip rounded-sm'>
            {count}
          </span>
          <label className='text-xs font-space tracking-wider opacity-80'>
            {id}
          </label>
        </div>
      ) : (
        <Icon name='spinners-dots' className='size-3.5' />
      )}
      <Icon
        name='eye'
        className='size-6 dark:text-catnip hover:bg-dark-origin/80 p-1 rounded-md shrink-0'
      />
    </div>
  )
}
