import { defineType } from 'sanity'
import internalLinkAnnotation from '../annotations/internalLinkAnnotation'
import externalLinkAnnotation from '../annotations/externalLinkAnnotation'
import { BookIcon } from '@sanity/icons'
import CitationDecorator from '../../components/CitationDecorator'
import richTextMedia from './richTextMedia'
import richTextMediaGallery from './richTextMediaGallery'

const content = defineType({
  name: 'content',
  title: 'Content',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'H5', value: 'h5' },
        { title: 'H6', value: 'h6' },
        { title: 'Quote', value: 'blockquote' },
      ],
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
      },
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Number', value: 'number' }
      ]
    },
    richTextMedia,
    richTextMediaGallery,
  ]
})

export default content