import { useEffect } from 'react'
import { useSiteStore } from 'hooks/useSiteStore'
import { getHomePage, getSettings } from 'lib/sanity.client'

import HomePage from 'components/Home/HomePage'

export default function Index({ home, settings, preview }) {
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
        slug: [''],
      },
    },
    {
      params: {
        slug: ['login'],
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
    revalidate: 3600,
  }
}
