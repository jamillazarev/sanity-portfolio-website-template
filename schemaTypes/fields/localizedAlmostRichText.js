import { defineField } from 'sanity'
import internalLinkAnnotation from '../annotations/internalLinkAnnotation'
import externalLinkAnnotation from '../annotations/externalLinkAnnotation'
import { BookIcon } from '@sanity/icons'
import CitationDecorator from '../../components/CitationDecorator'

export default defineField({
  name: 'localizedAlmostRichText',
  title: 'Localized Almost Rich Text',
  type: 'object',
  fields: [
    {
      name: 'translations',
      type: 'array',
      title: 'Translations',
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
                    { title: 'Normal', value: 'normal' },
                    { title: 'Quote', value: 'blockquote' },
                  ],
                  lists: [],
                  marks: {
                    decorators: [
                      { title: 'Strong', value: 'strong' },
                      { title: 'Emphasis', value: 'em' },
                      { title: 'Strike', value: 'strike-through' },
                      { title: 'Underline', value: 'underline' },
                      { 
                        title: 'Citation', 
                        value: 'cite',
                        icon: BookIcon,
                        component: CitationDecorator
                      },
                    ],
                    annotations: [
                      internalLinkAnnotation,
                      externalLinkAnnotation,
                    ]
                  }
                }
              ],
            }
          ],
          preview: {
            select: {
              title: 'value',
              subtitle: 'language.key',
            },
            prepare(selection) {
              const { title, subtitle } = selection;
              return {
                title: (title && title[0]?.children[0]?.text) || 'No content',
                subtitle: subtitle || 'No language',
              };
            },
          },
        }
      ],
    }
  ],
})