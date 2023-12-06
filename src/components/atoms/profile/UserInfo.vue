<script setup lang="ts">
import { authStore } from '@/pinia-provider'
import { ref } from 'vue'

const openInputFile = () => {
  const fileInput = document.getElementById('fileInput')
  if (fileInput) {
    fileInput.click()
  }
}
var avatar = ref()
const editAvatar = () => {
  authStore.updateUser(avatar.value)
}
</script>

<template>
  <VContainer>
    <VCard
      :title="authStore.user.username"
      :subtitle="authStore.user.firstName + ' ' + authStore.user.lastName"
    >
      <template v-slot:prepend>
        <VBadge location="bottom end">
          <template v-slot:badge>
            <VTooltip style="cursor: pointer" :text="$t('profile.editAvatar')">
              <template v-slot:activator="{ props }">
                <VIcon v-bind="props" icon="mdi-tooltip-edit" @click="openInputFile" />
              </template>
            </VTooltip>
            <VFileInput
              accept="image/*"
              id="fileInput"
              v-model="avatar"
              style="display: none"
              @update:model-value="editAvatar"
            />
          </template>
          <VAvatar size="75" :image="authStore.user.avatar + '?v=' + Math.random()" />
        </VBadge>
      </template>
      <VCardText>
        <VCardItem prepend-icon="mdi-email-outline">{{ authStore.user.email }}</VCardItem>
      </VCardText>
    </VCard>
  </VContainer>
</template>
