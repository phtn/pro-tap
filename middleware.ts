import { NextRequest, NextResponse } from 'next/server'
import { getCookie } from './src/app/actions'

const protectedRoutes = [
  '/account',
  '/admin',
]

const authRoutes = [
  '/sign',
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for static files, API routes, and Next.js internals
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.includes('.') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/manifest') ||
    pathname.startsWith('/robots.txt') ||
    pathname.startsWith('/sitemap')
  ) {
    return NextResponse.next()
  }

  try {
    // Check for cached user profile
    const userProfile = await getCookie('protapUserProfile')

    // Check for scan result cookie
    const scanResult = await getCookie('protapScanResult')

    const isAuthenticated = !!userProfile
    const hasScanResult = !!scanResult

    // Handle protected routes
    if (protectedRoutes.some(route => pathname.startsWith(route))) {
      if (!isAuthenticated) {
        // Redirect unauthenticated users to sign-in
        const signInUrl = new URL('/sign', request.url)
        signInUrl.searchParams.set('redirect', pathname)
        return NextResponse.redirect(signInUrl)
      }
    }

    // Handle auth routes (sign-in page)
    if (authRoutes.some(route => pathname.startsWith(route))) {
      if (isAuthenticated) {
        // Redirect authenticated users away from sign-in
        if (hasScanResult) {
          // If there's a scan result, redirect to account/add-service
          return NextResponse.redirect(new URL('/account/add-service', request.url))
        } else {
          // Otherwise, redirect to account profile
          return NextResponse.redirect(new URL('/account/profile', request.url))
        }
      }
    }

    // Handle scan result redirects
    if (pathname === '/' && hasScanResult && !isAuthenticated) {
      // If user has scan result but isn't authenticated, redirect to sign-in
      const signInUrl = new URL('/sign', request.url)
      return NextResponse.redirect(signInUrl)
    }

    // Handle post-authentication redirects
    if (pathname === '/sign' && isAuthenticated) {
      if (hasScanResult) {
        // Clear scan result cookie after redirect
        const response = NextResponse.redirect(new URL('/account/add-service', request.url))
        response.cookies.delete('protapScanResult')
        return response
      } else {
        return NextResponse.redirect(new URL('/account/profile', request.url))
      }
    }

    return NextResponse.next()
  } catch (error) {
    console.error('Middleware error:', error)
    // On error, allow the request to continue
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}