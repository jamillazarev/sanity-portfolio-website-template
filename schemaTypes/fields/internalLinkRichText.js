import { defineField } from 'sanity'

export default defineField({
  name: 'internalLinkRichText',
  title: 'Internal Link for Rich Text',
  type: 'object',
  fields: [
    {
      name: 'variant',
      title: 'Link Type',
      type: 'string',
      options: {
        list: [
          { title: 'List', value: 'list' },
          { title: 'Post', value: 'post' },
          { title: 'Brand', value: 'brand' },
          { title: 'Person', value: 'person' },
          { title: 'Project', value: 'project' },
          { title: 'Feedback', value: 'feedback' },
          { title: 'Language', value: 'language' },
        ],
        layout: 'radio',
      },
    },
    {
      name: 'listReference',
      title: 'List',
      type: 'reference',
      to: [{ type: 'list' }],
      hidden: ({ parent }) => parent?.variant !== 'list',
    },
    {
      name: 'taxonomies',
      title: 'Taxonomies',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'taxonomy' }] }],
      hidden: ({ parent }) => parent?.variant !== 'list',
    },
    {
      name: 'postReference',
      title: 'Post',
      type: 'reference',
      to: [{ type: 'post' }],
      hidden: ({ parent }) => parent?.variant !== 'post',
    },
    {
      name: 'brandReference',
      title: 'Brand',
      type: 'reference',
      to: [{ type: 'brand' }],
      hidden: ({ parent }) => parent?.variant !== 'brand',
    },
    {
      name: 'personReference',
      title: 'Person',
      type: 'reference',
      to: [{ type: 'person' }],
      hidden: ({ parent }) => parent?.variant !== 'person',
    },
    {
      name: 'projectReference',
      title: 'Project',
      type: 'reference',
      to: [{ type: 'project' }],
      hidden: ({ parent }) => parent?.variant !== 'project',
    },
    {
      name: 'feedbackReference',
      title: 'Feedback',
      type: 'reference',
      to: [{ type: 'feedback' }],
      hidden: ({ parent }) => parent?.variant !== 'feedback',
    },
    {
      name: 'languageReference',
      title: 'Language',
      type: 'reference',
      to: [{ type: 'language' }],
      hidden: ({ parent }) => parent?.variant !== 'language',
    },
  ],
})