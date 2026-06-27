<script setup lang="ts">
const { locale } = useI18n()
useHead({
  htmlAttrs: { lang: locale },
})
</script>

<template>
  <div :dir="locale === 'ar' ? 'rtl' : 'ltr'">
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
