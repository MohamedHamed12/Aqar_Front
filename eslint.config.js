import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  typescript: true,
  stylistic: {
    semi: false,
    singleQuote: true,
  },
  formatters: {
    css: true,
    html: true,
  },
  ignores: [
    '**/.github/**',
    '**/.nuxt/**',
    '**/.output/**',
    '**/dist/**',
    '**/node_modules/**',
    '**/README.md',
  ],
}, {
  rules: {
    'node/prefer-global/process': 'off',
  },
})
