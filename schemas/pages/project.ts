import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Archive Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
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
      name: 'client',
      title: 'Client',
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
        {
          name: 'video',
          title: 'Video',
          type: 'file',
          options: { accept: 'video/*' },
        },
      ],
    }),
  ],
})
