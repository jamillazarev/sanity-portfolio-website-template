import { defineField } from 'sanity'

export default defineField({
  name: 'localizedText',
  title: 'Localized Text',
  type: 'object',
  fields: [
    {
      name: 'translations',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'language', type: 'reference', to: [{ type: 'language' }] },
            { name: 'value', type: 'text' }
          ],
          preview: {
            select: {
              language: 'language.key',
              value: 'value'
            },
            prepare({ language, value }) {
              return {
                title: value ? (value.length > 50 ? value.substring(0, 50) + '...' : value) : 'No translation',
                subtitle: language || 'No language selected',
              }
            }
          }
        }
      ]
    }
  ],
  preview: {
    select: {
      translations: 'translations'
    },
    prepare({ translations }) {
      const firstTranslation = translations && translations[0]
      return {
        title: firstTranslation
          ? `${firstTranslation.language?.key || 'Unknown language'}: ${firstTranslation.value || 'No value'}`
          : 'No translations',
        subtitle: `${translations?.length || 0} translation(s)`
      }
    }
  }
})