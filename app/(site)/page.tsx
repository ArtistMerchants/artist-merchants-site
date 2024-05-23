import HomePage from 'components/HomePage'
import { getHomePage, getSettings } from 'lib/sanity.client'

export default async function Home() {
  const [settings, home] = await Promise.all([getSettings(), getHomePage()])

  return <HomePage {...home} settings={settings} />
}

// FIXME: remove the `revalidate` export below once you've followed the instructions in `/pages/api/revalidate.ts`
export const revalidate = 1
