import { ReactNode } from 'react'
import { defineField, defineType, defineArrayMember } from 'sanity'
import { HomeIcon } from '@sanity/icons'

const SuperScript = ({ children }: { children: ReactNode }) => {
  return <sup>{children}</sup>
}

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  icon: HomeIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
          marks: {
            decorators: [
              {
                title: 'Superscript',
                value: 'superscript',
                icon: () => <span>S</span>,
                component: SuperScript,
              },
            ],
          },
        },
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
          description: 'Optional title for the contact section',
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
    defineField({
      name: 'images',
      title: 'Masked Images',
      description: 'Masked images should all have a white background',
      type: 'array',
      of: [
        {
          name: 'image',
          title: 'Image',
          type: 'image',
          fields: [
            { name: 'alt', title: 'Alt', type: 'string' },
            { name: 'hide', title: 'Hide Image', type: 'boolean' },
          ],
          preview: {
            select: {
              alt: 'alt',
              asset: 'asset',
              hide: 'hide',
            },
            prepare: ({ alt, asset, hide }) => ({
              title: alt || 'Image',
              subtitle: `${hide ? 'HIDDEN' : ''} ${alt ? 'ALT: ' + alt : ''}`,
              media: asset,
            }),
          },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Home Page',
    }),
  },
})
