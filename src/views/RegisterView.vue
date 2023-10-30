<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import RegisterForm from '@/components/atoms/auth/RegisterForm.vue'
import VerifEmail from '@/components/mail/VerifEmail.vue'
const instance = getCurrentInstance()?.appContext.config.globalProperties

const tab = ref('one')

const onStepCompleteStepOne = (data: { email: string }) => {
  email.value = data.email || ''
  tab.value = 'two'
}

const onStepCompleteStepTwo = () => {
  if (instance) {
    instance.$router.push('/login')
  }
}

const email = ref('' as string)
</script>

<template>
  <VContainer app>
    <VCard max-width="600" class="mx-auto">
      <VTabs v-model="tab">
        <VTab value="one" disabled>{{ $t('login.stepOne') }}</VTab>
        <VTab value="two" disabled>{{ $t('login.stepTwo') }}</VTab>
      </VTabs>
      <VWindow v-model="tab">
        <VWindowItem value="one">
          <RegisterForm :userCreated="onStepCompleteStepOne" />
        </VWindowItem>
        <VWindowItem value="two">
          <VerifEmail :email="email" :emailVerified="onStepCompleteStepTwo" />
        </VWindowItem>
      </VWindow>
    </VCard>
  </VContainer>
</template>
