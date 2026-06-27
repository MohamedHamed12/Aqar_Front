<script setup lang="ts">
import type { ClassValue } from 'clsx'
import { AvatarFallback } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: ClassValue
}>()
</script>

<template>
  <AvatarFallback
    :class="cn(
      'flex h-full w-full items-center justify-center rounded-full bg-muted',
      props.class,
    )"
  >
    <slot />
  </AvatarFallback>
</template>
