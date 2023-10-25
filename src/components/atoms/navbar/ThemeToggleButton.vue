<script setup lang="ts">
import { themeStore } from '@/pinia-provider'
import { authStore } from '@/pinia-provider'
const toggleTheme = () => {
  themeStore.toggleTheme()
}
</script>

<template>
  <VBtn
    v-if="authStore.isLoggedIn"
    rounded="0"
    elevation="0"
    block
    size="large"
    aria-label="theme"
    @click="toggleTheme"
  >
    <VIcon>{{ themeStore.isLight ? 'mdi-white-balance-sunny' : 'mdi-moon-waxing-crescent' }} </VIcon
    >&nbsp; {{ $t('setting.theme') }}
  </VBtn>

  <VBtn
    v-else
    @click="toggleTheme"
    :icon="themeStore.isLight ? 'mdi-white-balance-sunny' : 'mdi-moon-waxing-crescent'"
  />
</template>
