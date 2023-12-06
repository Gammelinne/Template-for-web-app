<script setup lang="ts">
import { getCurrentInstance, onBeforeMount, ref } from 'vue'
import { authStore } from '@/pinia-provider'
import PasswordValidator from '@/components/atoms/auth/PasswordValidator.vue'
const instance = getCurrentInstance()?.appContext.config.globalProperties

onBeforeMount(() => {
  if (instance?.$route.query['token'] == null) {
    instance?.$router.push('/login')
  }
})
const changePassword = async () => {
  await authStore.resetPassword(
    registerData.value.password,
    registerData.value.password_confirmation,
    instance?.$route.query['token']
  )
}
const showPassword = ref(false)
const registerData = ref({
  password: '',
  password_confirmation: ''
})
</script>

<template>
  <VContainer>
    <VCard>
      <VCardTitle class="text-center">{{ $t('resetPassword.title') }}</VCardTitle>
      <VCardItem>
        <VForm>
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
            @click="changePassword()"
            append-icon="mdi-arrow-right"
          >
            {{ $t('form.continue') }}
          </VBtn>
        </VForm>
      </VCardItem>
    </VCard>
  </VContainer>
</template>
