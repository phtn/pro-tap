import os from 'os'

export function getServerIp () {
  const interfaces = os.networkInterfaces()
  for (const name of Object.keys(interfaces)) {
    if (name && interfaces[name]) {
      for (const i of interfaces[name]) {
        if (i.family === 'IPv4' && !i.internal) {
          return i.address // first non-internal IPv4
        }
      }
    }
  }
  return '127.0.0.1' // fallback
}
