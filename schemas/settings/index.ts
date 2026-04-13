import { CogIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Global Settings',
  type: 'document',
  icon: CogIcon,
  preview: { select: { title: 'title', subtitle: 'description' } },
  groups: [
    { name: 'branding', title: 'Branding' },
    { name: 'seo', title: 'SEO' },
    { name: 'download', title: 'PDF Download' },
    { name: 'passwords', title: 'Passwords' },
  ],
  fields: [
    defineField({
      name: 'logo',
      title: 'Text Logo (SVG)',
      description: 'Upload an SVG file to use as the site wordmark. This replaces the default "Artist Merchants®" text logo.',
      type: 'file',
      options: {
        accept: 'image/svg+xml',
      },
      group: 'branding',
    }),
    defineField({
      name: 'title',
      description: 'Used for browser tab title and SEO — not the visual logo.',
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
      description: 'Note: do not add .pdf, this will be added automatically',
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
