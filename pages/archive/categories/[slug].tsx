import {
  getCategoryPaths,
  getCategoryAllPage,
  getCategoryPage,
  getSettings,
} from 'lib/sanity.client'
import { cookies } from 'next/headers'

import { ArchiveListPage } from 'components/Archive/ArchiveListPage'

export default function CategoryDetail({ page, settings }) {
  return <ArchiveListPage {...page} settings={settings} />
}

export async function getStaticPaths() {
  const categoryPaths = await getCategoryPaths()
  const pathsWithAll = [...categoryPaths, { slug: 'all' }]

  return {
    paths: pathsWithAll?.map((path) => ({
      params: {
        slug: path.slug,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const preview = context.draftMode
  const slug = context.params.slug
  const pageQuery = slug?.includes('all') ? getCategoryAllPage : getCategoryPage
  const [settings, page] = await Promise.all([getSettings(), pageQuery(slug)])

  return {
    props: {
      settings,
      page,
      preview: preview ?? false,
    },
    revalidate: 300,
  }
}
