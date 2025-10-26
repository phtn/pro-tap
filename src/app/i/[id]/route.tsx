// // app/c/[cardId]/route.ts
// import {CardService} from '@/lib/services/card.service'
// import {getClientIp, getUserAgent} from '@/lib/utils/validation'
// import {NextRequest, NextResponse} from 'next/server'

// export async function GET(
//   request: NextRequest,
//   {params}: {params: Promise<{cardId: string}>},
// ): Promise<NextResponse> {
//   const {cardId} = await params

//   try {
//     // Fetch card with all relations
//     const card = await CardService.getCardWithRelations(cardId)

//     // Card not found
//     if (!card) {
//       return NextResponse.redirect(new URL('/404?type=card', request.url), {
//         status: 404,
//       })
//     }

//     // Extract request metadata
//     const ipAddress = getClientIp(request)
//     const userAgent = getUserAgent(request)

//     // Log scan asynchronously (non-blocking)
//     CardService.logScan({
//       cardId: card.id,
//       scannedAt: new Date(),
//       ipAddress,
//       userAgent,
//       country: null, // You can add geo-IP lookup here
//       city: null,
//       resolvedTo: 'profile', // Will be updated based on actual route
//       profileUsername: null,
//     }).catch((error) => {
//       console.error('Failed to log card scan:', error)
//     })

//     // Route based on card state
//     switch (card.state) {
//       case 'pending': {
//         // Not activated yet - redirect to activation flow
//         const activateUrl = new URL('/activate', request.url)
//         activateUrl.searchParams.set('token', card.activationToken ?? '')
//         activateUrl.searchParams.set('card', cardId)
//         activateUrl.searchParams.set('ref', 'card-scan')

//         // Update scan log
//         await CardService.logScan({
//           cardId: card.id,
//           scannedAt: new Date(),
//           ipAddress,
//           userAgent,
//           country: null,
//           city: null,
//           resolvedTo: 'activation',
//           profileUsername: null,
//         }).catch(console.error)

//         return NextResponse.redirect(activateUrl, {status: 302})
//       }

//       case 'activated': {
//         // Check if subscription is still active
//         if (!CardService.isSubscriptionActive(card.user.subscription)) {
//           // Auto-update card state
//           await CardService.updateCardState(cardId, 'expired')

//           const renewUrl = new URL('/renew', request.url)
//           renewUrl.searchParams.set('card', cardId)
//           renewUrl.searchParams.set('reason', 'subscription-expired')

//           return NextResponse.redirect(renewUrl, {status: 302})
//         }

//         // Check if profile exists
//         const profile = card.user.profile
//         if (!profile || !profile.username) {
//           // Edge case: activated but no profile
//           const setupUrl = new URL('/setup-profile', request.url)
//           setupUrl.searchParams.set('card', cardId)

//           return NextResponse.redirect(setupUrl, {status: 302})
//         }

//         // ✨ THE MAGIC 301 REDIRECT ✨
//         // Redirect to vanity profile URL
//         const profileUrl = new URL(`/u/${profile.username}`, request.url)
//         profileUrl.searchParams.set('ref', 'card')

//         // Update scan log with profile info
//         await CardService.logScan({
//           cardId: card.id,
//           scannedAt: new Date(),
//           ipAddress,
//           userAgent,
//           country: null,
//           city: null,
//           resolvedTo: 'profile',
//           profileUsername: profile.username,
//         }).catch(console.error)

//         // 301 = Permanent Redirect
//         // This tells browsers and search engines that /c/abc123
//         // permanently points to /u/amanda
//         return NextResponse.redirect(profileUrl, {status: 301})
//       }

//       case 'expired': {
//         const renewUrl = new URL('/renew', request.url)
//         renewUrl.searchParams.set('card', cardId)
//         renewUrl.searchParams.set('reason', 'expired')

//         await CardService.logScan({
//           cardId: card.id,
//           scannedAt: new Date(),
//           ipAddress,
//           userAgent,
//           country: null,
//           city: null,
//           resolvedTo: 'renewal',
//           profileUsername: null,
//         }).catch(console.error)

//         return NextResponse.redirect(renewUrl, {status: 302})
//       }

//       case 'suspended': {
//         const suspendedUrl = new URL('/suspended', request.url)
//         suspendedUrl.searchParams.set('card', cardId)

//         await CardService.logScan({
//           cardId: card.id,
//           scannedAt: new Date(),
//           ipAddress,
//           userAgent,
//           country: null,
//           city: null,
//           resolvedTo: 'error',
//           profileUsername: null,
//         }).catch(console.error)

//         return NextResponse.redirect(suspendedUrl, {status: 302})
//       }

//       case 'revoked': {
//         const revokedUrl = new URL('/revoked', request.url)
//         revokedUrl.searchParams.set('card', cardId)

//         await CardService.logScan({
//           cardId: card.id,
//           scannedAt: new Date(),
//           ipAddress,
//           userAgent,
//           country: null,
//           city: null,
//           resolvedTo: 'error',
//           profileUsername: null,
//         }).catch(console.error)

//         return NextResponse.redirect(revokedUrl, {status: 302})
//       }

//       default: {
//         // Invalid state
//         const errorUrl = new URL('/error', request.url)
//         errorUrl.searchParams.set('message', 'Invalid card state')

//         return NextResponse.redirect(errorUrl, {status: 500})
//       }
//     }
//   } catch (error) {
//     console.error('Card scan error:', error)

//     const errorUrl = new URL('/error', request.url)
//     errorUrl.searchParams.set(
//       'message',
//       'An error occurred processing your card',
//     )

//     return NextResponse.redirect(errorUrl, {status: 500})
//   }
// }
