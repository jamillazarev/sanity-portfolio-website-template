import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'linkType',
  title: 'Link Type',
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
      name: 'name',
      title: 'Name',
      type: 'localizedString',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
    }),
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      options: {
        list: [
          { title: 'Handle at End', value: 'handleEnd' },
          { title: 'Subdomain Handle', value: 'subdomain' },
          { title: 'Full URL', value: 'full' },
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
      initialValue: 'handleEnd',
    }),
    defineField({
      name: 'baseUrl',
      title: 'Base URL',
      type: 'url',
      hidden: ({ parent }) => parent?.variant === 'full',
      validation: Rule => Rule.uri({scheme: ['http', 'https']})
        .custom((baseUrl, context) => {
          if (!baseUrl && context.parent?.variant !== 'full') {
            return 'Base URL is required for Handle at End and Subdomain Handle variants'
          }
          if (context.parent?.variant === 'subdomain') {
            if (baseUrl.startsWith('http://') || baseUrl.startsWith('https://')) {
              const domain = baseUrl.split('//')[1];
              if (domain.startsWith('.')) {
                return 'For Subdomain Handle, the base URL should not start with a dot. It will be added automatically.';
              }
            }
          } else if (context.parent?.variant === 'handleEnd') {
            if (baseUrl.endsWith('/')) {
              return 'For Handle at End, the base URL should not end with a slash. It will be added automatically.';
            }
          }
          return true;
        }),
    }),
  ],
  preview: {
    select: {
      key: 'key',
      media: 'icon',
      variant: 'variant',
      baseUrl: 'baseUrl',
    },
    prepare({ key, media, variant, baseUrl }) {
      return {
        title: key,
        subtitle: variant === 'full' ? 'Full URL' : `${variant}: ${baseUrl || 'No base URL set'}`,
        media: media,
      }
    },
  },
})