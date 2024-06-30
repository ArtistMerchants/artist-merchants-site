import { client } from 'lib/sanity.client'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const authCookie = req.cookies.get('auth')
  const settings = await client.fetch(`*[_type == "settings"][0]`)
  const passwords = settings?.passwords

  if (
    req.nextUrl.pathname.startsWith('/archive') &&
    req.nextUrl.pathname !== '/archive' &&
    !passwords?.includes(authCookie?.value)
  ) {
    if (authCookie === undefined || !passwords?.includes(authCookie?.value)) {
      return NextResponse.redirect(new URL('/archive', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/archive/:path*', '/client-tools/:path*'],
}
