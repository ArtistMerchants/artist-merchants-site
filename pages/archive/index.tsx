import { useEffect } from 'react'
import { getCategoryAllPage, getSettings } from 'lib/sanity.client'
import { ArchiveListPage } from 'components/Archive/ArchiveListPage'
import { posthog } from 'lib/posthog'

export default function Archive({ page, settings }) {
  useEffect(() => {
    const clientName = document.cookie.match(/(?:^|;\s*)client_name=([^;]*)/)?.[1]
    posthog.capture('$pageview', {
      $current_url: window.location.href,
      client: clientName ? decodeURIComponent(clientName) : 'unknown',
    })
  }, [])

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
