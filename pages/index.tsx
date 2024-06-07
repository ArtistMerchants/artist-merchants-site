import { getHomePage, getSettings } from 'lib/sanity.client'

import HomePage from 'components/HomePage'

export default function Index({ preview, home, settings }) {
  return <HomePage {...home} settings={settings} />
}

export async function getStaticProps(context) {
  const preview = context.draftMode
  const [settings, home] = await Promise.all([getSettings(), getHomePage()])

  return {
    props: {
      settings,
      home,
      preview: preview ?? false,
    },
    revalidate: 300,
  }
}
