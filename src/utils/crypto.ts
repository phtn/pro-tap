import crypto from 'crypto'

export function secureRef(length: number) {
  const byteLength = Math.ceil(length / 2) // Calculate required bytes
  const randomBytes = crypto.randomBytes(byteLength)
  const randomString = randomBytes.toString('hex').slice(0, length) // Convert to hex and truncate
  return randomString
}

export function moses(str: string) {
  const middleIndex = Math.floor(str.length / 2)
  const firstHalf = str.substring(0, middleIndex)
  const secondHalf = str.substring(middleIndex)
  return firstHalf + '-' + secondHalf
}

export function generateActivationToken(
  subscriptionId: string,
  userId: string,
  channel: 'nfc' | 'qr' | 'online',
) {
  // const expiryDays = channel === 'online' ? 1 : channel === 'qr' ? 30 : 90
  // return jwt.sign(
  //   {
  //     sub: subscriptionId,
  //     uid: userId,
  //     channel,
  //     jti: crypto.randomUUID(),
  //     exp: Math.floor(Date.now() / 1000) + expiryDays * 86400,
  //   },
  //   process.env.ACTIVATION_SECRET!,
  // )
}
