import { useEffect } from 'react'
import { useSiteStore } from 'hooks/useSiteStore'
import {
  getHomePage,
  getMaterialCategoryPaths,
  getSettings,
} from 'lib/sanity.client'

import HomePage from 'components/Home/HomePage'

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
  const materialPaths = await getMaterialCategoryPaths()

  const slug = context.params.slug?.join('/')

  if (slug === 'client-tools') {
    return {
      redirect: {
        destination: `/client-tools/${materialPaths[0].slug}`,
        permanent: false,
      },
    }
  }

  return {
    props: {
      settings,
      home,
      preview: preview ?? false,
    },
    revalidate: 300,
  }
}
