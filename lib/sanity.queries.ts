import { groq } from 'next-sanity'

const imageFields = `
...,
"palette":  asset->metadata.palette,
"metadata": asset->metadata,
"lqip": asset->metadata.lqip,
"width": asset->metadata.dimensions.width,
"height": asset->metadata.dimensions.height,
"aspect": asset->metadata.dimensions.aspectRatio,
`

export const settingsQuery = groq`*[_type == "settings"][0]`

export const homeQuery = groq`
  *[_type == "homePage"][0] {
    ...,
    title,
    content,
    slug
  }
`

export interface Home {
  title?: string
  content?: any
}

export interface Settings {
  title?: string
  description?: string
  ogImage?: any
  favicon?: any
}
