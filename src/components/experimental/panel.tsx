import {AnimatePresence, motion} from 'motion/react'
import {
  FloatingPanelBody,
  FloatingPanelCloseButton,
  FloatingPanelContent,
  FloatingPanelFooter,
  FloatingPanelRoot,
  FloatingPanelTrigger,
} from '../ui/floating-panel'

export const ColorPickerFloatingPanel = () => {
  const colors = [
    '#FF5733',
    '#33FF57',
    '#3357FF',
    '#FF33F1',
    '#33FFF1',
    '#F1FF33',
  ]
  return (
    <FloatingPanelRoot>
      <FloatingPanelTrigger
        title='Choose Color'
        className='flex items-center space-x-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors'>
        <span>Choose Color</span>
      </FloatingPanelTrigger>
      <FloatingPanelContent className='w-64'>
        <FloatingPanelBody>
          <div className='grid grid-cols-3 gap-2'>
            <AnimatePresence>
              {colors.map((color) => (
                <motion.button
                  key={color}
                  className='w-12 h-12 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
                  style={{backgroundColor: color}}
                  onClick={() => console.log(`Selected color: ${color}`)}
                  whileHover={{scale: 1.1}}
                  whileTap={{scale: 0.9}}
                  initial={{opacity: 0, scale: 0.8}}
                  animate={{opacity: 1, scale: 1}}
                  exit={{opacity: 0, scale: 0.8}}
                  transition={{duration: 0.2}}
                />
              ))}
            </AnimatePresence>
          </div>
        </FloatingPanelBody>
        <FloatingPanelFooter>
          <FloatingPanelCloseButton />
        </FloatingPanelFooter>
      </FloatingPanelContent>
    </FloatingPanelRoot>
  )
}
