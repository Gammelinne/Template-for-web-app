<script setup lang="ts">
import { themeStore } from '../pinia-provider'
const appName = import.meta.env.VITE_APP_NAME
</script>
<template>
  <VApp :theme="themeStore.isLight ? 'light' : 'dark'">
    <VAppBar app>
      <VToolbarTitle> {{appName}} </VToolbarTitle>
      <VBtn @click="toggleTheme">Theme = {{ themeStore.isLight }}</VBtn>
    </VAppBar>
  </VApp>
</template>

<script lang="ts">
export default {
  name: 'NavBar',
  created() {},
  methods: {
    toggleTheme() {
      themeStore.toggleTheme()
    }
  }
}
</script>
