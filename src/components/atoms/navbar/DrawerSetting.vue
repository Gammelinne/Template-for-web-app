<script setup lang="ts">
import { authStore } from '@/pinia-provider'
import ThemeToggleButton from '@/components/atoms/navbar/ThemeToggleButton.vue'
import LanguageSelector from '@/components/atoms/navbar/LanguageSelector.vue'
</script>

<template>
  <VList>
    <VListItemTitle class="my-1" align="center">
      {{ authStore.user.firstName }} {{ authStore.user.lastName }}
    </VListItemTitle>
    <VListItemSubtitle class="my-1" align="center">
      {{ authStore.user.email }}
    </VListItemSubtitle>
    <VDivider />
    <ThemeToggleButton />
    <LanguageSelector />
  </VList>
</template>
