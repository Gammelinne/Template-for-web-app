<script setup lang="ts">
import DrawerSetting from './atoms/navbar/DrawerSetting.vue'
import ThemeToggleButton from '@/components/atoms/navbar/ThemeToggleButton.vue'
import LanguageSelector from '@/components/atoms/navbar/LanguageSelector.vue'
import { authStore } from '@/pinia-provider'
import { ref } from 'vue'

const appName = import.meta.env.VITE_APP_NAME
let drawer = ref(false)

const toggleDrawer = () => {
  drawer.value = !drawer.value
}
</script>

<template>
  <VAppBar app>
    <VToolbarTitle> {{ appName }} </VToolbarTitle>
    <VSpacer />
    <ThemeToggleButton v-if="!authStore.isLoggedIn" />
    <LanguageSelector v-if="!authStore.isLoggedIn" />
    <VBtn v-if="authStore.isLoggedIn" icon @click="toggleDrawer">
      <VAvatar :icon="authStore.user.avatar"></VAvatar>
    </VBtn>
  </VAppBar>
  <VNavigationDrawer
    v-if="authStore.isLoggedIn"
    v-model="drawer"
    location="right"
    temporary
    width="175"
  >
    <DrawerSetting />
  </VNavigationDrawer>
</template>
