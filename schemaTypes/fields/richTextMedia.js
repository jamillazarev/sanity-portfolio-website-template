import { defineField } from 'sanity'

export default defineField({
  name: 'richTextMedia',
  title: 'Rich Text Media',
  type: 'object',
  fields: [
    {
      name: 'type',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          {title: 'Image', value: 'image'},
          {title: 'YouTube', value: 'youtube'},
          {title: 'Video', value: 'video'},
          {title: 'Audio', value: 'audio'},
          {title: 'Lottie', value: 'lottie'},
          {title: 'Rive', value: 'rive'},
          {title: 'Code', value: 'code'},
          {title: 'CodePen', value: 'codepen'},
          {title: 'Glitch', value: 'glitch'},
          {title: 'SoundCloud', value: 'soundcloud'},
          {title: 'Twitter', value: 'twitter'},
          {title: 'Spotify', value: 'spotify'},
          {title: 'Beatport', value: 'beatport'}
        ],
        layout: 'radio'
      }
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      hidden: ({parent}) => parent?.type !== 'image'
    },
    {
      name: 'youtube',
      title: 'YouTube Video ID',
      type: 'string',
      hidden: ({parent}) => parent?.type !== 'youtube'
    },
    {
      name: 'video',
      title: 'Video',
      type: 'file',
      options: {
        accept: 'video/*'
      },
      hidden: ({parent}) => parent?.type !== 'video'
    },
    {
      name: 'audio',
      title: 'Audio',
      type: 'file',
      options: {
        accept: 'audio/*'
      },
      hidden: ({parent}) => parent?.type !== 'audio'
    },
    {
      name: 'lottie',
      title: 'Lottie Animation',
      type: 'file',
      options: {
        accept: '.json'
      },
      hidden: ({parent}) => parent?.type !== 'lottie'
    },
    {
      name: 'rive',
      title: 'Rive Animation',
      type: 'file',
      options: {
        accept: '.riv'
      },
      hidden: ({parent}) => parent?.type !== 'rive'
    },
    {
      name: 'code',
      title: 'Code',
      type: 'code',
      options: {
        language: 'javascript',
        withFilename: true,
        languageAlternatives: [
          { title: 'JavaScript', value: 'javascript' },
          { title: 'HTML', value: 'html' },
          { title: 'CSS', value: 'css' },
          { title: 'SCSS', value: 'scss' },
          { title: 'TypeScript', value: 'typescript' },
          { title: 'Shell', value: 'shell' }
        ]
      },
      hidden: ({parent}) => parent?.type !== 'code'
    },
    {
      name: 'embed',
      title: 'Embed Code',
      type: 'text',
      hidden: ({parent}) => !['codepen', 'glitch', 'soundcloud', 'twitter', 'spotify', 'beatport'].includes(parent?.type)
    },
    {
      name: 'description',
      title: 'Description',
      type: 'notThatRichText'
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'color'
    },
    {
      name: 'source',
      title: 'Source',
      type: 'string'
    },
  ],
  preview: {
    select: {
      type: 'type',
      image: 'image',
      youtube: 'youtube',
      video: 'video',
      audio: 'audio',
      lottie: 'lottie',
      rive: 'rive',
      code: 'code',
      embed: 'embed'
    },
    prepare(selection) {
      const { type, image, youtube, video, audio, lottie, rive, code, embed } = selection
      let title = type ? type.charAt(0).toUpperCase() + type.slice(1) : 'No type set'
      let subtitle = ''
      let media = null

      switch(type) {
        case 'image':
          subtitle = image ? 'Image set' : 'No image set'
          media = image
          break
        case 'youtube':
          subtitle = `YouTube ID: ${youtube}`
          break
        case 'video':
          subtitle = 'Video File'
          break
        case 'audio':
          subtitle = 'Audio File'
          break
        case 'lottie':
          subtitle = 'Lottie Animation'
          break
        case 'rive':
          subtitle = 'Rive Animation'
          break
        case 'code':
          subtitle = `Language: ${code?.language || 'Not specified'}`
          break
        case 'codepen':
        case 'glitch':
        case 'soundcloud':
        case 'twitter':
        case 'spotify':
        case 'beatport':
          subtitle = `${type.charAt(0).toUpperCase() + type.slice(1)} Embed`
          break
      }

      return {
        title,
        subtitle,
        media
      }
    }
  }
})