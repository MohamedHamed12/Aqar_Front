<script setup lang="ts">
import type { ClassValue } from 'clsx'
import { cn } from '@/lib/utils'

defineProps<{
  class?: ClassValue
}>()
</script>

<template>
  <div :class="cn('flex flex-col space-y-2 text-center sm:text-start', $attrs.class ?? '')">
    <slot />
  </div>
</template>
