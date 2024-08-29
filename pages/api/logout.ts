import { serialize } from 'cookie'

export default async function handler(req, res) {
  res.setHeader(
    'Set-Cookie',
    serialize('unlocked', '', {
      path: '/',
      httpOnly: true,
      maxAge: 0,
      expires: new Date(0),
    })
  )

  res.status(200).json({ message: 'Logged out successfully' })
}
