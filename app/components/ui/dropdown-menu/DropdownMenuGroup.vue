<script setup lang="ts">
import { DropdownMenuGroup } from 'reka-ui'

defineProps<{
  class?: string
}>()
</script>

<template>
  <DropdownMenuGroup>
    <slot />
  </DropdownMenuGroup>
</template>
