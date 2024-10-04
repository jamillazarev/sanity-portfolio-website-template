import { defineField } from 'sanity'

export default defineField({
  name: 'linkGroup',
  title: 'Link Group',
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
      name: 'name',
      title: 'Name',
      type: 'localizedString',
    }),
    defineField({
      name: 'linkItems',
      title: 'Links',
      type: 'array',
      of: [{ type: 'localizedLink' }],
    }),
  ],
  preview: {
    select: {
      key: 'key',
      name: 'name.translations[0].value',
      links: 'linkItems',
    },
    prepare({ key, name, links }) {
      const linksPreview = links?.map(link => {
        const linkName = link.linkTypeReference?.name?.translations?.[0]?.value || 'Unnamed Link'
        const variant = link.linkTypeReference?.variant
        const baseUrl = link.linkTypeReference?.baseUrl
        let linkText = link.value || 'No value set'
        if (variant === 'handleEnd') {
          linkText = `${baseUrl}/${link.value}`
        } else if (variant === 'subdomain') {
          const domainParts = baseUrl.split('//')
          const protocol = domainParts[0]
          const domain = domainParts[1]
          linkText = `${protocol}//${link.value}.${domain}`
        }
        const activeStatus = link.isActive ? '' : ' (Inactive)'
        return `${linkName}: ${linkText}${activeStatus}`
      }).join(', ')

      return {
        title: key ? `${key}: ${name || 'Unnamed Link Group'}` : (name || 'Unnamed Link Group'),
        subtitle: linksPreview || 'No links',
      }
    },
  }
})