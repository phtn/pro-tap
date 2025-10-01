import { Masonry } from '@/components/react-bits/masonry'

const items = [
  {
    id: '1',
    img: 'https://picsum.photos/id/1015/600/900?grayscale',
    url: 'https://example.com/one',
    height: 300,
  },
  {
    id: '4',
    img: 'https://picsum.photos/id/1020/600/800?grayscale',
    url: 'https://example.com/three',
    height: 700,
    width: 400,
  },
  {
    id: '2',
    img: 'https://picsum.photos/id/1011/600/750?grayscale',
    url: 'https://example.com/two',
    height: 250,
  },
  {
    id: '3',
    img: 'https://picsum.photos/id/1020/600/800?grayscale',
    url: 'https://example.com/three',
    height: 600,
  },
  {
    id: '5',
    img: 'https://picsum.photos/id/1015/600/900?grayscale',
    url: 'https://example.com/one',
    height: 200,
  },
  // ... more items
]

const WidgetGrid = () => {
  return (
    <Masonry
      items={items}
      ease='power3.out'
      duration={0.6}
      stagger={0.05}
      animateFrom='bottom'
      scaleOnHover
      hoverScale={0.95}
      blurToFocus={false}
      colorShiftOnHover={false}
    />
  )
}

export default WidgetGrid
