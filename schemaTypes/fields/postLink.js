import { defineField } from 'sanity'

export default defineField({
  name: 'postLink',
  title: 'Post Link',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'localizedString',
    }),
    defineField({
      name: 'post',
      title: 'Post',
      type: 'reference',
      to: [{ type: 'post' }],
    }),
  ],
  preview: {
    select: {
      name: 'name.translations[0].value',
      postKey: 'post.key',
    },
    prepare({ name, postKey }) {
      return {
        title: name || 'Unnamed Link',
        subtitle: postKey ? `Linked to: ${postKey}` : 'No post linked',
      }
    },
  }
})
