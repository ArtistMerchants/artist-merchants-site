import { client } from 'lib/sanity.client'
import { serialize } from 'cookie'

export default async function handler(req, res) {
  const { password } = req.query
  if (!password) {
    return res.status(400).json({ message: 'Password is required' })
  }

  const settings = await client.fetch(`*[_type == "settings"][0]`)
  const passwords = settings?.passwords

  if (!passwords) {
    return res
      .status(400)
      .json({ message: 'Something went wrong, please refresh and try again.' })
  }

  if (settings.passwords.includes(password)) {
    res.setHeader(
      'Set-Cookie',
      serialize('auth', 'true', { path: '/', httpOnly: true })
    )
    res.status(200).json({ message: 'Password is correct' })
  } else {
    res.status(401).json({ message: 'Password is incorrect' })
  }
}
