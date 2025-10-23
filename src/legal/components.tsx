interface Props {
  title: string
  effectiveDate: string
  lastUpdated: string
}

export const TitleHeader = ({title, effectiveDate, lastUpdated}: Props) => (
  <div className='flex items-center justify-between w-full h-36'>
    <h1 className='text-4xl capitalize font-bold font-figtree text-foreground tracking-tighter'>
      {title}
    </h1>
    <div className='text-right text-sm'>
      <div className=''>Effective Date: {effectiveDate}</div>
      <div className=''>Last Updated: {lastUpdated}</div>
    </div>
  </div>
)
