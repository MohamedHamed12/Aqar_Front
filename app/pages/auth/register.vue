<script setup lang="ts">
import { BarChart3Icon, Building2Icon, EyeIcon, EyeOffIcon, LockIcon, MailIcon, PhoneIcon, UserIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

definePageMeta({ layout: 'auth' })

const { t } = useI18n()
const localePath = useLocalePath()

const name = ref('')
const email = ref('')
const phone = ref('')
const password = ref('')
const agreeTerms = ref(false)
const role = ref<'investor' | 'agent'>('investor')
const showPassword = ref(false)

async function onRegister() {
  const api = useApi()
  await api.post('/api/v1/auth/register', { email: email.value, password: password.value })
  navigateTo(localePath('/auth/login'))
}
</script>

<template>
  <div class="relative hidden w-[640px] flex-col items-center justify-center overflow-hidden bg-[#0050CB] lg:flex">
    <img src="/images/register.png" alt="" class="absolute inset-0 size-full object-cover">
    <div class="absolute inset-0 bg-[#0050CB]/60" />
    <div class="relative z-10 flex max-w-[512px] flex-col gap-4">
      <h1 class="text-[32px] font-black leading-10 -tracking-[0.8px] text-white">
        {{ t('appName') }}
      </h1>
      <p class="text-xl font-semibold leading-8 text-white/90">
        {{ t('auth.registerBrandDesc') }}
      </p>
      <div class="flex gap-4 pt-2">
        <div class="flex-1 rounded-xl border border-white/20 bg-white/80 p-4 backdrop-blur-[6px]">
          <BarChart3Icon class="mb-1 size-5 text-white" />
          <h3 class="text-sm font-semibold leading-4 tracking-[0.7px] text-white">
            {{ t('auth.marketInsights') }}
          </h3>
          <p class="mt-1 text-sm leading-5 text-white/80">
            {{ t('auth.marketInsightsDesc') }}
          </p>
        </div>
        <div class="flex-1 rounded-xl border border-white/20 bg-white/80 p-4 backdrop-blur-[6px]">
          <Building2Icon class="mb-1 size-5 text-white" />
          <h3 class="text-sm font-semibold leading-4 tracking-[0.7px] text-white">
            {{ t('auth.verifiedListings') }}
          </h3>
          <p class="mt-1 text-sm leading-5 text-white/80">
            {{ t('auth.verifiedListingsDesc') }}
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="flex flex-1 items-center justify-center bg-white p-8">
    <div class="flex w-full max-w-[480px] flex-col gap-8">
      <div class="flex flex-col gap-1">
        <h1 class="text-[32px] font-semibold leading-10 -tracking-[0.32px] text-text-dark">
          {{ t('auth.registerTitle') }}
        </h1>
        <p class="text-base leading-6 text-text-secondary">
          {{ t('auth.registerDesc') }}
        </p>
      </div>

      <div class="flex gap-2 rounded-lg bg-[#E9EDFF] p-1">
        <button
          class="flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-semibold leading-4 tracking-[0.7px] transition-colors"
          :class="role === 'investor' ? 'bg-[#0050CB] text-white shadow-sm' : 'text-text-secondary'"
          @click="role = 'investor'"
        >
          <UserIcon class="size-2.5" />
          {{ t('auth.investor') }}
        </button>
        <button
          class="flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-semibold leading-4 tracking-[0.7px] transition-colors"
          :class="role === 'agent' ? 'bg-[#0050CB] text-white shadow-sm' : 'text-text-secondary'"
          @click="role = 'agent'"
        >
          <Building2Icon class="size-2.5" />
          {{ t('auth.agent') }}
        </button>
      </div>

      <form class="flex flex-col gap-6" @submit.prevent="onRegister">
        <div class="flex flex-col gap-1.5">
          <Label for="name" class="text-sm font-semibold leading-4 tracking-[0.7px] text-text-secondary">
            {{ t('auth.name') }}
          </Label>
          <div class="relative">
            <Input
              id="name"
              v-model="name"
              type="text"
              :placeholder="t('auth.namePlaceholder')"
              required
              class="h-12 w-full rounded-lg border border-border-color bg-white pl-11 pr-4 text-base text-text-dark placeholder:text-text-muted"
            />
            <UserIcon class="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
          </div>
        </div>

        <div class="flex flex-col gap-1.5">
          <Label for="email" class="text-sm font-semibold leading-4 tracking-[0.7px] text-text-secondary">
            {{ t('auth.emailLabel') }}
          </Label>
          <div class="relative">
            <Input
              id="email"
              v-model="email"
              type="email"
              :placeholder="t('auth.emailPlaceholder')"
              required
              class="h-12 w-full rounded-lg border border-border-color bg-white pl-11 pr-4 text-base text-text-dark placeholder:text-text-muted"
            />
            <MailIcon class="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
          </div>
        </div>

        <div class="flex flex-col gap-1.5">
          <Label for="phone" class="text-sm font-semibold leading-4 tracking-[0.7px] text-text-secondary">
            {{ t('auth.phoneLabel') }}
          </Label>
          <div class="flex">
            <div class="flex items-center rounded-l-lg border border-r-0 border-border-color bg-[#F1F3FF] px-4 text-base text-text-secondary">
              +966
            </div>
            <div class="relative flex-1">
              <Input
                id="phone"
                v-model="phone"
                type="tel"
                :placeholder="t('auth.phonePlaceholder')"
                required
                class="h-12 w-full rounded-r-lg border border-border-color bg-white pl-4 pr-11 text-base text-text-dark placeholder:text-text-muted"
              />
              <PhoneIcon class="absolute right-4 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-1.5">
          <Label for="password" class="text-sm font-semibold leading-4 tracking-[0.7px] text-text-secondary">
            {{ t('auth.password') }}
          </Label>
          <div class="relative">
            <Input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              :placeholder="t('auth.passwordPlaceholder')"
              required
              class="h-12 w-full rounded-lg border border-border-color bg-white pl-11 pr-11 text-base text-text-dark placeholder:text-text-muted"
            />
            <LockIcon class="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
            <button
              type="button"
              class="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted"
              @click="showPassword = !showPassword"
            >
              <EyeIcon v-if="!showPassword" class="size-[22px]" />
              <EyeOffIcon v-else class="size-[22px]" />
            </button>
          </div>
          <p class="px-1 text-xs font-medium leading-4 text-text-muted">
            {{ t('auth.passwordHint') }}
          </p>
        </div>

        <div class="flex items-center gap-4 pt-1">
          <input
            id="terms"
            v-model="agreeTerms"
            type="checkbox"
            class="size-5 rounded border-border-color text-primary focus:ring-primary"
          >
          <Label for="terms" class="text-sm leading-5 text-text-secondary">
            {{ t('auth.termsLabel') }}
          </Label>
        </div>

        <Button
          type="submit"
          class="h-12 w-full rounded-lg bg-[#0066FF] text-sm font-semibold leading-4 tracking-[0.7px] text-white shadow-sm hover:bg-[#0066FF]/90"
        >
          {{ t('auth.createAccount') }}
        </Button>
      </form>

      <div class="relative flex items-center py-2">
        <div class="flex-grow border-t border-border-color" />
        <span class="flex-shrink px-3 text-xs font-bold uppercase tracking-[0.6px] text-text-muted">
          {{ t('auth.orContinueWith') }}
        </span>
        <div class="flex-grow border-t border-border-color" />
      </div>

      <div class="flex gap-4">
        <button
          type="button"
          class="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border-color px-5 py-3 text-sm font-semibold leading-4 tracking-[0.7px] text-text-dark transition-colors hover:bg-surface"
        >
          <svg class="size-5" viewBox="0 0 20 20" fill="none">
            <path d="M18.171 10.171c0-.711-.064-1.395-.188-2.052H10.2v3.883h4.48a4.619 4.619 0 0 1-2.006 3.032v2.517h3.246c1.9-1.748 3.001-4.324 3.001-7.38z" fill="#4285F4" />
            <path d="M10.2 18.6c2.716 0 4.992-.9 6.656-2.448l-3.246-2.517c-.898.604-2.046.96-3.41.96-2.624 0-4.848-1.772-5.642-4.156H1.222v2.597C2.876 16.508 6.296 18.6 10.2 18.6z" fill="#34A853" />
            <path d="M4.558 10.44a6.07 6.07 0 0 1-.316-1.94c0-.674.116-1.33.316-1.94V3.963H1.222A10.19 10.19 0 0 0 0 8.5c0 1.646.392 3.204 1.222 4.537l3.336-2.597z" fill="#FBBC05" />
            <path d="M10.2 2.4c1.476 0 2.8.508 3.842 1.504l2.88-2.88C15.184.346 12.908-.6 10.2-.6 6.296-.6 2.876 1.492 1.222 3.963l3.336 2.597C5.352 4.172 7.576 2.4 10.2 2.4z" fill="#EA4335" />
          </svg>
          <span>Google</span>
        </button>
        <button
          type="button"
          class="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border-color px-5 py-3 text-sm font-semibold leading-4 tracking-[0.7px] text-text-dark transition-colors hover:bg-surface"
        >
          <svg class="size-5" viewBox="0 0 20 20" fill="none">
            <path d="M14.917 3.138c.834-1.02 1.508-2.438 1.337-3.862-1.305.06-2.867.884-3.794 1.964-.834.96-1.546 2.41-1.337 3.82 1.427.1 2.886-.74 3.794-1.922zM16.5 10.967c.028 3.2 2.788 4.268 2.804 4.276-.022.072-.438 1.508-1.444 2.99-.87 1.282-1.773 2.558-3.197 2.584-1.4.026-1.85-.834-3.45-.834-1.6 0-2.1.808-3.425.86-1.373.05-2.42-1.386-3.302-2.66C2.04 15.246.511 11.59.48 8.15c-.014-1.92.71-3.478 2-4.412 1.054-.764 2.444-1.19 3.843-1.202 1.35-.014 2.624.914 3.45.914s2.372-1.13 4.002-.964c.676.03 2.576.274 3.798 2.06-.098.062-2.27 1.33-2.245 3.966z" fill="#141B2B" />
          </svg>
          <span>Apple</span>
        </button>
      </div>

      <p class="text-center text-sm leading-5 text-text-secondary">
        {{ t('auth.alreadyHaveAccount') }}
        <NuxtLink :to="localePath('/auth/login')" class="font-semibold text-primary hover:underline">
          {{ t('auth.signIn') }}
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
