import {RouteItem} from './_components/card-list'

const tools: RouteItem[] = [
  {
    name: 'nfc',
    label: 'Scan NFC Cards',
    href: '/admin/nfc',
    icon: 'nfc',
    type: 'product',
    color:
      'bg-origin/40 dark:bg-dark-origin/40 group-hover:bg-origin/80 dark:group-hover:bg-dark-origin/80',
    description: 'Scan NFC Cards to add to your products',
  },
  {
    name: 'qrcode',
    label: 'Generate QR Codes',
    href: '/admin/qrcode',
    icon: 'qr-code-bold',
    type: 'product',
    color:
      'bg-origin/40 dark:bg-dark-origin/40 group-hover:bg-origin/80 dark:group-hover:bg-dark-origin/80',
    description: 'Generate QR Codes / Add Product Items',
  },
]

const dataList: RouteItem[] = [
  {
    name: 'products-table',
    label: 'Products',
    href: '/admin/data',
    icon: 'bullet-list-square',
    type: 'data',
    color:
      'bg-dark-origin dark:bg-dark-origin/40 group-hover:bg-origin/80 dark:group-hover:bg-dark-origin/80',
    description: 'View and manage all products in a table',
  },
]

const utils: RouteItem[] = [
  {
    name: 'scan-check',
    label: 'Scan Check',
    href: '/admin/utils',
    icon: 'code-square',
    type: 'monitor',
    color:
      'bg-origin/40 dark:bg-dark-origin/40 group-hover:bg-origin/80 dark:group-hover:bg-dark-origin/80',
    description: 'View and manage all products in a table',
  },
]

export {dataList, tools, utils}
