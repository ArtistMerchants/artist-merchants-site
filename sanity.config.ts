import { visionTool } from '@sanity/vision'
import { apiVersion, dataset, projectId } from 'lib/sanity.api'
import { structurePlugin, structureConfig } from 'plugins/structure'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import settingsType from 'schemas/settings'
import homePageType from 'schemas/pages/homePage'

const title =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || 'Nextjs + Sanity Starter'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title,
  schema: {
    types: [settingsType, homePageType],
  },
  plugins: [
    structurePlugin({ type: [settingsType.name, homePageType.name] }),
    structureTool({
      structure: structureConfig([settingsType, homePageType]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
