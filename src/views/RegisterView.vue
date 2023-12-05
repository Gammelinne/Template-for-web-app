<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import RegisterForm from '@/components/atoms/auth/RegisterForm.vue'
import VerifEmail from '@/components/mail/VerifEmail.vue'
const instance = getCurrentInstance()?.appContext.config.globalProperties

const onStepCompleteStepOne = (data: { email: string }) => {
  email.value = data.email || ''
  step.value += 1
}

const onStepCompleteStepTwo = () => {
  if (instance) {
    instance.$router.push('/login')
  }
}
var step = ref(1)
const email = ref('' as string)
</script>

<template>
  <VContainer app>
    <VCard max-width="600" class="mx-auto">
      <VStepper hide-actions v-model="step">
        <VStepperHeader>
          <VStepperItem :complete="step !== 2 ? false : true" :title="$t('login.stepOne')" :value="1"/>
          <VDivider></VDivider>
          <VStepperItem :title="$t('login.stepTwo')" :value="2"/>
        </VStepperHeader>
        <VStepperWindow>
          <VStepperWindowItem :value="1">
            <RegisterForm :userCreated="onStepCompleteStepOne" />
          </VStepperWindowItem>
          <VStepperWindowItem :value="2">
            <VerifEmail :email="email" :emailVerified="onStepCompleteStepTwo" />
          </VStepperWindowItem>
        </VStepperWindow>
      </VStepper>
    </VCard>
  </VContainer>
</template>
