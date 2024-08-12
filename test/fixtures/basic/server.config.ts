import { getCookie } from 'h3'
import { defineProxyParty } from '../../../src/core'

export default defineProxyParty([
  {
    name: 'bin',
    baseUrl: '/api/bin',
    target: '/api/example',
    handler: (event) => {
      const token = getCookie(event, 'oauth/token')

      if (token) {
        event.node.req.headers.authorization = `Bearer ${token}`
      }
    },
  },
])
