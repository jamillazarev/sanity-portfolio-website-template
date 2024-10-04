import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'nav',
  title: 'Navigation',
  type: 'document',
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
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'linkType',
              title: 'Link Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Internal Link', value: 'internal' },
                  { title: 'External Link', value: 'external' },
                ],
                layout: 'radio',
              },
            },
            {
              name: 'internalLink',
              title: 'Internal Link',
              type: 'internalLink',
              hidden: ({ parent }) => parent?.linkType !== 'internal',
            },
            {
              name: 'externalLink',
              title: 'External Link',
              type: 'localizedLink',
              hidden: ({ parent }) => parent?.linkType !== 'external',
            },
            {
              name: 'isVisible',
              title: 'Is Visible',
              type: 'boolean',
              initialValue: true,
            },
          ],
          validation: Rule => Rule.custom((fields) => {
            if (!fields.linkType) {
              return 'Link type is required'
            }
            if (fields.linkType === 'internal' && !fields.internalLink) {
              return 'Internal link is required when link type is internal'
            }
            if (fields.linkType === 'external' && !fields.externalLink) {
              return 'External link is required when link type is external'
            }
            return true
          }),
          preview: {
            select: {
              linkType: 'linkType',
              internalLinkName: 'internalLink.name.translations[0].value',
              internalLinkVariant: 'internalLink.variant',
              externalLinkName: 'externalLink.linkTypeReference.name.translations[0].value',
              externalLinkVariant: 'externalLink.linkTypeReference.variant',
            },
            prepare({ linkType, internalLinkName, internalLinkVariant, externalLinkName, externalLinkVariant }) {
              const linkTypeDisplay = linkType === 'internal' ? 'Internal' : 'External';
              const name = linkType === 'internal' ? internalLinkName : externalLinkName;
              const variant = linkType === 'internal' ? internalLinkVariant : externalLinkVariant;
              
              return {
                title: `${linkTypeDisplay}: ${name || 'Unnamed'}`,
                subtitle: `Type: ${variant || 'Not set'}`,
              }
            },
          },
        },
      ],
      validation: Rule => Rule.min(1).error('At least one link is required'),
    }),
  ],
  preview: {
    select: {
      key: 'key',
      links: 'links',
    },
    prepare({ key, links }) {
      return {
        title: key,
        subtitle: `${links?.length || 0} link(s)`,
      }
    },
  },
})