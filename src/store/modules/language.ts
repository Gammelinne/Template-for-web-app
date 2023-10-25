// store/modules/language.ts
import { defineStore } from 'pinia'
import i18n from '@/i18n'

export const useLanguageStore = defineStore({
  id: 'language',
  state: () => ({
    locale: i18n.global.locale.value,
    supportedLocales : ['en', 'fr']
  }),
  actions: {
    setLocale(locale: string) {
      i18n.global.locale.value = locale;
      this.locale = locale;
    },
  },
})
