import { client } from 'lib/sanity.client'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const unlockedCookie = req.cookies.get('unlocked')
  const settings = await client.fetch(`*[_type == "settings"][0]`)
  const passwords = settings?.passwords

  const isValidPassword = passwords?.includes(unlockedCookie?.value)
  const isHomePage = req.nextUrl.pathname === '/'

  if (!isValidPassword || !unlockedCookie) {
    // Clear the cookie
    const response = NextResponse.redirect(new URL('/', req.url))
    response.cookies.set('unlocked', '', {
      path: '/',
      httpOnly: true,
      maxAge: 0,
    })
    return response
  }

  // If password is valid and it's the home page, redirect to /archive
  if (isValidPassword && isHomePage) {
    return NextResponse.redirect(new URL('/archive', req.url))
  }

  // If password is valid and it's not the home page, set unlocked: true
  if (isValidPassword && !isHomePage) {
    const response = NextResponse.next()
    response.headers.set('x-middleware-unlocked', 'true')
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/archive', '/archive/:path*', '/client-tools'],
}
