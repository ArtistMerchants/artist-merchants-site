import { defineField, defineType } from 'sanity'
import {
  orderRankField,
  orderRankOrdering,
} from '@sanity/orderable-document-list'

export default defineType({
  name: 'materialCategory',
  title: 'Materials (Client Tools)',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'materialCategory', newItemPosition: 'before' }),
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
      name: 'materials',
      title: 'Materials',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'techniques',
      title: 'Techniques',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
})
