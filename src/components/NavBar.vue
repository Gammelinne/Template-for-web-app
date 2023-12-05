<script setup lang="ts">
import DrawerSetting from './atoms/navbar/DrawerSetting.vue'
import DrawerFooter from '@/components/atoms/navbar/DrawerFooter.vue'
import ThemeToggleButton from '@/components/atoms/navbar/ThemeToggleButton.vue'
import LanguageSelector from '@/components/atoms/navbar/LanguageSelector.vue'
import { authStore } from '@/pinia-provider'
import { getCurrentInstance } from 'vue'
import { ref } from 'vue'
const instance = getCurrentInstance()?.appContext.config.globalProperties
const appName = import.meta.env.VITE_APP_NAME
let drawer = ref(false)

const toggleDrawer = () => {
  drawer.value = !drawer.value
}
</script>

<template>
  <VAppBar app>
    <VToolbarTitle>
      <span  @click="instance?.$router.push('/')" style="cursor: pointer">{{ appName }}</span>
    </VToolbarTitle>
    <VSpacer />
    <ThemeToggleButton v-if="!authStore.isLoggedIn" />
    <LanguageSelector v-if="!authStore.isLoggedIn" />
    <VBtn v-if="authStore.isLoggedIn" icon @click="toggleDrawer">
      <VAvatar :image="authStore.user.avatar + '?v=' + Math.random()" />
    </VBtn>
  </VAppBar>
  <VNavigationDrawer
    v-if="authStore.isLoggedIn"
    v-model="drawer"
    location="right"
    temporary
    width="200"
  >
    <DrawerSetting />
    <template v-slot:append>
      <DrawerFooter />
    </template>
  </VNavigationDrawer>
</template>
