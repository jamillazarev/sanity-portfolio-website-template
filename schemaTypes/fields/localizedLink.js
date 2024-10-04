import { defineField } from 'sanity'

export default defineField({
  name: 'localizedLink',
  title: 'Localized Link',
  type: 'object',
  fields: [
    {
      name: 'linkTypeReference',
      title: 'Link Type Reference',
      type: 'reference',
      to: [{ type: 'linkType' }],
    },
    {
      name: 'value',
      title: 'Value',
      type: 'string',
      validation: Rule => Rule.required().custom((value, context) => {
        const variant = context.parent?.linkTypeReference?.variant
        if (variant === 'full' && !/^https?:\/\//.test(value)) {
          return 'Full URL must start with http:// or https://'
        }
        if ((variant === 'handleEnd' || variant === 'subdomain') && (value.startsWith('/') || value.startsWith('.') || value.includes(' '))) {
          return 'Handle cannot start with a slash or a dot, and cannot contain spaces'
        }
        return true
      }),
    },
  ],
  preview: {
    select: {
      linkName: 'linkTypeReference.name.translations[0].value',
      variant: 'linkTypeReference.variant',
      value: 'value',
      baseUrl: 'linkTypeReference.baseUrl',
      icon: 'linkTypeReference.icon',
      isActive: 'isActive',
    },
    prepare({ linkName, variant, value, baseUrl, icon, isActive }) {
      let subtitle = ''

      if (variant === 'full') {
        subtitle = value || 'No URL set'
      } else if (variant === 'handleEnd') {
        subtitle = value ? `${baseUrl}/${value}` : 'No handle set'
      } else if (variant === 'subdomain') {
        const domainParts = baseUrl.split('//')
        const protocol = domainParts[0]
        const domain = domainParts[1]
        subtitle = value ? `${protocol}//${value}.${domain}` : 'No handle set'
      }

      return {
        title: `${linkName || 'Unnamed Link'} ${isActive ? '' : '(Inactive)'}`,
        subtitle: subtitle,
        media: icon,
      }
    },
  },
})