import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createHmac } from 'crypto'

const SECRET = process.env.AUTH_SECRET ?? 'change-me-in-env'

function verifyToken(token: string): { clientName: string; password: string } | null {
  try {
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString('utf8'))
    const { clientName, password, sig } = decoded
    const expectedSig = createHmac('sha256', SECRET)
      .update(JSON.stringify({ clientName, password }))
      .digest('hex')
    if (sig !== expectedSig) return null
    return { clientName, password }
  } catch {
    return null
  }
}

export async function middleware(req: NextRequest) {
  const unlockedCookie = req.cookies.get('unlocked')
  const verified = unlockedCookie ? verifyToken(unlockedCookie.value) : null

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
