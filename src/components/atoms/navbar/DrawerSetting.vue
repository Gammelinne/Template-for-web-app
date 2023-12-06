<script setup lang="ts">
import { authStore } from '@/pinia-provider'
import ThemeToggleButton from '@/components/atoms/navbar/ThemeToggleButton.vue'
import LanguageSelector from '@/components/atoms/navbar/LanguageSelector.vue'
import { getCurrentInstance } from 'vue'
const instance = getCurrentInstance()?.appContext.config.globalProperties
</script>

<template>
  <VList>
    <VListItemTitle class="my-1" align="center">
      {{ authStore.user.firstName }} {{ authStore.user.lastName }}
    </VListItemTitle>
    <VListItemSubtitle>
      <VBtn
        rounded="0"
        size="small"
        @click="instance?.$router.push('profile')"
        block
        elevation="0"
        prepend-icon="mdi-account-outline"
        >{{ $t('drawer.account') }}</VBtn
      >
    </VListItemSubtitle>
    <VDivider />
    <ThemeToggleButton />
    <LanguageSelector />
  </VList>
</template>
