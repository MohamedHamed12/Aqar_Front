<script setup lang="ts">
import { DropdownMenuTrigger } from 'reka-ui'

const props = defineProps<{
  class?: string
  asChild?: boolean
}>()
</script>

<template>
  <DropdownMenuTrigger :as-child="props.asChild ?? true" :class="props.class">
    <slot />
  </DropdownMenuTrigger>
</template>
