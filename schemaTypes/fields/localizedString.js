import { defineField } from 'sanity'

export default defineField({
  name: 'localizedString',
  title: 'Localized String',
  type: 'object',
  fields: [
    {
      name: 'translations',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { 
              name: 'language', 
              type: 'reference', 
              to: [{ type: 'language' }],
              validation: Rule => Rule.required(),
            },
            { 
              name: 'value', 
              type: 'string',
              validation: Rule => Rule.required(),
            }
          ],
          preview: {
            select: {
              languageKey: 'language.key',
              value: 'value'
            },
            prepare({ languageKey, value }) {
              return {
                title: value || 'No translation',
                subtitle: languageKey || 'No language selected',
              }
            }
          }
        }
      ]
    }
  ]
})