<script setup lang="ts">
import { authStore } from '@/pinia-provider'
import { ref } from 'vue'

const email = ref('')
const resetPassword = () => {
  authStore.sendResetPasswordEmail(email.value)
  props.toogleForm()
}
const props = defineProps({
  toogleForm: {
    type: Function,
    required: true
  }
})
</script>
<template>
  <VCard max-width="600" class="mx-auto">
    <VCardTitle>{{ $t('login.forgotPassword') }}</VCardTitle>
    <VCardText>
      <VAlert
        class="my-2"
        v-if="authStore.error?.message"
        type="error"
        closable
        icon="mdi-alert-circle-outline"
      >
        {{ authStore.error.message }}
      </VAlert>
      <VTextField
        autocomplete="username"
        variant="outlined"
        v-model="email"
        :label="$t('form.email')"
        type="email"
        required
      />

      <VBtn class="my-2" color="primary" block :loading="authStore.loading" @click="resetPassword">
        {{ $t('login.password.btn.resetPasswordMail') }}
      </VBtn>
      <p class="my-2" @click="props.toogleForm()" style="cursor: pointer">
        {{ $t('login.title') }}
      </p>
    </VCardText>
  </VCard>
</template>
