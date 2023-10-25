// pinia-provider.ts
import type { App } from 'vue'
import { createPinia } from 'pinia'
import { useThemeStore } from '@/store/modules/theme'
import { useLanguageStore } from '@/store/modules/language'
import { useAuthStore } from '@/store/modules/auth'

const pinia = createPinia()

export const themeStore = useThemeStore(pinia)
export const languageStore = useLanguageStore(pinia)
export const authStore = useAuthStore(pinia)

export default (app: App) => {
  app.use(pinia)
  app.provide('themeStore', themeStore)
  app.provide('languageStore', languageStore)
  app.provide('authStore', authStore)
}
