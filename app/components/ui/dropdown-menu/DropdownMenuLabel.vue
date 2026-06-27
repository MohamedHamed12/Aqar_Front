<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  class?: string
  inset?: boolean
}>(), {
  inset: false,
})
</script>

<template>
  <div
    :class="cn(
      'px-2 py-1.5 text-sm font-semibold',
      inset && 'pl-8',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
