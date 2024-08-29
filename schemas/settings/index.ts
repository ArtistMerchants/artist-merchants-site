import { CogIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Global Settings',
  type: 'document',
  icon: CogIcon,
  preview: { select: { title: 'title', subtitle: 'description' } },
  groups: [
    { name: 'seo', title: 'SEO' },
    { name: 'download', title: 'PDF Download' },
    { name: 'passwords', title: 'Passwords' },
  ],
  fields: [
    defineField({
      name: 'title',
      description: 'SEO Title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'seo',
    }),
    defineField({
      name: 'description',
      title: 'Descriprion',
      type: 'text',
      group: 'seo',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      description:
        'Used for social media previews when linking to the index page.',
      type: 'image',
      group: 'seo',
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      group: 'seo',
    }),
    defineField({
      name: 'downloadFilename',
      title: 'Downloaded PDF Filename',
      type: 'string',
      group: 'download',
    }),
    defineField({
      name: 'passwords',
      title: 'Passwords',
      group: 'passwords',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
})
