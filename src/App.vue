<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div>
    {{ $t('message.hello') }}
  </div>
  <RouterView />
</template>

<style scoped>

</style>
