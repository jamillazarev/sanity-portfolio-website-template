import { defineField } from 'sanity'

export default defineField({
  name: 'notThatRichText',
  title: 'Not That Rich Text',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
      ],
      lists: [],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {title: 'Strike', value: 'strike-through'},
          {title: 'Underline', value: 'underline'},
        ],
        annotations: []
      }
    }
  ]
})