<script setup lang="ts">
import { ref, onBeforeMount, getCurrentInstance } from 'vue'
import { authStore } from '@/pinia-provider'
import { io } from 'socket.io-client'
import { toast } from 'vue3-toastify'
const props = defineProps({
  email: {
    type: String,
    required: true
  },
  emailVerified: {
    type: Function,
    required: true
  }
})
const instance = getCurrentInstance()?.appContext.config.globalProperties
const isDisabled = ref(false)
const timeRemaining = ref(0)

onBeforeMount(() => {
  authStore.clearError()
  try {
    const socket = io(import.meta.env.VITE_API_URL)
    console.log(authStore.user)
    socket.emit('join', authStore.user.id)
    socket.on('emailVerified', () => {
      props.emailVerified()
    })
  } catch {
    console.error('error')
  }
})

const resentEmail = () => {
  authStore.resendEmailConfirmation(props.email)
  if (instance) {
    toast(instance.$t('login.sentMailSuccess'), {
      type: 'success'
    })
  }
  checkDisabled()
}

const checkDisabled = () => {
  isDisabled.value = true
  timeRemaining.value = 60

  const intervalId = setInterval(() => {
    timeRemaining.value -= 1

    if (timeRemaining.value === 0) {
      clearInterval(intervalId)
      isDisabled.value = false
    }
  }, 1000)
}
</script>

<template>
  <VCardText>
    <h4>{{ $t('form.emailConfirmation') }}</h4>
    <VBtn color="primary" class="mt-3" block :disabled="isDisabled" @click="resentEmail()">
      {{ $t('form.resendEmail') }} {{ timeRemaining === 0 ? '' : '(' + timeRemaining + 's)' }}
    </VBtn>
  </VCardText>
</template>
