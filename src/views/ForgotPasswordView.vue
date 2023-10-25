<script setup lang="ts">
import { getCurrentInstance, ref } from 'vue'
import { authStore } from '@/pinia-provider'
import PasswordValidator from '@/components/atoms/auth/PasswordValidator.vue'
import { toast } from 'vue3-toastify'
const instance = getCurrentInstance()?.appContext.config.globalProperties
const userData = ref({
  password: '',
  password_confirmation: ''
})

const resetPassword = () => {
  authStore.resetPassword(
    userData.value.password,
    userData.value.password_confirmation,
    instance?.$router.currentRoute.value.query.token
  )
  if (instance) {
    toast(instance?.$t('login.password.success'))
    instance.$router.push('/login')
  }
}
</script>
<template>
  <VCard max-width="600" class="mx-auto my-5">
    <VCardTitle>
      {{ $t('login.password.title') }}
    </VCardTitle>
    <VCardText>
      <VForm>
        <VTextField
          class="my-3"
          variant="outlined"
          autocomplete="new-password"
          v-model="userData.password"
          :label="$t('form.password')"
          :error-messages="authStore.getFieldError('password')"
          type="password"
          required
        />
        <VTextField
          class="my-3"
          variant="outlined"
          autocomplete="new-password"
          v-model="userData.password_confirmation"
          :label="$t('form.password')"
          :error-messages="authStore.getFieldError('password_confirmation')"
          type="password"
          required
        />
      </VForm>
      <PasswordValidator :userData="userData" />
      <VBtn
        class="my-2"
        color="primary"
        block
        :loading="authStore.loading"
        @click="resetPassword()"
      >
        {{ $t('login.password.btn.resetPassword') }}
      </VBtn>
    </VCardText>
  </VCard>
</template>
