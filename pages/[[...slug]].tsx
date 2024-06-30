import { useEffect } from 'react'
import { useSiteStore } from 'hooks/useSiteStore'
import { useRouter } from 'next/router'
import {
  getHomePage,
  getMaterialCategoryPaths,
  getSettings,
} from 'lib/sanity.client'

import HomePage from 'components/Home/HomePage'

export default function Index({ home, settings, redirect }) {
  const { setHomeData } = useSiteStore()
  const router = useRouter()

  if (redirect) {
    router.push(`/client-tools/${redirect}`)
  }

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

  return {
    props: {
      settings,
      home,
      redirect: slug === 'client-tools' ? materialPaths[0]?.slug : null,
      preview: preview ?? false,
    },
    revalidate: 300,
  }
}
