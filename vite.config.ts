import { fileURLToPath, URL } from 'node:url'
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    VitePWA({
      registerType: 'autoUpdate',

      // workbox options for generateSW (PWA)
      // devOptions: {
      //   enabled: true
      // },
      
      // manifest options
      manifest: {
        name: 'Vite Vue3 Vuetify',
        short_name: 'Vite Vue3 Vuetify',
        theme_color: '#ffffff',
        icons: [
          {
            src: './sun.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: './sun.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'

          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    target: 'esnext'
  }
})
