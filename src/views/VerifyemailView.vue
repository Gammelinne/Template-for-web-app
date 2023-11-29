<script setup lang="ts">
import VerifEmail from '@/components/mail/VerifEmail.vue'
import { getCurrentInstance } from 'vue'
const instance = getCurrentInstance()?.appContext.config.globalProperties
const emailVerified = () => {
  instance?.router.push('/login')
}
</script>

<template>
  <VContainer>
    <VCard>
      <VerifEmail v-if="instance?.$route.params.email" :email="instance?.$route.params.email.toString()" :email-verified="emailVerified"/>
    </VCard>
  </VContainer>
</template>
