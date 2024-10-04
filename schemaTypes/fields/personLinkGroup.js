import { defineField } from 'sanity'

export default defineField({
  name: 'personLinkGroup',
  title: 'Person Link Group',
  type: 'object',
  fields: [
    defineField({
      name: 'key',
      title: 'Key',
      type: 'string',
      validation: Rule => Rule.required().regex(/^[\p{L}\p{N}_-]+$/u, {
        message: 'The key must contain only letters, numbers, hyphens and underscores'
      }),
    }),
    defineField({
      name: 'taxonomies',
      title: 'Taxonomies',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'taxonomy' }] }],
      validation: Rule => Rule.unique(),
    }),
    defineField({
      name: 'personItems',
      title: 'Persons',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'person' }] }],
      validation: Rule => Rule.unique(),
    }),
  ],
  preview: {
    select: {
      key: 'key',
      taxonomies: 'taxonomies',
      persons: 'personItems',
    },
    prepare({ key, taxonomies, persons }) {
      let title = key || 'Unnamed Person Link Group';
      let subtitle = [];

      if (persons && persons.length > 0) {
        title += `: ${persons.length} person${persons.length > 1 ? 's' : ''}`;
      } else {
        subtitle.push('No persons');
      }

      if (taxonomies && taxonomies.length > 0) {
        subtitle.push(`${taxonomies.length} taxonom${taxonomies.length > 1 ? 'ies' : 'y'}`);
      } else {
        subtitle.push('No taxonomies');
      }

      return {
        title,
        subtitle: subtitle.join(', '),
      }
    },
  }
})
