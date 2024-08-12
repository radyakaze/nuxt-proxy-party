import { consola } from 'consola'
import { defineEventHandler, getQuery, proxyRequest } from 'h3'
import { withQuery, joinURL } from 'ufo'
import type { ProxyParty } from '../../core'
import { rewritePath } from '../utils/path-rewrite'
import { defineNitroPlugin } from '#imports'

// @ts-expect-error virtual file
import configs from '#nuxt-proxy-party-options'

const proxyHandler = (config: ProxyParty) => {
  return defineEventHandler((event) => {
    const path = event.context.params?._ ?? '/'

    let url = withQuery(joinURL(config.target, path), getQuery(event))

    if (config.pathRewrite) {
      url = rewritePath(config.pathRewrite, url)
    }

    if (config.handler && typeof config.handler === 'function') {
      config.handler(event)
    }

    return proxyRequest(event, url)
  })
}

export default defineNitroPlugin(async ({ router }) => {
  try {
    if (Array.isArray(configs)) {
      configs.forEach((config: ProxyParty) => {
        const handler = proxyHandler(config)
        router.use(config.baseUrl, handler)
        router.use(`${config.baseUrl}/**`, handler)

        consola.success(`[Nuxt Proxy Party] Proxy created: ${config.baseUrl} -> ${config.target}`)
      })
    }
  }
  catch (e: unknown) {
    consola.error('Nuxt Proxy Party', (e as Error).message)
  }
})
