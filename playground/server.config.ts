import { getCookie } from 'h3'
import { defineProxyParty } from '../src/core'
import { useRuntimeConfig } from '#imports'

const config = useRuntimeConfig()

export default defineProxyParty([
  {
    name: 'bin',
    baseUrl: '/api/bin',
    target: config.apiUrl,
    handler: (event) => {
      const token = getCookie(event, 'oauth/token')

      if (token) {
        event.node.req.headers.authorization = `Bearer ${token}`
      }
    },
  },
])
