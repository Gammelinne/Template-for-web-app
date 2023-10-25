<script setup lang="ts">
import { languageStore } from '@/pinia-provider'
import { authStore } from '@/pinia-provider'

const setLocale = (locale: string) => {
  languageStore.setLocale(locale)
}
</script>

<template>
  <VMenu offset-y>
    <template v-slot:activator="{ props }">
      <VBtn v-if="authStore.isLoggedIn" rounded="0" elevation="0" size="large" block v-bind="props">
        <VIcon>mdi-translate</VIcon> &nbsp;{{ $t('setting.language') }}
      </VBtn>
      <VBtn v-else icon="mdi-translate" aria-label="Language" v-bind="props" />
    </template>

    <VList>
      <VListItem
        v-for="locale in languageStore.supportedLocales"
        :key="locale"
        @click="setLocale(locale)"
      >
        <VListItemTitle>{{ locale }}</VListItemTitle>
      </VListItem>
    </VList>
  </VMenu>
</template>
