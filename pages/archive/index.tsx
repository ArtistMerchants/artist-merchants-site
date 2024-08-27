import { getCategoryAllPage, getSettings } from 'lib/sanity.client'

import { ArchiveListPage } from 'components/Archive/ArchiveListPage'

export default function Archive({ page, settings }) {
  return <ArchiveListPage {...page} settings={settings} />
}

export async function getStaticProps(context) {
  const preview = context.draftMode
  const pageQuery = getCategoryAllPage
  const [settings, page] = await Promise.all([getSettings(), pageQuery()])

  return {
    props: {
      settings,
      page,
      preview: preview ?? false,
    },
    revalidate: 3600,
  }
}
