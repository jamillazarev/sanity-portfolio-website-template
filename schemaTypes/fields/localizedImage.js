import { defineField } from 'sanity'

const aspectRatios = [
  {title: '21:9', value: '21:9'},
  {title: '9:21', value: '9:21'},
  {title: '16:9', value: '16:9'},
  {title: '9:16', value: '9:16'},
  {title: '1:1', value: '1:1'},
  {title: '4:3', value: '4:3'},
  {title: '3:4', value: '3:4'},
  {title: '1.9:1', value: '1.9:1'},
  {title: 'Wide', value: 'wide'},
  {title: 'Custom', value: 'custom'}
]

export default defineField({
  name: 'localizedImage',
  title: 'Localized Image',
  type: 'object',
  fields: [
    {
      name: 'useGlobalImage',
      title: 'Use Global Image',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'globalImage',
      title: 'Global Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      hidden: ({ parent }) => !parent?.useGlobalImage,
    },
    {
      name: 'localizedImages',
      title: 'Localized Images',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'language', type: 'reference', to: [{ type: 'language' }] },
            { 
              name: 'image', 
              type: 'image',
              options: {
                hotspot: true,
              },
            },
          ],
          preview: {
            select: {
              language: 'language.key',
              imageUrl: 'image.asset._ref',
            },
            prepare({ language, imageUrl }) {
              return {
                title: language || 'Unnamed language',
                subtitle: imageUrl ? 'Image set' : 'No image',
                media: imageUrl ? { _type: 'image', asset: { _ref: imageUrl } } : null,
              }
            },
          },
        },
      ],
      hidden: ({ parent }) => parent?.useGlobalImage,
    },
    {
      name: 'aspectRatio',
      title: 'Aspect Ratio',
      type: 'string',
      options: {
        list: aspectRatios,
        layout: 'dropdown',
      },
      initialValue: '1:1',
    },
    {
      name: 'customAspectRatio',
      title: 'Custom Aspect Ratio',
      type: 'string',
      hidden: ({ parent }) => parent?.aspectRatio !== 'custom',
      validation: Rule => Rule.custom((ratio, context) => {
        if (context.parent?.aspectRatio !== 'custom') return true
        if (!ratio) return 'Custom aspect ratio is required when "Custom" is selected'
        if (/^\d+(\.\d+)?:\d+(\.\d+)?$/.test(ratio)) return true
        return 'Must be in format "width:height", e.g. "16:9" or "1.9:1"'
      })
    },
  ],
  preview: {
    select: {
      useGlobalImage: 'useGlobalImage',
      globalImage: 'globalImage',
      localizedImages: 'localizedImages',
      aspectRatio: 'aspectRatio',
      customAspectRatio: 'customAspectRatio',
    },
    prepare(selection) {
      const { useGlobalImage, globalImage, localizedImages, aspectRatio, customAspectRatio } = selection
      
      let title = useGlobalImage ? 'Global Image' : 'Localized Images'
      let subtitle = `Aspect Ratio: ${aspectRatio === 'custom' ? customAspectRatio : aspectRatio}`
      let media = null

      if (useGlobalImage) {
        media = globalImage
      } else if (localizedImages && localizedImages.length > 0) {
        subtitle += ` (${localizedImages.length} image${localizedImages.length !== 1 ? 's' : ''})`
        media = localizedImages[0].image
      } else {
        subtitle += ' (No images set)'
      }

      return {
        title,
        subtitle,
        media,
      }
    },
  },
})