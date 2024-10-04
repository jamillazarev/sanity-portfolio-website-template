import { useEffect } from 'react'
import { useClient } from 'sanity'
import { map } from 'rxjs/operators'

export const useSettingsHook = (document) => {
  const client = useClient()

  useEffect(() => {
    if (document.type === 'settings') {
      const updateLanguages = async () => {
        const languages = await client.fetch('*[_type == "language"]')
        languages.forEach(async (lang) => {
          const isActive = lang._id === document.defaultLanguage._ref
          await client.patch(lang._id).set({ isActive }).commit()
        })
      }
      updateLanguages()
    }
  }, [document])

  return null
}