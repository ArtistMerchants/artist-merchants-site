import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const authCookie = req.cookies.get('auth')

  if (
    req.nextUrl.pathname.startsWith('/archive') &&
    req.nextUrl.pathname !== '/archive' &&
    authCookie?.value !== 'true'
  ) {
    if (authCookie === undefined || authCookie?.value !== 'true') {
      return NextResponse.redirect(new URL('/archive', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/archive/:path*', '/client-tools/:path*'],
}
