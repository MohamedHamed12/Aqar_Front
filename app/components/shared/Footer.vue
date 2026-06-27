<script setup lang="ts">
import { AtSign, ExternalLink, GlobeIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'

const { t, locale } = useI18n()

const email = ref('')

const socialLinks = [
  { icon: GlobeIcon, url: '#', label: 'Facebook' },
  { icon: AtSign, url: '#', label: 'Twitter' },
  { icon: ExternalLink, url: '#', label: 'LinkedIn' },
]

const platformLinks = [
  { to: '/search', label: 'footer.searchProperties' },
  { to: '/neighborhood-analytics', label: 'footer.neighborhoodInsights' },
  { to: '/market-trends', label: 'footer.marketTrends' },
  { to: '/property-valuation', label: 'footer.propertyValuation' },
]

const companyLinks = [
  { to: '/about', label: 'footer.aboutUs' },
  { to: '/contact', label: 'footer.contactUs' },
  { to: '/careers', label: 'footer.careers' },
  { to: '/blog', label: 'footer.blog' },
]

const legalLinks = [
  { to: '/privacy', label: 'footer.privacyPolicy' },
  { to: '/terms', label: 'footer.termsOfService' },
  { to: '/cookies', label: 'footer.cookiePolicy' },
]

function onSubscribe() {
  if (!email.value)
    return
  console.warn('Newsletter subscribe:', email.value)
  email.value = ''
}
</script>

<template>
  <footer class="border-t border-border-color bg-white">
    <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div class="flex flex-col gap-4">
          <span class="text-2xl font-bold text-primary">Aqar</span>
          <p class="text-sm leading-relaxed text-text-muted">
            {{ t('footer.tagline') }}
          </p>
          <div class="flex gap-3 rtl:flex-row-reverse" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
            <a
              v-for="social in socialLinks"
              :key="social.label"
              :href="social.url"
              :aria-label="social.label"
              class="flex size-9 items-center justify-center rounded-full border border-border-color text-text-muted transition-colors hover:border-primary hover:text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <component :is="social.icon" class="size-4" />
            </a>
          </div>
        </div>

        <div class="flex flex-col gap-3">
          <h3 class="text-sm font-semibold text-text-dark">
            {{ t('footer.platform') }}
          </h3>
          <NuxtLink
            v-for="link in platformLinks"
            :key="link.to"
            :to="link.to"
            class="text-sm text-text-muted transition-colors hover:text-primary"
          >
            {{ t(link.label) }}
          </NuxtLink>
        </div>

        <div class="flex flex-col gap-3">
          <h3 class="text-sm font-semibold text-text-dark">
            {{ t('footer.company') }}
          </h3>
          <NuxtLink
            v-for="link in companyLinks"
            :key="link.to"
            :to="link.to"
            class="text-sm text-text-muted transition-colors hover:text-primary"
          >
            {{ t(link.label) }}
          </NuxtLink>
        </div>

        <div class="flex flex-col gap-3">
          <h3 class="text-sm font-semibold text-text-dark">
            {{ t('footer.newsletter') }}
          </h3>
          <p class="text-sm text-text-muted">
            {{ t('footer.newsletterDesc') }}
          </p>
          <form class="flex gap-2" @submit.prevent="onSubscribe">
            <input
              v-model="email"
              type="email"
              :placeholder="t('footer.yourEmail')"
              class="min-w-0 flex-1 rounded-md border border-border-color bg-background px-3 py-2 text-sm text-text-dark placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
            <Button type="submit" size="sm">
              {{ t('footer.subscribe') }}
            </Button>
          </form>
        </div>
      </div>
    </div>

    <div class="border-t border-border-color">
      <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
        <p class="text-xs text-text-muted">
          {{ t('footer.copyright') }}
        </p>
        <div class="flex gap-4 rtl:flex-row-reverse">
          <NuxtLink
            v-for="link in legalLinks"
            :key="link.to"
            :to="link.to"
            class="text-xs text-text-muted transition-colors hover:text-primary"
          >
            {{ t(link.label) }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>
