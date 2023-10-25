<script setup lang="ts">
import ThemeToggleButton from '@/components/atoms/navbar/ThemeToggleButton.vue'
import LanguageSelector from '@/components/atoms/navbar/LanguageSelector.vue'
</script>

<template>
  <VList>
    <VListItem>
       <h2 align="center">{{ $t('setting.title') }}</h2> 
    </VListItem>
    <VDivider />
    <ThemeToggleButton />
    <LanguageSelector />
  </VList>
</template>
