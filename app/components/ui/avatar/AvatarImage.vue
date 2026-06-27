<script setup lang="ts">
import type { ClassValue } from 'clsx'
import { AvatarImage } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  src?: string
  alt?: string
  class?: ClassValue
}>(), {
  src: '',
  alt: '',
})
</script>

<template>
  <AvatarImage
    :src="src"
    :alt="alt"
    :class="cn('aspect-square h-full w-full', props.class)"
  />
</template>
