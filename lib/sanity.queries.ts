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

const projectFields = `
_id,
"slug": slug.current,
client,
year,
categories[] -> {
  _id,
  title,
  "slug": slug.current
},
media[] {
  _key,
  _type,
  _type == 'image' => {
    ${imageFields}
  },
  _type == 'video' => {
    "url": asset->url
  }
}
`

export const settingsQuery = groq`*[_type == "settings"][0] {
  title,
  description,
  ogImage {
    ${imageFields}
  },
  favicon {
    ${imageFields}
  }
}`

export const homeQuery = groq`
  *[_type == "homePage"][0] {
    ...,
    title,
    content,
    media[] {
      _key,
      _type,
      _type == 'image' => {
        ${imageFields}
      },
      _type == 'video' => {
        "url": asset->url
      }
    },
    "categories": *[_type == "projectCategory"] {
      _id,
      title,
      "slug": slug.current
    },
    "information": *[_type == "informationPage"][0] {
      _id,
      faqs {
        title,
        items[] {
          _key,
          question,
          answer
        }
      },
      contact {
        title,
        items[] {
          _key,
          label,
          url
        }
      }
    }
  }
`

export const categoryAllPageQuery = groq`
{
  "categories": *[_type == "projectCategory"] {
    _id,
    title,
    "slug": slug.current
  },
  "projects": *[_type == "project"] {
    ${projectFields}
  }
}
`

export const categoryPageQuery = groq`
*[_type == "projectCategory" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  "categories": *[_type == "projectCategory"] {
    _id,
    title,
    "slug": slug.current
  },
  "projects": *[_type == "project" && references(^._id)] {
    ${projectFields}
  }
}
`

export const categoryPathsQuery = groq`
*[_type == "projectCategory"] {
  "slug": slug.current
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
