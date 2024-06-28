import { useEffect } from 'react'
import { useSiteStore } from 'hooks/useSiteStore'
import { getHomePage, getSettings } from 'lib/sanity.client'

import HomePage from 'components/HomePage'

export default function Index({ home, settings }) {
  const { setHomeData } = useSiteStore()

  useEffect(() => {
    setHomeData(home)
  }, [home])

  return <HomePage {...home} settings={settings} />
}

export async function getStaticPaths() {
  const paths = [
    {
      params: {
        slug: [],
      },
    },
    {
      params: {
        slug: ['information'],
      },
    },
    {
      params: {
        slug: ['archive'],
      },
    },
    {
      params: {
        slug: ['client-tools'],
      },
    },
  ]
  return {
    paths,
    fallback: false,
  }
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
