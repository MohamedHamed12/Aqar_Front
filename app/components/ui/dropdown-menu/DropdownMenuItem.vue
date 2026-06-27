<script setup lang="ts">
import { DropdownMenuItem } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  variant?: 'default' | 'destructive'
  class?: string
  disabled?: boolean
  inset?: boolean
}>(), {
  variant: 'default',
})
</script>

<template>
  <DropdownMenuItem
    :disabled="disabled"
    :class="cn(
      'relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      'focus:bg-accent focus:text-accent-foreground',
      inset && 'pl-8',
      variant === 'destructive' && 'text-destructive focus:bg-destructive focus:text-destructive-foreground',
      props.class,
    )"
  >
    <slot />
  </DropdownMenuItem>
</template>
