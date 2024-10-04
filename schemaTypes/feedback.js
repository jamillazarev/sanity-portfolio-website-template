import { defineType, defineField } from 'sanity'
import personLink from './fields/personLinkGroup'
import slugify from 'slugify'

export default defineType({
  name: 'feedback',
  title: 'Feedback',
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
      name: 'text',
      title: 'Text',
      type: 'localizedAlmostRichText',
      validation: Rule => Rule.required(),
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
      name: 'feedbackDate',
      title: 'Feedback Date',
      type: 'date',
      initialValue: () => new Date().toISOString().split('T')[0],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'media',
      title: 'Media',
      type: 'array',
      of: [{ type: 'media' }],
    }),
    defineField({
      name: 'brands',
      title: 'Brands',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'brand' }] }],
      validation: Rule => Rule.unique(),
    }),
    defineField({
      name: 'projects',
      title: 'Projects',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
      validation: Rule => Rule.unique(),
    }),
    defineField({
      name: 'persons',
      title: 'Persons',
      type: 'array',
      of: [personLink],
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
      description: 'Toggle to show or hide this feedback',
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
      text: 'text',
      date: 'feedbackDate',
      brands: 'brands',
      projects: 'projects',
      persons: 'persons',
      isVisible: 'isVisible',
    },
    prepare(selection) {
      const {text, date, brands, projects, persons, isVisible} = selection;
      
      let title = 'No text';
      let subtitle = '';

      if (text && text.translations && text.translations.length > 0) {
        const firstTranslation = text.translations[0];
        if (firstTranslation.value && firstTranslation.value.length > 0) {
          const firstBlock = firstTranslation.value[0];
          if (firstBlock.children && firstBlock.children.length > 0) {
            title = firstBlock.children[0].text;
          }
        }
      }

      subtitle = date ? date : 'No date';

      const parts = [];
      if (brands && brands.length) parts.push(`Brands: ${brands.length}`);
      if (projects && projects.length) parts.push(`Projects: ${projects.length}`);
      if (persons && persons.length) {
        const totalPersons = persons.reduce((sum, personLink) => sum + (personLink.personItems?.length || 0), 0);
        if (totalPersons > 0) {
          parts.push(`Persons: ${totalPersons}`);
        }
      }
      
      if (parts.length > 0) {
        subtitle += ` | ${parts.join(' | ')}`;
      }

      subtitle += isVisible ? '' : ' (Hidden)';

      return {
        title: title.length > 50 ? title.substring(0, 50) + '...' : title,
        subtitle,
      }
    },
  }
})