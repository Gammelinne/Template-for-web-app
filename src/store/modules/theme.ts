import { defineStore } from 'pinia'

export const useThemeStore = defineStore({
  id: 'theme',
  state: () => ({
    isLight: false
  }),
  actions: {
    toggleTheme() {
      this.$patch({ isLight: !this.isLight })
    }
  }
})
