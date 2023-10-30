<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { authStore } from '@/pinia-provider'
import { io } from 'socket.io-client'
import { themeStore } from '@/pinia-provider'
import NavBar from '@/components/NavBar.vue'
import FooterBar from '@/components/FooterBar.vue'

const setupSocket = async () => {
  if (authStore.isLoggedIn) {
    const socket = io(import.meta.env.VITE_API_URL)
    await authStore.fetchUser()
    socket.emit('join', authStore.user.id)
  }
}

onMounted(() => {
  setupSocket()
})
</script>

<template>
  <VApp :theme="themeStore.isLight ? 'light' : 'dark'">
    <NavBar />
    <VMain>
      <RouterView />
    </VMain>
    <FooterBar />
  </VApp>
</template>
