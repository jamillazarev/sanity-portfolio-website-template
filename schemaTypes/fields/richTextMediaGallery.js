import { defineField } from 'sanity'

export default defineField({
  name: 'richTextMediaGallery',
  title: 'Rich Text Media Gallery',
  type: 'object',
  fields: [
    {
      name: 'mediaItems',
      title: 'Media Items',
      type: 'array',
      of: [{ type: 'richTextMedia' }],
    },
    {
      name: 'description',
      title: 'Description',
      type: 'notThatRichText',
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'color',
    },
    {
      name: 'source',
      title: 'Source',
      type: 'string',
    },
  ],
  preview: {
    select: {
      items: 'mediaItems',
      source: 'source',
    },
    prepare({ items, source }) {
      return {
        title: 'Rich Text Media Gallery',
        subtitle: `${items?.length || 0} item(s)${source ? ` | Source: ${source}` : ''}`,
      }
    },
  },
})