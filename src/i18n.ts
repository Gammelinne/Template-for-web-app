import { createI18n } from 'vue-i18n'

// Type for locales
interface Locales {
  [key: string]: Record<string, string>
}

// Function to load locale messages from the locales directory
async function loadLocaleMessages(): Promise<Locales> {
  const locales: Locales = {}
  const files = import.meta.glob('./locales/*.json')

  await Promise.all(
    Object.entries(files as Record<string, any>).map(async ([path, module]) => {
      const matched = path.match(/([A-Za-z0-9-_]+)\./i)
      if (matched && matched.length > 1) {
        const locale = matched[1]
        locales[locale] = (await Promise.resolve(module())).default
      }
    })
  )

  return locales
}

// Fonction to determine the user's current locale
function determineLocale(locales: Locales): string {
  const browserLanguage = navigator.language.split('-')[0] // Use browser locale without region code
  return browserLanguage in locales ? browserLanguage : 'en'
}

const locales = await loadLocaleMessages()

// Create a new instance of VueI18n
const i18n = createI18n({
  legacy: false,
  locale: determineLocale(locales),
  fallbackLocale: 'en',
  messages: locales,
})

export default i18n
