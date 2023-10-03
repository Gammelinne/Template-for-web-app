<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div>
    <v-btn>Test Vuetify</v-btn>
    {{ $t('message.hello') }}
  </div>
  <RouterView />
</template>

<style scoped>

</style>
