import { defineField } from 'sanity'

export default defineField({
  name: 'localizedNotThatRichText',
  title: 'Localized Not That Rich Text',
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
              type: 'array', 
              of: [
                {
                  type: 'block',
                  styles: [
                    {title: 'Normal', value: 'normal'},
                  ],
                  marks: {
                    decorators: [
                      {title: 'Strong', value: 'strong'},
                      {title: 'Emphasis', value: 'em'},
                      {title: 'Strike', value: 'strike-through'},
                      {title: 'Underline', value: 'underline'},
                    ],
                    annotations: []
                  },
                  lists: []
                }
              ],
              validation: Rule => Rule.required(),
            }
          ],
          preview: {
            select: {
              languageKey: 'language.key',
              value: 'value'
            },
            prepare({ languageKey, value }) {
              const text = value
                ? value.map(block => block.children.map(child => child.text).join('')).join(' ')
                : '';
              return {
                title: text ? (text.length > 50 ? text.substring(0, 50) + '...' : text) : 'No translation',
                subtitle: languageKey || 'No language selected',
              }
            }
          }
        }
      ]
    }
  ]
})