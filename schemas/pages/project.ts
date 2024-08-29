import { defineArrayMember, defineField, defineType } from 'sanity'
import { MaterialsSelect } from 'components/Sanity/MaterialsSelect'
import { TechniquesSelect } from 'components/Sanity/TechniquesSelect'
import {
  orderRankField,
  orderRankOrdering,
} from '@sanity/orderable-document-list'

export default defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'project' }),
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
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Client(s)',
      type: 'array',
      of: [{ type: 'string' }],
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
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'projectCategory' }] }],
    }),
    defineField({
      name: 'materials',
      title: 'Materials',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'materialCategory' }] }],
    }),
    defineField({
      name: 'taggedMaterials',
      title: 'Material Filters',
      type: 'array',
      components: {
        input: MaterialsSelect,
      },
      of: [
        defineArrayMember({
          name: 'materialItem',
          title: 'Material Item',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            }),
            defineField({
              name: 'items',
              title: 'Items',
              type: 'array',
              of: [{ type: 'string' }],
            }),
          ],
        }),
      ],
      hidden: ({ parent }) => !parent.materials?.length,
    }),
    defineField({
      name: 'taggedTechniques',
      title: 'Technique Filters',
      type: 'array',
      components: {
        input: TechniquesSelect,
      },
      of: [
        defineArrayMember({
          name: 'techniqueItem',
          title: 'Technique Item',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            }),
            defineField({
              name: 'items',
              title: 'Items',
              type: 'array',
              of: [{ type: 'string' }],
            }),
          ],
        }),
      ],
      hidden: ({ parent }) => !parent.materials?.length,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      client: 'client',
      category: 'categories.0.title',
      year: 'year',
      media: 'media',
    },
    prepare: ({ title, client, category, year, media }) => {
      const image = media?.length > 0 ? media[0] : null
      return {
        title: title,
        subtitle: `Client: ${client} — Year: ${year} — Category: ${category}`,
        media: image,
      }
    },
  },
})
