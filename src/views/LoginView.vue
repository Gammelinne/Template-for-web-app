<script setup lang="ts">
import { ref } from 'vue'
import LoginForm from '@/components/atoms/auth/LoginForm.vue'
import ResetPasswordMail from '@/components/mail/ResetPasswordEmail.vue'
const toogleForm = () => {
  showResetPassword.value = !showResetPassword.value
}
var showResetPassword = ref(false)
</script>

<template>
  <VContainer app>
    <LoginForm v-if="!showResetPassword" :toogleForm="toogleForm" />
    <ResetPasswordMail v-else :toogleForm="toogleForm" />
  </VContainer>
</template>
