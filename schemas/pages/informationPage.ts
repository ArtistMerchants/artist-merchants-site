import { HomeIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'informationPage',
  title: 'Information Page',
  icon: HomeIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'items',
          title: 'Items',
          type: 'array',
          of: [
            defineArrayMember({
              name: 'faqItem',
              title: 'FAQ Item',
              type: 'object',
              fields: [
                defineField({
                  name: 'question',
                  title: 'Question',
                  type: 'string',
                }),
                defineField({
                  name: 'answer',
                  title: 'Answer',
                  type: 'array',
                  of: [{ type: 'block' }],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'contact',
      title: 'Contact',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'items',
          title: 'Contact Rows',
          type: 'array',
          of: [
            defineArrayMember({
              name: 'contactRow',
              title: 'Contact Row',
              type: 'object',
              fields: [
                defineField({
                  name: 'label',
                  title: 'Label',
                  type: 'string',
                }),
                defineField({
                  name: 'url',
                  title: 'URL',
                  type: 'url',
                  validation: (Rule) =>
                    Rule.uri({
                      scheme: ['http', 'https', 'mailto', 'tel'],
                    }),
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Information Page',
    }),
  },
})
