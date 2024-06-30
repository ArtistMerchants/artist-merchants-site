import {
  getMaterialCategoryPaths,
  getMaterialCategoryPage,
  getSettings,
} from 'lib/sanity.client'

import { ClientToolsListPage } from 'components/ClientTools/ClientToolsListPage'

export default function ClientToolsDetail({ page, settings, slug }) {
  return <ClientToolsListPage {...page} settings={settings} />
}

export async function getStaticPaths() {
  const paths = await getMaterialCategoryPaths()

  return {
    paths: paths?.map((path) => ({
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

  const pageQuery = getMaterialCategoryPage
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
