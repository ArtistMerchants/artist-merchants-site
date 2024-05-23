import { Layout } from './Layout'
import { PortableText } from '@portabletext/react'
import type { Settings } from 'lib/sanity.queries'

export default function HomePage(props: {
  title?: string
  content?: any
  settings: Settings
}) {
  const { title, content, settings } = props

  return (
    <Layout>
      <div className="h-screen w-full bg-black p-4 text-center text-white">
        <h1>{title}</h1>
        <PortableText value={content} />
      </div>
    </Layout>
  )
}
