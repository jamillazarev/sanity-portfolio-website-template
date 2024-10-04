import { defineType, defineField } from 'sanity'
import { countries } from 'countries-list'

const countryList = Object.entries(countries).map(([code, country]) => ({
  title: `${country.name} (${code})`,
  value: code
})).sort((a, b) => a.title.localeCompare(b.title))

export default defineType({
  name: 'settings',
  title: 'Global Configuration',
  type: 'document',
  fieldsets: [
    {
      name: 'analytics',
      title: 'Analytics and Tracking',
      options: { collapsible: true, collapsed: true }
    }
  ],
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'localizedString',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'localizedImage'
    }),
    defineField({
      name: 'defaultLanguage',
      type: 'reference',
      to: [{ type: 'language' }],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'languageCountries',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'language',
              type: 'reference',
              to: [{ type: 'language' }],
              validation: Rule => Rule.required()
            },
            {
              name: 'countries',
              type: 'array',
              of: [
                {
                  type: 'string',
                  options: {
                    list: countryList,
                  }
                }
              ],
              validation: Rule => Rule.unique()
            }
          ],
          preview: {
            select: {
              languageKey: 'language.key',
              languageCode: 'language.code',
              countries: 'countries'
            },
            prepare({ languageKey, languageCode, countries }) {
              return {
                title: languageKey || languageCode || 'Unnamed language',
                subtitle: countries && countries.length > 0 
                  ? countries.map(code => {
                      const country = countryList.find(c => c.value === code);
                      return country ? country.title : code;
                    }).join(', ') 
                  : 'No countries'
              }
            }
          }
        }
      ],
      validation: Rule => Rule.custom(validateLanguageCountries)
    }),
    defineField({
      name: 'meta',
      title: 'Meta',
      type: 'meta',
    }),
    defineField({
      name: 'facebookDomainVerification',
      title: 'Facebook Domain Verification',
      type: 'string',
      fieldset: 'analytics'
    }),
    defineField({
      name: 'metaPixel',
      title: 'Meta Pixel',
      type: 'text',
      fieldset: 'analytics'
    }),
    defineField({
      name: 'xPixel',
      title: 'X Pixel',
      type: 'text',
      fieldset: 'analytics'
    }),
    defineField({
      name: 'spotifyPixel',
      title: 'Spotify Pixel',
      type: 'text',
      fieldset: 'analytics'
    }),
    defineField({
      name: 'linkedinInsight',
      title: 'LinkedIn Insight',
      type: 'text',
      fieldset: 'analytics'
    }),
    defineField({
      name: 'umamiTracking',
      title: 'Umami Tracking',
      type: 'text',
      fieldset: 'analytics'
    }),
    defineField({
      name: 'hotjarTracking',
      title: 'Hotjar Tracking',
      type: 'text',
      fieldset: 'analytics'
    }),
    defineField({
      name: 'postHogTracking',
      title: 'PostHog Tracking',
      type: 'text',
      fieldset: 'analytics'
    }),
  ],
  preview: {
    select: {
      siteName: 'siteName.translations[0].value',
      logo: 'logo',
    },
    prepare({ siteName, logo }) {
      let media = null;
      if (logo) {
        media = logo.useGlobalImage ? logo.globalImage : (logo.localizedImages && logo.localizedImages[0]?.image);
      }
      return {
        title: 'Global Configuration',
        subtitle: siteName ? `Site Name: ${siteName}` : 'Site Name not set',
        media: media,
      }
    }
  }
})
function validateLanguageCountries(languageCountries) {
  if (!languageCountries || !Array.isArray(languageCountries)) {
    return true;
  }

  const languageIds = new Set();
  for (const item of languageCountries) {
    if (!item.language || !item.language._ref) {
      return 'Each language-country pair must have a language selected';
    }
    if (languageIds.has(item.language._ref)) {
      return 'Each language can only appear once in the language-country pairs';
    }
    languageIds.add(item.language._ref);

    if (!item.countries || !Array.isArray(item.countries) || item.countries.length === 0) {
      return 'Each language must have at least one country selected';
    }
  }

  return true;
}
