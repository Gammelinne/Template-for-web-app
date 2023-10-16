<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <header>
    <NavBar />
  </header>
  <RouterView />
</template>

<script lang="ts">
export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>
<style scoped></style>
