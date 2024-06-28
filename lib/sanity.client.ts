import { apiVersion, dataset, projectId, useCdn } from 'lib/sanity.api'
import {
  type Settings,
  type Home,
  homeQuery,
  settingsQuery,
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
