import { client } from 'lib/sanity.client'
import { serialize } from 'cookie'

const SECRET = process.env.AUTH_SECRET ?? 'change-me-in-env'

async function signToken(clientName: string, password: string): Promise<string> {
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const payload = JSON.stringify({ clientName, password })
  const sigBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(payload))
  const sig = Array.from(new Uint8Array(sigBuffer)).map(b => b.toString(16).padStart(2, '0')).join('')
  return btoa(JSON.stringify({ clientName, password, sig }))
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { password } = req.body
  if (!password) {
    return res.status(400).json({ message: 'Password is required' })
  }

  const settings = await client.fetch(`*[_type == "settings"][0]{ passwords }`)
  const passwords: { clientName: string; password: string }[] = settings?.passwords ?? []

  if (!passwords.length) {
    return res.status(400).json({ message: 'Something went wrong, please refresh and try again.' })
  }

  const match = passwords.find((p) => p.password === password)

  if (match) {
    const token = await signToken(match.clientName, match.password)
    // Secure httpOnly cookie for auth verification in middleware
    const authCookie = serialize('unlocked', token, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3600 * 24,
    })
    // Non-httpOnly cookie so PostHog on the client can read clientName
    const clientCookie = serialize('client_name', match.clientName, {
      path: '/',
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3600 * 24,
    })
    res.setHeader('Set-Cookie', [authCookie, clientCookie])
    return res.status(200).json({ message: 'Password is correct', clientName: match.clientName })
  } else {
    return res.status(401).json({ message: 'Password is incorrect' })
  }
}
