import { consola } from 'consola'
import { defineEventHandler, getQuery, proxyRequest } from 'h3'
import { withQuery, joinURL } from 'ufo'
import { defineNitroPlugin } from '#imports'

// @ts-expect-error virtual file
import configs from '#nuxt-proxy-party-options'

export default defineNitroPlugin(async ({ router }) => {
  try {
    if (Array.isArray(configs)) {
      configs.forEach((config) => {
        const handler = defineEventHandler((event) => {
          const path = event.context.params?._ ?? '/'

          const url = withQuery(joinURL(config.target, path), getQuery(event))

          if (config.handler && typeof config.handler === 'function') {
            config.handler(event)
          }

          return proxyRequest(event, url)
        })

        router.use(config.baseUrl, handler)
        router.use(`${config.baseUrl}/**`, handler)
      })
    }
  }
  catch (e: unknown) {
    consola.error('Nuxt Proxy Party', (e as Error).message)
  }
})
