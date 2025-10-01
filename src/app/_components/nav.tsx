import { LogoPro } from '@/components/logo'

export const Nav = () => (
  <div className='hidden h-12 lg:flex items-center'>
    <div className='flex text-slate-500 w-full space-x-2 font-space items-center'>
      {/* <LogoImage /> */}

      {/* <div className="flex items-center justify-center">
      <div className="h-9 w-10 text-slate-600 whitespace-nowrap space-y-[1px] font-medium tracking-tight">
          <div className="h-3 text-xs flex items-center">Web</div>
          <div className="h-3 text-xs flex items-center">Research &</div>
          <div className="h-3 text-xs flex items-center">Development</div>
        </div>
      </div> */}
      <LogoPro />
    </div>
  </div>
)
