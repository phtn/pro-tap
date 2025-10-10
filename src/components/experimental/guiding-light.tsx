import {Prism} from '../react-bits/prism'

export const GuidingLight = () => {
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
