import { getSettings } from 'lib/sanity.client'

export default async function PageHead() {
  const { title, description, ogImage = {} } = await getSettings()

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
    </>
  )
}
