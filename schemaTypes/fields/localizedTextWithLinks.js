import { defineField } from 'sanity'
import internalLinkAnnotation from '../annotations/internalLinkAnnotation'
import externalLinkAnnotation from '../annotations/externalLinkAnnotation'

export default defineField({
  name: 'localizedTextWithLinks',
  title: 'Localized Text with Links',
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
            { 
              name: 'value', 
              type: 'array', 
              of: [
                {
                  type: 'block',
                  styles: [{ title: 'Normal', value: 'normal' }],
                  lists: [],
                  marks: {
                    decorators: [
                      { title: 'Strong', value: 'strong' },
                      { title: 'Emphasis', value: 'em' },
                    ],
                    annotations: [
                      internalLinkAnnotation,
                      externalLinkAnnotation,
                    ]
                  }
                }
              ]
            }
          ],
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
      const text = firstTranslation?.value
        ? firstTranslation.value.map(block => block.children.map(child => child.text).join('')).join(' ')
        : '';
      return {
        title: text ? `${firstTranslation.language?.key || 'Unknown language'}: ${text.substring(0, 50)}${text.length > 50 ? '...' : ''}` : 'No translations',
        subtitle: `${translations?.length || 0} translation(s)`
      }
    }
  }
})