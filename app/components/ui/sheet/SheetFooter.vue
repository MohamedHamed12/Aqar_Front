<script setup lang="ts">
import type { ClassValue } from 'clsx'
import { cn } from '@/lib/utils'

defineProps<{
  class?: ClassValue
}>()
</script>

<template>
  <div :class="cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-2', $attrs.class ?? '')">
    <slot />
  </div>
</template>
