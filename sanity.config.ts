import { visionTool } from '@sanity/vision'
import { apiVersion, dataset, projectId } from 'lib/sanity.api'
import { structurePlugin, structureConfig } from 'plugins/structure'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import settings from 'schemas/settings'
import homePage from 'schemas/pages/homePage'
import informationPage from 'schemas/pages/informationPage'
import project from 'schemas/pages/project'
import projectCategory from 'schemas/pages/projectCategory'

const title =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || 'Nextjs + Sanity Starter'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title,
  schema: {
    types: [settings, homePage, project, projectCategory, informationPage],
  },
  plugins: [
    structurePlugin({
      type: [settings.name, homePage.name, informationPage.name],
    }),
    structureTool({
      structure: structureConfig([settings, homePage, informationPage]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
