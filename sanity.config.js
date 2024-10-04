import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {muxInput} from 'sanity-plugin-mux-input'
import {codeInput} from '@sanity/code-input'
import {umamiTool} from 'sanity-plugin-umami-analytics-tool'
import {giphyAssetSourcePlugin} from 'sanity-plugin-asset-source-giphy'
import {CogIcon, TranslateIcon, LinkIcon, DocumentTextIcon, TagIcon, StarIcon, UserIcon, CommentIcon, FolderIcon, DocumentIcon, DocumentsIcon, StackCompactIcon} from '@sanity/icons'
import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash'
import {contentGraphView} from 'sanity-plugin-graph-view'
import {media as mediaPlugin} from 'sanity-plugin-media'
import {colorInput} from '@sanity/color-input'
import {SettingsForm} from './components/SettingsForm'
import {useSettingsHook} from './documentHooks'
import language from './schemaTypes/language'
import settings from './schemaTypes/settings'
import localizedString from './schemaTypes/fields/localizedString'
import localizedText from './schemaTypes/fields/localizedText'
import localizedImage from './schemaTypes/fields/localizedImage'
import localizedNotThatRichText from './schemaTypes/fields/localizedNotThatRichText'
import media from './schemaTypes/fields/media'
import mediaGallery from './schemaTypes/fields/mediaGallery'
import linkType from './schemaTypes/linkType'
import localizedLink from './schemaTypes/fields/localizedLink'
import linkGroup from './schemaTypes/fields/linkGroup'
import interfaceTexts from './schemaTypes/interfaceTexts'
import taxonomy from './schemaTypes/taxonomy'
import meta from './schemaTypes/fields/meta'
import person from './schemaTypes/person'
import brand from './schemaTypes/brand'
import localizedAlmostRichText from './schemaTypes/fields/localizedAlmostRichText'
import feedback from './schemaTypes/feedback'
import project from './schemaTypes/project'
import post from './schemaTypes/post'
import localizedTextWithLinks from './schemaTypes/fields/localizedTextWithLinks'
import postLink from './schemaTypes/fields/postLink'
import list from './schemaTypes/list'
import internalLink from './schemaTypes/fields/internalLink'
import nav from './schemaTypes/nav'
import internalLinkAnnotation from './schemaTypes/annotations/internalLinkAnnotation'
import externalLinkAnnotation from './schemaTypes/annotations/externalLinkAnnotation'
import internalLinkRichText from './schemaTypes/fields/internalLinkRichText'
import content from './schemaTypes/fields/content'
import localizedContent from './schemaTypes/fields/localizedContent'
import richTextMedia from './schemaTypes/fields/richTextMedia'
import richTextMediaGallery from './schemaTypes/fields/richTextMediaGallery'
import notThatRichText from './schemaTypes/fields/notThatRichText'

export default defineConfig({
  name: 'default',
  title: 'sanity-portfolio-website-template',

  projectId: '',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Global Configuration')
              .id('globalConfiguration')
              .icon(CogIcon)
              .child(
                S.editor()
                  .id('globalConfiguration')
                  .schemaType('settings')
                  .documentId('globalConfiguration')
              ),
            S.listItem()
              .title('Languages')
              .icon(TranslateIcon)
              .child(
                S.documentTypeList('language')
                  .title('Languages')
              ),
            S.listItem()
              .title('Link Types')
              .icon(LinkIcon)
              .child(
                S.documentTypeList('linkType')
                  .title('Link Types')
              ),
            S.listItem()
              .title('Interface Texts')
              .id('interfaceTextsList')
              .icon(DocumentTextIcon)
              .child(
                S.documentTypeList('interfaceTexts')
                  .title('Interface Texts')
              ),
            S.listItem()
              .title('Taxonomies')
              .icon(TagIcon)
              .child(
                S.documentTypeList('taxonomy')
                  .title('Taxonomies')
              ),
            S.listItem()
              .title('Brands')
              .icon(StarIcon)
              .child(
                S.documentTypeList('brand')
                  .title('Brands')
              ),
            S.listItem()
              .title('Persons')
              .icon(UserIcon)
              .child(
                S.documentTypeList('person')
                  .title('Persons')
              ),
            S.listItem()
              .title('Feedback')
              .icon(CommentIcon)
              .child(
                S.documentTypeList('feedback')
                  .title('Feedback')
              ),
            S.listItem()
              .title('Projects')
              .icon(FolderIcon)
              .child(
                S.documentTypeList('project')
                  .title('Projects')
              ),
            S.listItem()
              .title('Posts')
              .icon(DocumentIcon)
              .child(
                S.documentTypeList('post')
                  .title('Posts')
              ),
            S.listItem()
              .title('Lists')
              .icon(DocumentsIcon)
              .child(
                S.documentTypeList('list')
                  .title('Lists')
              ),
            S.listItem()
              .title('Navs')
              .icon(StackCompactIcon)
              .child(
                S.documentTypeList('nav')
                  .title('Navs')
              ),
            ...S.documentTypeListItems().filter(listItem => 
              !['settings', 'language', 'linkType', 'interfaceTexts', 'taxonomy', 'brand', 'person', 'feedback', 'project', 'post', 'list', 'nav'].includes(listItem.getId())
            )
          ]),
    }),
    visionTool(),
    muxInput({
      mp4_support: 'standard',
      mux: {
        accessTokenId: () => process.env.MUX_ACCESS_TOKEN_ID,
        secretKey: () => process.env.MUX_SECRET_KEY
      }
    }),
    codeInput(),
    umamiTool({
      url: '',
    }),
    giphyAssetSourcePlugin({
      apiKey: ''
    }),
    unsplashImageAsset(),
    contentGraphView({}),
    mediaPlugin(),
    colorInput()
  ],

  schema: {
    types: [
      language,
      settings,
      localizedString,
      localizedText,
      localizedImage,
      localizedNotThatRichText,
      media,
      mediaGallery,
      linkType,
      localizedLink,
      linkGroup,
      interfaceTexts,
      taxonomy,
      meta,
      person,
      brand,
      localizedAlmostRichText,
      feedback,
      project,
      post,
      localizedTextWithLinks,
      postLink,
      list,
      internalLink,
      nav,
      internalLinkAnnotation,
      externalLinkAnnotation,
      internalLinkRichText,
      content,
      localizedContent,
      richTextMedia,
      richTextMediaGallery,
      notThatRichText
    ],
  },

  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter((templateItem) => templateItem.templateId !== 'settings')
      }
      return prev
    },
    actions: (prev, { schemaType }) => {
      if (schemaType === 'settings') {
        return prev.filter(({ action }) => !['unpublish', 'delete', 'duplicate'].includes(action))
      }
      return prev
    },
    components: {
      form: {
        settings: SettingsForm
      }
    }
  },

  documentHooks: {
    settings: useSettingsHook,
  },

  tools: (prev, {currentUser}) => {
    const isAdmin = currentUser?.roles.some(role => role.name === 'administrator')
    if (!isAdmin) {
      return prev.filter(tool => tool.name !== 'global-settings')
    }
    return prev
  }
})
