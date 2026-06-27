<script setup lang="ts">
import { BarChart3Icon, Building2Icon, HeartIcon, LayoutDashboardIcon, LogOutIcon, MenuIcon, MessageCircleIcon, SettingsIcon, XIcon } from '@lucide/vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const { t } = useI18n()
const route = useRoute()
const authStore = useAuthStore()

const sidebarOpen = ref(false)

const sidebarItems = [
  { to: '/dashboard', icon: LayoutDashboardIcon, label: 'dashboard.overview' },
  { to: '/dashboard/properties', icon: Building2Icon, label: 'dashboard.myProperties' },
  { to: '/dashboard/favorites', icon: HeartIcon, label: 'dashboard.favorites' },
  { to: '/dashboard/analytics', icon: BarChart3Icon, label: 'dashboard.analytics' },
  { to: '/dashboard/messages', icon: MessageCircleIcon, label: 'dashboard.messages' },
  { to: '/dashboard/settings', icon: SettingsIcon, label: 'dashboard.settings' },
]

const pageTitle = computed(() => {
  const match = sidebarItems.find(item => isActive(item.to))
  return match ? t(match.label) : t('dashboard.title')
})

function isActive(path: string) {
  return route.path === path || route.path.startsWith(`${path}/`)
}

const initials = computed(() => {
  if (!authStore.user?.name)
    return '?'
  return authStore.user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})
</script>

<template>
  <div class="flex min-h-screen">
    <aside class="hidden w-72 shrink-0 border-e border-border-color bg-sidebar-background lg:flex lg:flex-col">
      <div class="flex h-16 items-center border-b border-border-color px-6">
        <NuxtLink to="/" class="text-xl font-bold text-primary">
          Aqar
        </NuxtLink>
      </div>
      <nav class="flex-1 space-y-1 p-4">
        <NuxtLink
          v-for="item in sidebarItems"
          :key="item.to"
          :to="item.to"
          class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
          :class="isActive(item.to) ? 'bg-primary text-primary-foreground' : 'text-text-secondary hover:bg-primary/10 hover:text-primary'"
        >
          <component :is="item.icon" class="size-4" />
          {{ t(item.label) }}
        </NuxtLink>
      </nav>
      <div class="border-t border-border-color p-4">
        <button
          class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-primary/10 hover:text-primary"
          @click="authStore.logout"
        >
          <LogOutIcon class="size-4" />
          {{ t('nav.logout') }}
        </button>
      </div>
    </aside>

    <div class="flex flex-1 flex-col">
      <header class="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border-color bg-white px-6">
        <button
          class="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-primary lg:hidden"
          @click="sidebarOpen = !sidebarOpen"
        >
          <MenuIcon class="size-5" />
          <span>{{ t('dashboard.title') }}</span>
        </button>
        <div class="hidden items-center lg:flex">
          <h1 class="text-lg font-semibold text-text-dark">
            {{ pageTitle }}
          </h1>
        </div>
        <div class="flex items-center gap-3">
          <Avatar class="size-8">
            <AvatarImage :src="authStore.user?.avatar" :alt="authStore.user?.name ?? ''" />
            <AvatarFallback class="bg-primary text-primary-foreground text-xs">
              {{ initials }}
            </AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div v-if="sidebarOpen" class="fixed inset-0 z-40 bg-black/50 lg:hidden" @click="sidebarOpen = false" />
      <aside v-if="sidebarOpen" class="fixed inset-y-0 start-0 z-50 w-72 border-e border-border-color bg-sidebar-background lg:hidden">
        <div class="flex h-16 items-center justify-between border-b border-border-color px-6">
          <NuxtLink to="/" class="text-xl font-bold text-primary">
            Aqar
          </NuxtLink>
          <button class="p-2 text-text-dark" @click="sidebarOpen = false">
            <XIcon class="size-5" />
          </button>
        </div>
        <nav class="space-y-1 p-4">
          <NuxtLink
            v-for="item in sidebarItems"
            :key="item.to"
            :to="item.to"
            class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
            :class="isActive(item.to) ? 'bg-primary text-primary-foreground' : 'text-text-secondary hover:bg-primary/10 hover:text-primary'"
            @click="sidebarOpen = false"
          >
            <component :is="item.icon" class="size-4" />
            {{ t(item.label) }}
          </NuxtLink>
        </nav>
        <div class="border-t border-border-color p-4">
          <button
            class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-primary/10 hover:text-primary"
            @click="authStore.logout"
          >
            <LogOutIcon class="size-4" />
            {{ t('nav.logout') }}
          </button>
        </div>
      </aside>

      <main class="flex-1 bg-surface p-6">
        <slot />
      </main>
    </div>
  </div>
</template>
