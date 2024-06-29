import { getProjectPaths, getProjectPage, getSettings } from 'lib/sanity.client'

import { ProjectPage } from 'components/Projects/ProjectPage'

export default function ProjectDetail({ page, settings }) {
  return <ProjectPage {...page} settings={settings} />
}

export async function getStaticPaths() {
  const projectPaths = await getProjectPaths()

  return {
    paths: projectPaths?.map((path) => ({
      params: {
        slug: path.slug,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const preview = context.draftMode
  const [settings, page] = await Promise.all([
    getSettings(),
    getProjectPage(context.params.slug),
  ])

  return {
    props: {
      settings,
      page,
      preview: preview ?? false,
    },
    revalidate: 300,
  }
}
