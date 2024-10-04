import { defineType, defineField } from 'sanity'

const localizedContent = defineType({
  name: 'localizedContent',
  title: 'Localized Content',
  type: 'object',
  fields: [
    defineField({
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
                  type: 'object',
                  name: 'contentBlock',
                  fields: [
                    {
                      name: 'type',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Content', value: 'content' },
                          { title: 'Space', value: 'space' }
                        ],
                        layout: 'radio'
                      },
                      validation: Rule => Rule.required()
                    },
                    {
                      name: 'content',
                      type: 'content',
                      hidden: ({ parent }) => parent.type !== 'content',
                      validation: Rule => Rule.custom((value, context) => {
                        if (context.parent.type === 'content' && !value) {
                          return 'Content is required when type is set to content'
                        }
                        return true
                      })
                    },
                    {
                      name: 'columns',
                      type: 'number',
                      title: 'Number of columns',
                      options: {
                        list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
                      },
                      hidden: ({ parent }) => parent.type !== 'content',
                      validation: Rule => Rule.custom((value, context) => {
                        if (context.parent.type === 'content' && !value) {
                          return 'Number of columns is required when type is set to content'
                        }
                        return true
                      })
                    },
                    {
                      name: 'newRow',
                      type: 'boolean',
                      title: 'Start new row',
                      initialValue: false,
                      hidden: ({ parent }) => parent.type !== 'content'
                    },
                    {
                      name: 'spaceSize',
                      type: 'string',
                      title: 'Space size',
                      options: {
                        list: [
                          { title: 'Small', value: 'small' },
                          { title: 'Medium', value: 'medium' },
                          { title: 'Large', value: 'large' }
                        ]
                      },
                      hidden: ({ parent }) => parent.type !== 'space',
                      validation: Rule => Rule.custom((value, context) => {
                        if (context.parent.type === 'space' && !value) {
                          return 'Space size is required when type is set to space'
                        }
                        return true
                      })
                    }
                  ],
                  preview: {
                    select: {
                      type: 'type',
                      columns: 'columns',
                      spaceSize: 'spaceSize'
                    },
                    prepare({ type, columns, spaceSize }) {
                      return {
                        title: type === 'content' ? `Content (${columns} columns)` : `Space (${spaceSize})`
                      }
                    }
                  }
                }
              ]
            }
          ],
          preview: {
            select: {
              languageKey: 'language.key',
              languageCode: 'language.code',
              blocks: 'value'
            },
            prepare(selection) {
              const { languageKey, languageCode, blocks } = selection
              return {
                title: `${blocks?.length || 0} block(s)`,
                subtitle: languageKey ? languageKey : (languageCode || 'No language set')
              }
            }
          }
        }
      ]
    })
  ]
})

export default localizedContent