import { defineType } from 'sanity'
import {LinkIcon} from '@sanity/icons'

export default defineType({
  name: 'internalLinkAnnotation',
  type: 'object',
  title: 'Internal Link',
  icon: LinkIcon,
  fields: [
    {
      name: 'reference',
      type: 'internalLinkRichText',
    },
  ],
})