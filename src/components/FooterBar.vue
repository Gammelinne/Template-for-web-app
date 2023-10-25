<script setup lang="ts">
const appName = import.meta.env.VITE_APP_NAME
</script>

<template>
  <VFooter app class="d-flex justify-center">
    <div style="text-align: center">
      {{ appName }} {{ new Date().getFullYear() }} - {{ $t('footer.message') }}
    </div>
  </VFooter>
</template>
