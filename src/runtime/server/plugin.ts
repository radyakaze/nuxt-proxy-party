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
    let path = '/' + withQuery(event.context.params?._ ?? '', getQuery(event))

    path = rewritePath(config.pathRewrite, path)

    const url = joinURL(config.target, path)

    if (config.handler && typeof config.handler === 'function') {
      config.handler(event)
    }

    return proxyRequest(event, url)
  })
}

export default defineNitroPlugin(async ({ router }) => {
  try {
    if (Array.isArray(configs)) {
      consola.start('Nuxt Proxy Party: Started')

      configs.forEach((config: ProxyParty) => {
        const handler = proxyHandler(config)
        router.use(config.baseUrl, handler)
        router.use(`${config.baseUrl}/**`, handler)

        consola.success(`[Nuxt Proxy Party] Proxy created: ${config.baseUrl} -> ${config.target}`)
      })
    }
  }
  catch (e: unknown) {
    consola.error(`Nuxt Proxy Party: ${(e as Error).message}`)
  }
})
