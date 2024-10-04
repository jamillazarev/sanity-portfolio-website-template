import { defineType, defineField } from 'sanity'
import slugify from 'slugify'

export default defineType({
  name: 'brand',
  title: 'Brand',
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
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [{ type: 'linkGroup' }],
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'localizedImage',
      options: {
        aspectRatio: '1:1',
      },
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
      name: 'taxonomies',
      title: 'Taxonomies',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'taxonomy' }] }],
      validation: Rule => Rule.unique(),
    }),
    defineField({
      name: 'meta',
      title: 'Meta',
      type: 'meta',
    }),
    defineField({
      name: 'isVisible',
      title: 'Is Visible',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'isVisibleInLists',
      title: 'Is Visible in Lists',
      type: 'boolean',
      initialValue: true,
      description: 'If unchecked, this post will not appear in lists on the website',
    }),
  ],
  preview: {
    select: {
      title: 'name.translations[0].value',
      subtitle: 'category.name.translations[0].value',
      useGlobalImage: 'logo.useGlobalImage',
      globalImage: 'logo.globalImage',
      localizedImages: 'logo.localizedImages',
      isVisible: 'isVisible',
    },
    prepare({ title, subtitle, useGlobalImage, globalImage, localizedImages, isVisible }) {
      let media = useGlobalImage ? globalImage : (localizedImages && localizedImages[0]?.image);
      return {
        title: title || 'Unnamed Brand',
        subtitle: `${subtitle ? `Category: ${subtitle}` : 'No category'}${isVisible ? '' : ' (Hidden)'}`,
        media: media,
      }
    },
  },
})