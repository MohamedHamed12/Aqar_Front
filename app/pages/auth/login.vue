<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

definePageMeta({ layout: 'auth' })

const { t } = useI18n()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')

async function onLogin() {
  await authStore.login(email.value, password.value)
}
</script>

<template>
  <div class="flex flex-col items-center">
    <h1 class="text-2xl font-bold text-text-dark">
      {{ t('auth.welcomeBack') }}
    </h1>
    <p class="mt-2 text-sm text-text-muted">
      {{ t('auth.signInToAccount') }}
    </p>
    <form class="mt-8 flex w-full flex-col gap-4" @submit.prevent="onLogin">
      <div class="flex flex-col gap-2">
        <Label for="email">{{ t('auth.email') }}</Label>
        <Input id="email" v-model="email" type="email" :placeholder="t('auth.email')" required />
      </div>
      <div class="flex flex-col gap-2">
        <Label for="password">{{ t('auth.password') }}</Label>
        <Input id="password" v-model="password" type="password" :placeholder="t('auth.password')" required />
      </div>
      <Button type="submit" class="w-full">
        {{ t('auth.signIn') }}
      </Button>
    </form>
    <p class="mt-6 text-sm text-text-muted">
      {{ t('auth.noAccount') }}
      <NuxtLink to="/auth/register" class="text-primary hover:underline">
        {{ t('auth.createAccount') }}
      </NuxtLink>
    </p>
  </div>
</template>
