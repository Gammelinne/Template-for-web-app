// pinia-provider.ts
import type { App } from 'vue';
import { createPinia } from 'pinia';
import { useThemeStore } from './store/modules/theme';

const pinia = createPinia();

export const themeStore = useThemeStore(pinia);

export default (app: App<Element>) => {
  app.use(pinia);
  app.provide('themeStore', themeStore);
};
