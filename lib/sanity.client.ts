import { apiVersion, dataset, projectId, useCdn } from 'lib/sanity.api'
import {
  type Settings,
  type Home,
  homeQuery,
  settingsQuery,
  categoryPathsQuery,
  categoryAllPageQuery,
  categoryPageQuery,
  projectQuery,
  projectPathsQuery,
  materialCategoryPageQuery,
  materialCategoryPathsQuery,
} from 'lib/sanity.queries'
import { createClient } from 'next-sanity'

export const client = createClient({ projectId, dataset, apiVersion, useCdn })

export async function getSettings(): Promise<Settings> {
  if (client) {
    return (await client.fetch(settingsQuery)) || {}
  }
  return {}
}

export const getHomePage = async (): Promise<Home> => {
  if (client) {
    return (await client.fetch(homeQuery)) || []
  }

  return {}
}

export const getCategoryPaths = async (): Promise<any> => {
  if (client) {
    return (await client.fetch(categoryPathsQuery)) || []
  }

  return []
}

export const getCategoryAllPage = async (): Promise<any> => {
  if (client) {
    return (await client.fetch(categoryAllPageQuery)) || []
  }

  return []
}

export const getCategoryPage = async (slug: string): Promise<any> => {
  if (client) {
    return (await client.fetch(categoryPageQuery, { slug })) || []
  }

  return []
}

export const getProjectPaths = async (): Promise<any> => {
  if (client) {
    return (await client.fetch(projectPathsQuery)) || []
  }

  return []
}

export const getProjectPage = async (slug: string): Promise<any> => {
  if (client) {
    return (await client.fetch(projectQuery, { slug })) || []
  }

  return []
}

export const getMaterialCategoryPaths = async (): Promise<any> => {
  if (client) {
    return (await client.fetch(materialCategoryPathsQuery)) || []
  }

  return []
}

export const getMaterialCategoryPage = async (slug: string): Promise<any> => {
  if (client) {
    return (await client.fetch(materialCategoryPageQuery, { slug })) || []
  }

  return []
}
