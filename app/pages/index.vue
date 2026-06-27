<script setup lang="ts">
import { Button } from '@/components/ui/button'

const { t } = useI18n()
</script>

<template>
  <div class="flex flex-col items-center justify-center py-24 text-center">
    <h1 class="text-4xl font-bold text-text-dark sm:text-5xl">
      {{ t('welcome') }}
    </h1>
    <p class="mt-4 text-lg text-text-muted">
      {{ t('description') }}
    </p>
    <div class="mt-8 flex gap-4">
      <Button as-child>
        <NuxtLink to="/search">
          {{ t('nav.search') }}
        </NuxtLink>
      </Button>
      <Button variant="outline" as-child>
        <NuxtLink to="/post">
          {{ t('nav.postListing') }}
        </NuxtLink>
      </Button>
    </div>
  </div>
</template>
