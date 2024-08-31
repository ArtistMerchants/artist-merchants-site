import { ArrowRightIcon } from '@sanity/icons'
import { Flex, Button } from '@sanity/ui'
import { visionTool } from '@sanity/vision'
import { apiVersion, dataset, projectId } from './lib/sanity.api'
import { structurePlugin, structureConfig } from './plugins/structure'
import { StudioIcon } from './components/Sanity/StudioIcon'
import { defineConfig, isDev } from 'sanity'
import { structureTool } from 'sanity/structure'
import settings from './schemas/settings'
import homePage from './schemas/pages/homePage'
import project from './schemas/pages/project'

import projectCategory from './schemas/pages/projectCategory'
import materialCategory from './schemas/pages/materialCategory'

const title = 'Artist Merchants'

const MyCustomTool = (props) => {
  const { renderDefault } = props
  return (
    <Flex align="center" gap={2}>
      {renderDefault(props)}
      <Button
        as="a"
        href="https://artist-merchants.vercel.app/"
        target="_blank"
        text="View Staging Site"
        iconRight={ArrowRightIcon}
        mode="bleed"
        selected={true}
        radius={2}
        fontSize={1}
        padding={2}
        space={3}
      ></Button>
    </Flex>
  )
}

export default defineConfig({
  projectId,
  dataset,
  basePath: '/studio',
  title,
  icon: StudioIcon,
  studio: {
    components: {
      toolMenu: MyCustomTool,
    },
  },
  schema: {
    types: [settings, homePage, project, projectCategory, materialCategory],
  },
  plugins: [
    structurePlugin({
      type: [settings.name, homePage.name],
    }),
    structureTool({
      structure: structureConfig([settings, homePage]),
    }),
    ...(isDev ? [visionTool({ defaultApiVersion: apiVersion })] : []),
  ],
})
