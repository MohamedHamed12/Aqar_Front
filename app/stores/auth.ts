import { defineStore } from 'pinia'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: string
}

export const useAuthStore = defineStore('auth', () => {
  const auth = useAuth()
  const user = computed<User | null>(() => (auth.data.value as { user?: User } | null | undefined)?.user ?? null)
  const isAuthenticated = computed(() => auth.status.value === 'authenticated')
  const isLoading = computed(() => auth.status.value === 'loading')

  async function login(email: string, password: string) {
    await auth.signIn({ email, password }, { redirect: false })
  }

  async function logout() {
    await auth.signOut({ redirect: false })
    navigateTo('/')
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
  }
})
