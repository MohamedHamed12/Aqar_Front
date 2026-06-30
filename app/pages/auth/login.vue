<script setup lang="ts">
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon, TrendingUpIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

definePageMeta({ layout: 'auth' })

const { t } = useI18n()
const localePath = useLocalePath()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)

async function onLogin() {
  await authStore.login(email.value, password.value)
  navigateTo(localePath('/'))
}
</script>

<template>
  <div class="relative hidden w-[640px] flex-col justify-between overflow-hidden bg-[#DAE1FF] lg:flex">
    <img src="/images/login.png" alt="" class="absolute inset-0 size-full object-cover">
    <div class="absolute inset-0 bg-gradient-to-br from-[#0050CB]/60 via-[#0050CB]/20 to-transparent mix-blend-multiply" />
    <div class="relative z-10 flex h-full flex-col justify-between p-16">
      <div class="flex flex-col gap-2">
        <h1 class="text-[32px] font-black leading-10 -tracking-[1.6px] text-[#F8F7FF]">
          {{ t('appName') }}
        </h1>
        <p class="text-lg leading-7 text-[#F8F7FF]/80">
          {{ t('auth.realEstateIntelligence') }}
        </p>
      </div>
      <div class="max-w-[448px] rounded-xl border border-white/20 bg-white/85 p-8 backdrop-blur-[6px]">
        <div class="flex items-center gap-2">
          <TrendingUpIcon class="size-[22px] text-primary" />
          <span class="text-xs font-semibold tracking-[1.4px] uppercase text-text-dark">
            {{ t('auth.theStandard') }}
          </span>
        </div>
        <h2 class="mt-2 text-2xl font-semibold leading-8 text-text-dark">
          {{ t('auth.trustedSource') }}
        </h2>
        <p class="mt-2 text-base leading-6 text-text-secondary">
          {{ t('auth.trustedSourceDesc') }}
        </p>
      </div>
    </div>
  </div>

  <div class="flex flex-1 items-center justify-center bg-white p-8">
    <div class="flex w-full max-w-[440px] flex-col gap-8">
      <div class="flex flex-col gap-1">
        <h1 class="text-[32px] font-semibold leading-10 -tracking-[0.32px] text-text-dark">
          {{ t('auth.welcomeBack') }}
        </h1>
        <p class="text-base leading-6 text-text-secondary">
          {{ t('auth.signInToAccount') }}
        </p>
      </div>

      <form class="flex flex-col gap-6" @submit.prevent="onLogin">
        <div class="flex flex-col gap-1.5">
          <Label for="email" class="text-sm font-semibold leading-4 tracking-[0.7px] text-text-dark">
            {{ t('auth.emailLabel') }}
          </Label>
          <div class="relative">
            <Input
              id="email"
              v-model="email"
              type="email"
              :placeholder="t('auth.emailPlaceholder')"
              required
              class="h-[52px] w-full rounded-lg border border-border-color bg-white pl-12 pr-4 text-base text-text-dark placeholder:text-text-muted"
            />
            <MailIcon class="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
          </div>
        </div>

        <div class="flex flex-col gap-1">
          <div class="flex items-center justify-between">
            <Label for="password" class="text-sm font-semibold leading-4 tracking-[0.7px] text-text-dark">
              {{ t('auth.password') }}
            </Label>
            <NuxtLink :to="localePath('/auth/forgot-password')" class="text-xs font-medium leading-4 text-primary hover:underline">
              {{ t('auth.forgotPassword') }}
            </NuxtLink>
          </div>
          <div class="relative">
            <Input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              :placeholder="t('auth.passwordPlaceholder')"
              required
              class="h-[52px] w-full rounded-lg border border-border-color bg-white pl-12 pr-12 text-base text-text-dark placeholder:text-text-muted"
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
        </div>

        <div class="flex items-center gap-2">
          <input
            id="remember"
            v-model="rememberMe"
            type="checkbox"
            class="size-4 rounded border-border-color text-primary focus:ring-primary"
          >
          <Label for="remember" class="text-sm leading-5 text-text-secondary">
            {{ t('auth.rememberFor30') }}
          </Label>
        </div>

        <Button
          type="submit"
          class="h-12 w-full rounded-lg bg-primary text-sm font-semibold leading-4 tracking-[0.7px] text-white shadow-sm hover:bg-primary/90"
        >
          {{ t('auth.signIn') }}
        </Button>
      </form>

      <div class="relative flex items-center py-2">
        <div class="flex-grow border-t border-border-color" />
        <span class="flex-shrink px-2 text-xs font-medium uppercase tracking-[0.6px] text-text-secondary">
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

      <div class="flex flex-col items-center gap-4 pt-4">
        <p class="text-sm leading-5 text-text-secondary">
          {{ t('auth.noAccount') }}
          <NuxtLink :to="localePath('/auth/register')" class="font-semibold text-primary hover:underline">
            {{ t('auth.createAccount') }}
          </NuxtLink>
        </p>
      </div>

      <div class="flex justify-center gap-6">
        <NuxtLink to="/auth/terms" class="text-xs font-medium leading-4 text-text-muted hover:text-text-secondary">
          {{ t('footer.termsOfService') }}
        </NuxtLink>
        <NuxtLink to="/auth/privacy" class="text-xs font-medium leading-4 text-text-muted hover:text-text-secondary">
          {{ t('footer.privacyPolicy') }}
        </NuxtLink>
        <NuxtLink to="/auth/support" class="text-xs font-medium leading-4 text-text-muted hover:text-text-secondary">
          Support
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
