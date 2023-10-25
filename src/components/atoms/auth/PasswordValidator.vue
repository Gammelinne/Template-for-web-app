<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps(['userData'])

const isPasswordLengthValid = computed(
  () => props.userData.password.length >= 8 && props.userData.password.length <= 32
)
const isPasswordUpperCaseValid = computed(() => props.userData.password.match(/[A-Z]/g))
const isPasswordNumberValid = computed(() => props.userData.password.match(/[0-9]/g))
const isPasswordSpecialCharValid = computed(() =>
  props.userData.password.match(/[!@#$%^&*(),.?":{}|<>]/g)
)
</script>

<template>
  <VCard class="mb-2">
    <VCardText>
      <!--Password length-->
      <div :style="{ color: isPasswordLengthValid ? 'green' : 'red' }">
        {{ $t('form.passwordLength') }}
        <VIcon v-if="isPasswordLengthValid">mdi-check</VIcon>
        <VIcon v-else>mdi-close</VIcon>
      </div>
      <!--Password uppercase-->
      <div :style="{ color: isPasswordUpperCaseValid ? 'green' : 'red' }">
        {{ $t('form.passwordUpperCase') }}
        <VIcon v-if="isPasswordUpperCaseValid">mdi-check</VIcon>
        <VIcon v-else>mdi-close</VIcon>
      </div>
      <!--Password number-->
      <div :style="{ color: isPasswordNumberValid ? 'green' : 'red' }">
        {{ $t('form.passwordNumber') }}
        <VIcon v-if="isPasswordNumberValid">mdi-check</VIcon>
        <VIcon v-else>mdi-close</VIcon>
      </div>
      <!--Password special character-->
      <div :style="{ color: isPasswordSpecialCharValid ? 'green' : 'red' }">
        {{ $t('form.passwordSpecialChar') }}
        <VIcon v-if="isPasswordSpecialCharValid">mdi-check</VIcon>
        <VIcon v-else>mdi-close</VIcon>
      </div>
      <!--Password match-->
      <div
        :style="{ color: userData.password === userData.password_confirmation ? 'green' : 'red' }"
      >
        {{ $t('form.passwordMatch') }}
        <VIcon v-if="userData.password === userData.password_confirmation">mdi-check</VIcon>
        <VIcon v-else>mdi-close</VIcon>
      </div>
    </VCardText>
  </VCard>
</template>
