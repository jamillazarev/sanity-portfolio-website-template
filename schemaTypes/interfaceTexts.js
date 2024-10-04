import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'interfaceTexts',
  title: 'Interface Texts',
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
      name: 'text',
      title: 'Text',
      type: 'localizedAlmostRichText',
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      key: 'key',
      text: 'text.translations[0].value',
    },
    prepare({ key, text }) {
      return {
        title: key,
        subtitle: text && text.length > 0 ? text[0].children[0].text : 'No text set',
      }
    },
  },
})