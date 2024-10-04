import { defineField } from 'sanity'

export default defineField({
  name: 'internalLink',
  title: 'Internal Link',
  type: 'object',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'localizedString',
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'image',
    },
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
  initialValue: {
    isActive: true
  },
  validation: Rule => Rule.custom((fields, context) => {
    if (!fields.variant) {
      return 'Link type is required'
    }
    const referenceField = `${fields.variant}Reference`
    if (!fields[referenceField]) {
      return `${fields.variant} reference is required`
    }
    return true
  }),
  preview: {
    select: {
      name: 'name.translations[0].value',
      variant: 'variant',
      listTitle: 'listReference.title.translations[0].value',
      postTitle: 'postReference.title.translations[0].value',
      brandName: 'brandReference.name.translations[0].value',
      personName: 'personReference.name.translations[0].value',
      projectName: 'projectReference.name.translations[0].value',
      feedbackTitle: 'feedbackReference.title.translations[0].value',
      languageKey: 'languageReference.key',
      icon: 'icon',
      isActive: 'isActive',
    },
    prepare({ name, variant, listTitle, postTitle, brandName, personName, projectName, feedbackTitle, languageKey, icon, isActive }) {
      const titles = {
        list: listTitle,
        post: postTitle,
        brand: brandName,
        person: personName,
        project: projectName,
        feedback: feedbackTitle,
        language: languageKey,
      }
      const title = titles[variant] || 'Unnamed'
      return {
        title: `${name || title} ${isActive ? '' : '(Inactive)'}`,
        subtitle: `Type: ${variant || 'Not set'}`,
        media: icon,
      }
    },
  },
})