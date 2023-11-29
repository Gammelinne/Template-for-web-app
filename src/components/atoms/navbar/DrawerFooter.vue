<template>
  <VFooter padless class="text-center">
    <VBtn @click="authStore.logout"  prepend-icon="mdi-logout" block elevation="0">{{ $t('logout.title') }}</VBtn>
  </VFooter>
</template>

<script setup lang="ts">
import { authStore } from '@/pinia-provider'
</script>
