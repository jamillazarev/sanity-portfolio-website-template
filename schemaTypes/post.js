import { defineType, defineField } from 'sanity'
import personLinkGroup from './fields/personLinkGroup'
import slugify from 'slugify'

export default defineType({
  name: 'post',
  title: 'Post',
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
      name: 'title',
      title: 'Title',
      type: 'localizedNotThatRichText',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'alternativeTitle',
      title: 'Alternative Title',
      type: 'localizedNotThatRichText',
      description: 'This title will be used for links to this post. If not set, the main title will be used.',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'localizedTextWithLinks',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedNotThatRichText',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'localizedContent',
    }),
    defineField({
      name: 'preview',
      title: 'Preview',
      type: 'mediaGallery',
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
      name: 'brands',
      title: 'Brands',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'brand' }] }],
      validation: Rule => Rule.unique(),
    }),
    defineField({
      name: 'project',
      title: 'Project',
      type: 'reference',
      to: [{ type: 'project' }],
    }),
    defineField({
      name: 'persons',
      title: 'Persons',
      type: 'array',
      of: [personLinkGroup],
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [{ type: 'linkGroup' }],
    }),
    defineField({
      name: 'taxonomies',
      title: 'Taxonomies',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'taxonomy' }] }],
      validation: Rule => Rule.unique(),
    }),
    defineField({
      name: 'relatedPosts',
      title: 'Related Posts',
      type: 'array',
      of: [{ type: 'postLink' }],
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
      title: 'title.translations[0].value',
      alternativeTitle: 'alternativeTitle.translations[0].value',
      subtitle: 'subtitle.translations[0].value',
      date: 'date',
      isVisible: 'isVisible',
      isVisibleInLists: 'isVisibleInLists',
      media: 'preview.items[0]',
    },
    prepare({ title, alternativeTitle, subtitle, date, isVisible, isVisibleInLists, media }) {
      const getTextFromBlocks = (blocks) => {
        return blocks ? blocks.map(block => block.children.map(child => child.text).join('')).join(' ') : '';
      };

      const titleText = getTextFromBlocks(title);
      const altTitleText = getTextFromBlocks(alternativeTitle);
      const subtitleText = getTextFromBlocks(subtitle);

      return {
        title: titleText || 'Unnamed Post',
        subtitle: `${date || 'No date'} ${altTitleText ? ' | Alt: ' + altTitleText : ''}${subtitleText ? subtitleText + ' | ' : ''}${isVisible ? '' : '(Hidden)'} ${isVisibleInLists ? '' : '(Not in lists)'}`,
        media: media,
      }
    },
  }
})
