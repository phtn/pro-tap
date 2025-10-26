import type {MetadataRoute} from 'next'
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: 'ph.protap.insurance',
    name: 'ProTap Digital Insurance',
    short_name: 'ProTap',
    start_url: '/',
    display: 'standalone',
    categories: ['insurance', 'social', 'professional', 'club', 'network hub'],
    background_color: '#1C1F2A',
    theme_color: '#090909',
    icons: [
      {
        src: '/p.ico/apple-icon-180x180.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: '/p.ico/ms-icon-310x310.png',
        sizes: '310x310',
        type: 'image/png',
      },
    ],
    protocol_handlers: [
      {
        protocol: 'pro+digital:',
        url: 'https://protap.ph/?bro=12%s',
      },
    ],
  }
}
