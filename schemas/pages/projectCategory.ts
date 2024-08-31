import { defineField, defineType } from 'sanity'
import {
  orderRankField,
  orderRankOrdering,
} from '@sanity/orderable-document-list'

export default defineType({
  name: 'projectCategory',
  title: 'Categories (Archive)',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'projectCategory', newItemPosition: 'before' }),
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
  ],
})
