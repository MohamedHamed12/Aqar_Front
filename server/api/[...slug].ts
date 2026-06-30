import { proxyRequest } from 'h3'

export default defineEventHandler(async (event) => {
  let path = event.path

  // Map /session (from nuxt-auth) to the actual backend me endpoint
  if (path === '/session') {
    path = '/api/v1/auth/me'
  }

  const target = `http://3.80.96.93:8080${path}`
  return proxyRequest(event, target)
})
