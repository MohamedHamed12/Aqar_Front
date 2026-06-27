<script setup lang="ts">
import { ChevronDownIcon, GlobeIcon, LayoutDashboardIcon, LogOutIcon, MenuIcon } from '@lucide/vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'

const { t, locale, setLocale } = useI18n()
const route = useRoute()
const authStore = useAuthStore()

const mobileMenuOpen = ref(false)

const navLinks = [
  { to: '/', label: 'nav.home' },
  { to: '/search', label: 'nav.search' },
  { to: '/post', label: 'nav.postListing' },
  { to: '/neighborhood-analytics', label: 'nav.neighborhoodAnalytics' },
]

function isActive(path: string) {
  return route.path === path
}

function toggleLanguage() {
  setLocale(locale.value === 'ar' ? 'en' : 'ar')
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
  <header class="sticky top-0 z-40 w-full border-b border-border-color bg-white">
    <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <NuxtLink to="/" class="flex items-center gap-2">
        <span class="text-2xl font-bold text-primary">Aqar</span>
      </NuxtLink>

      <nav class="hidden items-center gap-8 md:flex">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="relative text-sm font-medium text-text-secondary transition-colors hover:text-primary"
          :class="{ 'text-primary after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:bg-primary': isActive(link.to) }"
        >
          {{ t(link.label) }}
        </NuxtLink>
      </nav>

      <div class="hidden items-center gap-4 md:flex">
        <button
          class="flex items-center gap-1 text-sm font-medium text-text-secondary hover:text-primary"
          @click="toggleLanguage"
        >
          <GlobeIcon class="size-4" />
          {{ t('nav.language') }}
        </button>

        <template v-if="authStore.isAuthenticated">
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <button class="flex items-center gap-2 rounded-full outline-none">
                <Avatar>
                  <AvatarImage :src="authStore.user?.avatar" :alt="authStore.user?.name ?? ''" />
                  <AvatarFallback class="bg-primary text-primary-foreground text-sm">
                    {{ initials }}
                  </AvatarFallback>
                </Avatar>
                <span class="hidden text-sm font-medium text-text-dark lg:block">
                  {{ authStore.user?.name }}
                </span>
                <ChevronDownIcon class="size-4 text-text-muted" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" class="w-48">
              <DropdownMenuGroup>
                <DropdownMenuItem @click="navigateTo('/dashboard')">
                  <LayoutDashboardIcon class="size-4" />
                  {{ t('nav.myDashboard') }}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" @click="authStore.logout">
                  <LogOutIcon class="size-4" />
                  {{ t('nav.logout') }}
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </template>

        <template v-else>
          <Button variant="ghost" as-child>
            <NuxtLink to="/auth/login">
              {{ t('nav.login') }}
            </NuxtLink>
          </Button>
          <Button as-child>
            <NuxtLink to="/auth/register">
              {{ t('nav.register') }}
            </NuxtLink>
          </Button>
        </template>
      </div>

      <Sheet v-model:open="mobileMenuOpen">
        <SheetTrigger as-child class="md:hidden">
          <button type="button" class="p-2 text-text-dark" aria-label="Toggle menu">
            <MenuIcon class="size-6" />
          </button>
        </SheetTrigger>
        <SheetContent side="right" class="w-72 p-6">
          <div class="flex flex-col gap-6">
            <div class="flex items-center justify-between">
              <span class="text-xl font-bold text-primary">Aqar</span>
            </div>

            <nav class="flex flex-col gap-2">
              <NuxtLink
                v-for="link in navLinks"
                :key="link.to"
                :to="link.to"
                class="rounded-md px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-surface hover:text-primary"
                :class="{ 'bg-surface text-primary': isActive(link.to) }"
                @click="mobileMenuOpen = false"
              >
                {{ t(link.label) }}
              </NuxtLink>
            </nav>

            <hr class="border-border-color">

            <button
              class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-text-secondary hover:text-primary"
              @click="toggleLanguage"
            >
              <GlobeIcon class="size-4" />
              {{ t('nav.language') }}
            </button>

            <hr class="border-border-color">

            <template v-if="authStore.isAuthenticated">
              <div class="flex items-center gap-3 px-3 py-2">
                <Avatar class="size-10">
                  <AvatarImage :src="authStore.user?.avatar" :alt="authStore.user?.name ?? ''" />
                  <AvatarFallback class="bg-primary text-primary-foreground text-sm">
                    {{ initials }}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p class="text-sm font-medium text-text-dark">
                    {{ authStore.user?.name }}
                  </p>
                  <p class="text-xs text-text-muted">
                    {{ authStore.user?.email }}
                  </p>
                </div>
              </div>
              <NuxtLink
                to="/dashboard"
                class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-text-secondary hover:bg-surface hover:text-primary"
                @click="mobileMenuOpen = false"
              >
                <LayoutDashboardIcon class="size-4" />
                {{ t('nav.myDashboard') }}
              </NuxtLink>
              <button
                class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10"
                @click="authStore.logout"
              >
                <LogOutIcon class="size-4" />
                {{ t('nav.logout') }}
              </button>
            </template>

            <template v-else>
              <div class="flex flex-col gap-2">
                <Button as-child class="w-full">
                  <NuxtLink to="/auth/login" @click="mobileMenuOpen = false">
                    {{ t('nav.login') }}
                  </NuxtLink>
                </Button>
                <Button variant="outline" as-child class="w-full">
                  <NuxtLink to="/auth/register" @click="mobileMenuOpen = false">
                    {{ t('nav.register') }}
                  </NuxtLink>
                </Button>
              </div>
            </template>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  </header>
</template>
