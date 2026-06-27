<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

definePageMeta({ layout: 'auth' })

const { t } = useI18n()
const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')

async function onRegister() {
  console.warn('Register:', { name: name.value, email: email.value })
  router.push('/auth/login')
}
</script>

<template>
  <div class="flex flex-col items-center">
    <h1 class="text-2xl font-bold text-text-dark">
      {{ t('auth.registerTitle') }}
    </h1>
    <p class="mt-2 text-sm text-text-muted">
      {{ t('auth.registerDesc') }}
    </p>
    <form class="mt-8 flex w-full flex-col gap-4" @submit.prevent="onRegister">
      <div class="flex flex-col gap-2">
        <Label for="name">{{ t('auth.name') }}</Label>
        <Input id="name" v-model="name" type="text" :placeholder="t('auth.name')" required />
      </div>
      <div class="flex flex-col gap-2">
        <Label for="email">{{ t('auth.email') }}</Label>
        <Input id="email" v-model="email" type="email" :placeholder="t('auth.email')" required />
      </div>
      <div class="flex flex-col gap-2">
        <Label for="password">{{ t('auth.password') }}</Label>
        <Input id="password" v-model="password" type="password" :placeholder="t('auth.password')" required />
      </div>
      <Button type="submit" class="w-full">
        {{ t('auth.createAccount') }}
      </Button>
    </form>
    <p class="mt-6 text-sm text-text-muted">
      {{ t('auth.alreadyHaveAccount') }}
      <NuxtLink to="/auth/login" class="text-primary hover:underline">
        {{ t('auth.signIn') }}
      </NuxtLink>
    </p>
  </div>
</template>
