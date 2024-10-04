import { defineType, defineField } from 'sanity'
import slugify from 'slugify'

export default defineType({
  name: 'taxonomy',
  title: 'Taxonomy',
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
      name: 'name',
      title: 'Name',
      type: 'localizedString',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedNotThatRichText',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'key',
        maxLength: 200,
        slugify: input => slugify(input, {lower: true, strict: true})
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'parent',
      title: 'Parent Taxonomy',
      type: 'reference',
      to: [{ type: 'taxonomy' }],
      options: {
        filter: ({ document }) => {
          return {
            filter: '_id != $id',
            params: { id: document._id }
          }
        }
      }
    }),
    defineField({
      name: 'children',
      title: 'Child Taxonomies',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'taxonomy' }] }],
      validation: Rule => Rule.custom((children, context) => {
        if (children && children.some(child => child._ref === context.document._id)) {
          return 'A taxonomy cannot be its own child'
        }
        return true
      })
    }),
    defineField({
      name: 'isVisible',
      title: 'Is Visible',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name.translations[0].value',
      subtitle: 'key',
      isVisible: 'isVisible',
    },
    prepare({ title, subtitle, isVisible }) {
      return {
        title: title || 'Unnamed Taxonomy',
        subtitle: `${subtitle || 'No key'}${isVisible ? '' : ' (Hidden)'}`,
      }
    },
  },
})