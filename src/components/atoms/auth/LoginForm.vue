<script setup lang="ts">
import { authStore } from '@/pinia-provider'
import { ref, getCurrentInstance } from 'vue'
const appName = import.meta.env.VITE_APP_NAME
const instance = getCurrentInstance()?.appContext.config.globalProperties

const credential = ref({
  email: '',
  password: ''
})

const login = () => {
  authStore
    .login({
      email: credential.value.email,
      password: credential.value.password
    })
    .then(() => {
      instance?.$router.push('/')
    })
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
    <VCardTitle>{{
      $t('login.description', {
        appName: appName
      })
    }}</VCardTitle>
    <VCardText>
      <VForm>
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
          v-model="credential.email"
          :label="$t('form.email')"
          type="email"
          required
        />
        <VTextField
          variant="outlined"
          autocomplete="current-password"
          v-model="credential.password"
          :label="$t('form.password')"
          type="password"
          required
        />
        <VBtn class="my-2" color="primary" block :loading="authStore.loading" @click="login">
          {{ $t('login.title') }}
        </VBtn>
      </VForm>
      <p class="my-2" @click="$router.push('/register')" style="cursor: pointer">
        {{ $t('register.welcome') }}
      </p>
      <p class="my-2" @click="props.toogleForm()" style="cursor: pointer">
        {{ $t('login.forgotPassword') }}
      </p>
    </VCardText>
  </VCard>
</template>
