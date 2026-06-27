<script setup lang="ts">
import type { ClassValue } from 'clsx'
import { DialogDescription } from 'reka-ui'
import { cn } from '@/lib/utils'

defineProps<{
  class?: ClassValue
}>()
</script>

<template>
  <DialogDescription :class="cn('text-sm text-muted-foreground', $attrs.class ?? '')">
    <slot />
  </DialogDescription>
</template>
