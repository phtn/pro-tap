export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')

  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  if (realIp) {
    return realIp
  }

  return 'unknown'
}

export function getUserAgent(request: Request): string {
  return request.headers.get('user-agent') ?? 'unknown'
}

// export async function validateActivationToken(
//   token: string,
// ): Promise<ValidationResult> {
// 1. Decode & verify signature
// const decoded = jwt.verify(token, secret) as ActivationToken

// 2. Check replay (Redis for speed)
// const isUsed = await redis.get(`activation:${decoded.jti}`)
// if (isUsed) throw new Error('Token already used')

// 3. Check subscription state
// const sub = await db.subscriptions.findUnique({where: {id: decoded.sub}})
// if (sub.state === 'activated') throw new Error('Already activated')

// return {valid: true, decoded, subscription: sub}
// }

export async function activateSubscription(token: string): Promise<void> {
  // const { decoded, subscription } = await validateActivationToken(token);
  // await db.$transaction([
  //   // Mark token as used (replay prevention)
  //   redis.setex(`activation:${decoded.jti}`, 86400 * 365, '1'),
  //   // Update subscription
  //   db.subscriptions.update({
  //     where: { id: decoded.sub },
  //     data: {
  //       state: 'activated',
  //       activatedAt: new Date(),
  //       activationChannel: decoded.channel,
  //       activationTokenJti: decoded.jti
  //     }
  //   }),
  //   // Log event
  //   db.activationLogs.create({
  //     data: {
  //       subscriptionId: decoded.sub,
  //       channel: decoded.channel,
  //       tokenJti: decoded.jti,
  //       ipAddress: req.ip
  //     }
  //   })
  // ]);
}
