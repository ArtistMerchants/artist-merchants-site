import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Archive Project',
  type: 'document',
  fields: [
    defineField({
      name: 'client',
      title: 'Client',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'client.0',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'projectCategory' }] }],
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
    }),
    defineField({
      name: 'media',
      title: 'Media',
      type: 'array',
      of: [
        {
          name: 'image',
          title: 'Image',
          type: 'image',
          fields: [{ name: 'alt', title: 'Alt', type: 'string' }],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'client',
      category: 'categories.0.title',
      year: 'year',
      media: 'media',
    },
    prepare: ({ title, category, year, media }) => {
      const image = media?.length > 0 ? media[0] : null
      return {
        title: title.join(', '),
        subtitle: `Year: ${year} — Category: ${category}`,
        media: image,
      }
    },
  },
})
