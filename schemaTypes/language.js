import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'language',
  title: 'Language',
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
      name: 'code',
      title: 'Language Code',
      type: 'string',
      validation: Rule => Rule.required().max(5)
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'localizedString',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true
    })
  ],
  preview: {
    select: {
      key: 'key',
      code: 'code',
      isActive: 'isActive'
    },
    prepare({ key, code, isActive }) {
      return {
        title: key,
        subtitle: `${code}${isActive ? '' : ' (Inactive)'}`,
      }
    }
  }
})