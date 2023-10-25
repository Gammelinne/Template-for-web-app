<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { authStore } from '@/pinia-provider'
import PasswordValidator from '@/components/atoms/auth/PasswordValidator.vue'
const appName = import.meta.env.VITE_APP_NAME

const props = defineProps({
  userCreated: {
    type: Function,
    required: true
  }
})
onBeforeMount(() => {
  authStore.clearError()
})

const register = () => {
  authStore.register(registerData.value).then((isRegistered: boolean) => {
    if (isRegistered) {
      props.userCreated(registerData.value)
    }
  })
}

const showPassword = ref(false)

const registerData = ref({
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  password_confirmation: ''
})
</script>

<template>
  <VCardSubtitle class="mt-5">{{
    $t('register.description', {
      appName: appName
    })
  }}</VCardSubtitle>
  <VCardText>
    <VForm>
      <VRow>
        <VCol cols="12" md="6">
          <VTextField
            class="my-1"
            variant="outlined"
            v-model="registerData.firstName"
            :label="$t('form.firstName')"
            type="text"
            required
            :error-messages="authStore.getFieldError('firstName')"
          />
        </VCol>
        <VCol cols="12" md="6">
          <VTextField
            class="my-1"
            variant="outlined"
            v-model="registerData.lastName"
            :label="$t('form.lastName')"
            type="text"
            required
            :error-messages="authStore.getFieldError('lastName')"
          />
        </VCol>
      </VRow>
      <VTextField
        class="my-1"
        variant="outlined"
        v-model="registerData.username"
        :label="$t('form.username')"
        type="text"
        required
        :error-messages="authStore.getFieldError('username')"
      />
      <VTextField
        class="my-1"
        autocomplete="username"
        variant="outlined"
        v-model="registerData.email"
        :label="$t('form.email')"
        type="email"
        required
        :error-messages="authStore.getFieldError('email')"
      />
      <VRow>
        <VCol cols="12" md="6">
          <VTextField
            class="my-1"
            variant="outlined"
            autocomplete="new-password"
            v-model="registerData.password"
            :label="$t('form.password')"
            :type="showPassword ? 'text' : 'password'"
            required
            :error-messages="authStore.getFieldError('password')"
          >
          </VTextField>
        </VCol>
        <VCol cols="12" md="6">
          <VTextField
            class="my-1"
            variant="outlined"
            autocomplete="new-password"
            v-model="registerData.password_confirmation"
            :label="$t('form.confirmPassword')"
            :type="showPassword ? 'text' : 'password'"
            required
            :error-messages="authStore.getFieldError('password_confirmation')"
          >
            <template #append>
              <VBtn
                @click="showPassword = !showPassword"
                :icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              ></VBtn>
            </template>
          </VTextField>
        </VCol>
      </VRow>
      <PasswordValidator v-if="registerData.password.length > 0" :userData="registerData" />
      <VBtn
        color="primary"
        block
        :loading="authStore.loading"
        @click="register()"
        append-icon="mdi-arrow-right"
      >
        {{ $t('form.continue') }}
      </VBtn>
    </VForm>
  </VCardText>
  <p class="mb-2 ml-5" @click="$router.push('/login')" style="cursor: pointer">
    {{ $t('login.welcomeback') }}
  </p>
</template>
