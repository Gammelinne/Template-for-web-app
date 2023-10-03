import { createI18n } from 'vue-i18n';

// Function to load locale messages from the locales directory

async function loadLocaleMessages() {
  const locales: Record<string, any> = {};
  const files = import.meta.glob('./locales/*.json');

  await Promise.all(Object.entries(files as Record<string, any>).map(async ([path, module]) => {
    const matched = path.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      locales[locale] = (await Promise.resolve(module())).default;
    }
  }));

  return locales;
}

// Fonction utilitaire to determine the user's locale
function determineLocale() {
  const browserLanguage = navigator.language.split('-')[0]; // Use browser locale without region code
  return browserLanguage in locales ? browserLanguage : 'en';
}

const locales = await loadLocaleMessages();

// Create a new instance of VueI18n
const i18n = createI18n({
  legacy: false,
  locale: determineLocale(),
  fallbackLocale: 'en',
  messages: locales,
});

export default i18n;
