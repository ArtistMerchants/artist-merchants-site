import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const SECRET = process.env.AUTH_SECRET ?? 'change-me-in-env'

async function verifyToken(token: string): Promise<{ clientName: string; password: string } | null> {
  try {
    const decoded = JSON.parse(atob(token))
    const { clientName, password, sig } = decoded
    // Verify HMAC using Web Crypto API (Edge-compatible)
    const encoder = new TextEncoder()
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(SECRET),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    )
    const payload = encoder.encode(JSON.stringify({ clientName, password }))
    const sigBytes = Uint8Array.from(sig.match(/.{1,2}/g).map((b: string) => parseInt(b, 16)))
    const valid = await crypto.subtle.verify('HMAC', key, sigBytes, payload)
    if (!valid) return null
    return { clientName, password }
  } catch {
    return null
  }
}

export async function middleware(req: NextRequest) {
  const unlockedCookie = req.cookies.get('unlocked')
  const verified = unlockedCookie ? await verifyToken(unlockedCookie.value) : null

  const homePaths = ['/', '/info']
  const isHomePage = homePaths.includes(req.nextUrl.pathname)

  if (!verified) {
    const response = NextResponse.redirect(new URL('/', req.url))
    response.cookies.set('unlocked', '', { path: '/', httpOnly: true, maxAge: 0 })
    return response
  }

  if (isHomePage) {
    return NextResponse.redirect(new URL('/archive', req.url))
  }

  // Pass clientName downstream via header for use in page components
  const response = NextResponse.next()
  response.headers.set('x-client-name', verified.clientName)
  response.headers.set('x-middleware-unlocked', 'true')
  return response
}

export const config = {
  matcher: ['/archive', '/archive/:path*', '/client-tools'],
}
