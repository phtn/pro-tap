import {ElectricBorder} from '@/components/react-bits/electric-border'

interface ElectricCardProps {
  children: React.ReactNode
}

export const ElectricCard = ({children}: ElectricCardProps) => {
  return (
    <ElectricBorder
      color='#bec6cf' //#C8CF8F #Fdf5f5CF #bec6cc #bec4a9
      speed={0.5}
      chaos={0.4}
      thickness={3.6}
      className='w-full rounded-[18px] scale-105'
      style={{borderRadius: 24}}>
      {children}
    </ElectricBorder>
  )
}
