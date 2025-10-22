import {ElectricBorder} from '@/components/react-bits/electric-border'

interface ElectricCardProps {
  children: React.ReactNode
}

export const ElectricCard = ({children}: ElectricCardProps) => {
  return (
    <ElectricBorder
      color='#fecfdf' //#C8CF8F #Fdf5f5CF #bec6cc #bec4a9
      speed={1}
      chaos={0.5}
      thickness={3.8}
      className='w-full rounded-[18px] scale-84'
      style={{borderRadius: 24}}>
      {children}
    </ElectricBorder>
  )
}
