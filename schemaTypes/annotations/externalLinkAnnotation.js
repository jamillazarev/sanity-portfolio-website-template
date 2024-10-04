import { defineType } from 'sanity'
import {LinkIcon} from '@sanity/icons'

export default defineType({
  name: 'externalLinkAnnotation',
  type: 'object',
  title: 'External Link',
  icon: LinkIcon,
  fields: [
    {
      name: 'reference',
      type: 'localizedLink',
    },
  ],
})