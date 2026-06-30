import tailwindcss from '@tailwindcss/vite'

const API_BASE = ''

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      apiBase: API_BASE,
    },
  },

  typescript: {
    strict: true,
    typeCheck: true,
    tsConfig: {
      compilerOptions: {
        strict: true,
        noUncheckedIndexedAccess: true,
        strictNullChecks: true,
      },
    },
  },

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@sidebase/nuxt-auth',
    '@nuxt/image',
  ],

  i18n: {
    locales: [
      { code: 'ar', name: 'العربية', dir: 'rtl', file: 'ar.json' },
      { code: 'en', name: 'English', dir: 'ltr', file: 'en.json' },
    ],
    defaultLocale: 'ar',
    strategy: 'prefix_except_default',
    langDir: 'locales',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_lang',
      alwaysRedirect: true,
      fallbackLocale: 'ar',
    },
  },

  auth: {
    baseURL: API_BASE,
    provider: {
      type: 'local',
      endpoints: {
        signIn: { path: '/api/v1/auth/login', method: 'post' },
        signOut: { path: '/api/v1/auth/logout', method: 'post' },
        getSession: { path: '/api/v1/auth/me', method: 'get' },
      },
      token: { signInResponseTokenPointer: '/accessToken', type: 'Bearer' },
    },
    globalAppMiddleware: false,
  },

  components: {
    dirs: [
      '~/components/shared',
    ],
  },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },
})
