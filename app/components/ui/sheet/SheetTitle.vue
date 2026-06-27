<script setup lang="ts">
import type { ClassValue } from 'clsx'
import { DialogTitle } from 'reka-ui'
import { cn } from '@/lib/utils'

defineProps<{
  class?: ClassValue
}>()
</script>

<template>
  <DialogTitle :class="cn('text-lg font-semibold text-foreground', $attrs.class ?? '')">
    <slot />
  </DialogTitle>
</template>
