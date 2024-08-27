import { useClientToolsStore } from 'hooks/useClientToolsStore'
import { getMaterialPage, getSettings } from 'lib/sanity.client'

import { ClientToolsListPage } from 'components/ClientTools/ClientToolsListPage'
import { useEffect } from 'react'

export default function ClientToolsDetail({ page, settings }) {
  const { setActiveMaterial } = useClientToolsStore()

  useEffect(() => {
    setActiveMaterial(page?.materials[0]?.slug)
  }, [])

  return <ClientToolsListPage {...page} settings={settings} />
}

export async function getStaticProps(context) {
  const preview = context.draftMode

  const [settings, page] = await Promise.all([getSettings(), getMaterialPage()])

  return {
    props: {
      settings,
      page,
      preview: preview ?? false,
    },
    revalidate: 3600,
  }
}
