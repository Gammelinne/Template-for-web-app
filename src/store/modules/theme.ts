import { defineStore } from 'pinia'

export const useThemeStore = defineStore({
  id: 'theme',
  state: () => ({
    isLight: window.matchMedia('(prefers-color-scheme: light)').matches || false
  }),
  actions: {
    checkUserTheme() {
      if (localStorage.getItem('theme')) {
        localStorage.getItem('theme') === 'true'
          ? this.$patch({ isLight: true })
          : this.$patch({ isLight: false })
      }
    },
    toggleTheme() {
      this.$patch({ isLight: !this.isLight })
      localStorage.setItem('theme', JSON.stringify(this.isLight))
    }
  }
})
