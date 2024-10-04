import { defineType, defineField } from 'sanity'
import slugify from 'slugify'

export default defineType({
  name: 'list',
  title: 'List',
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
      name: 'title',
      title: 'Title',
      type: 'localizedNotThatRichText',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'alternativeTitle',
      title: 'Alternative Title',
      type: 'localizedNotThatRichText',
      description: 'This title will be used for links to this list. If not set, the main title will be used.',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'localizedTextWithLinks',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedNotThatRichText',
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
      name: 'content',
      title: 'Content',
      type: 'string',
      options: {
        list: [
          { title: 'Feedback', value: 'feedback' },
          { title: 'Posts', value: 'posts' },
          { title: 'Projects', value: 'projects' },
          { title: 'Brands', value: 'brands' },
          { title: 'Persons', value: 'persons' },
        ],
      },
    }),
    defineField({
      name: 'featuredFeedback',
      title: 'Featured Feedback',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'feedback' }] }],
      hidden: ({ parent }) => parent?.content !== 'feedback',
    }),
    defineField({
      name: 'featuredPosts',
      title: 'Featured Posts',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'post' }] }],
      hidden: ({ parent }) => parent?.content !== 'posts',
    }),
    defineField({
      name: 'featuredProjects',
      title: 'Featured Projects',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
      hidden: ({ parent }) => parent?.content !== 'projects',
    }),
    defineField({
      name: 'featuredBrands',
      title: 'Featured Brands',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'brand' }] }],
      hidden: ({ parent }) => parent?.content !== 'brands',
    }),
    defineField({
      name: 'featuredPersons',
      title: 'Featured Persons',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'person' }] }],
      hidden: ({ parent }) => parent?.content !== 'persons',
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
  ],
  preview: {
    select: {
      title: 'title.translations[0].value',
      alternativeTitle: 'alternativeTitle.translations[0].value',
      subtitle: 'subtitle.translations[0].value',
      isVisible: 'isVisible',
    },
    prepare({ title, alternativeTitle, subtitle, isVisible }) {
      const getTextFromBlocks = (blocks) => {
        return blocks ? blocks.map(block => block.children.map(child => child.text).join('')).join(' ') : '';
      };

      const titleText = getTextFromBlocks(title);
      const subtitleText = getTextFromBlocks(subtitle);

      return {
        title: titleText || 'Unnamed List',
        subtitle: `${subtitleText ? subtitleText + ' | ' : ''}${isVisible ? '' : '(Hidden)'}`,
      }
    },
  }
})