import { defineField } from 'sanity'

export default defineField({
  name: 'meta',
  title: 'Meta',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localizedText',
    },
    {
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'localizedString' }],
    },
    {
      name: 'description',
      title: 'Description',
      type: 'localizedText',
    },
    {
      name: 'ogTitle',
      title: 'OG:Title',
      type: 'localizedText',
    },
    {
      name: 'ogDescription',
      title: 'OG:Description',
      type: 'localizedText',
    },
    {
      name: 'ogImage',
      title: 'OG:Image',
      type: 'localizedImage',
      options: {
        aspectRatio: '1.9:1',
      },
    },
    {
      name: 'ogImageAlt',
      title: 'OG:Image Alt',
      type: 'localizedText',
    },
    {
      name: 'ogType',
      title: 'OG:Type',
      type: 'string',
    },
  ],
})