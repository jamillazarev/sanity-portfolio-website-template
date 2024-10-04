import { defineType, defineField } from 'sanity'
import personLink from './fields/personLinkGroup'
import slugify from 'slugify'

export default defineType({
  name: 'project',
  title: 'Project',
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
      type: 'localizedNotThatRichText',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedNotThatRichText',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
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
      name: 'brands',
      title: 'Brands',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'brand' }] }],
      validation: Rule => Rule.unique(),
    }),
    defineField({
      name: 'persons',
      title: 'Persons',
      type: 'array',
      of: [personLink],
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
      name: 'media',
      title: 'Media',
      type: 'array',
      of: [{ type: 'media' }],
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
      date: 'date',
      brands: 'brands',
      isVisible: 'isVisible',
      logo: 'logo',
    },
    prepare({ title, date, brands, isVisible, logo }) {
      let media = null;
      if (logo) {
        media = logo.useGlobalImage ? logo.globalImage : (logo.localizedImages && logo.localizedImages[0]?.image);
      }
      
      const brandsText = brands && brands.length > 0 
        ? `Brands: ${brands.length}`
        : 'No brands';

      return {
        title: title ? (title[0]?.children[0]?.text || 'Unnamed Project') : 'Unnamed Project',
        subtitle: `${date || 'No date'} | ${brandsText} ${isVisible ? '' : '(Hidden)'}`,
        media: media,
      }
    },
  },
})
