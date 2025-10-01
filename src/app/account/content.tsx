'use client'

import { Prism } from '@/components/react-bits/prism'
import { useState } from 'react'
import { StatusBar } from './_components/statusbar'
import WidgetGrid from './_components/widget-grid'

export const Content = () => {
  const [progress] = useState(0.0)

  // const protap_status = useMemo(
  //   () => ({
  //     label: "Activation",
  //     value: progress,
  //     color: "#A3F900",
  //     size: 44,
  //     current: 0,
  //     target: 75,
  //     unit: "%",
  //   }),
  //   [progress],
  // );

  // const incVal = useCallback(() => {
  //   setProgress((prev) => prev + 33);
  // }, []);

  return (
    <div className='h-[86lvh]  w-full flex flex-col items-center'>
      <GuidingLight />
      <StatusBar progressOne={progress} progressTwo={0} />

      <div className='pt-6 size-full border'>
        <WidgetGrid />

        {/* <SexyButton onClick={incVal}>Bang that ass</SexyButton> */}
      </div>
    </div>
  )
}

const GuidingLight = () => {
  return (
    <div className='absolute bg-zinc-600/80 opacity-20 backdrop-blur-sm bottom-0 size-full overflow-hidden pointer-events-none'>
      <Prism
        animationType='3drotate'
        timeScale={0.005}
        height={3.5}
        baseWidth={5.5}
        scale={3.6}
        hueShift={0}
        colorFrequency={0.95}
        noise={0.05}
        glow={1}
      />
    </div>
  )
}
