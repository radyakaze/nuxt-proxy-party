import { defineEventHandler, getQuery, proxyRequest, type ProxyOptions } from 'h3'
import { withQuery, joinURL } from 'ufo'
import type { ProxyParty } from '../../core'
import { rewritePath } from '../utils/path-rewrite'
import logger from '../utils/logger'
import { defineNitroPlugin } from '#imports'

// @ts-expect-error virtual file
import configs from '#nuxt-proxy-party-options'

const proxyHandler = (config: ProxyParty) => {
  return defineEventHandler(async (event) => {
    let path = '/' + withQuery(event.context.params?._ ?? '', getQuery(event))

    path = rewritePath(config.pathRewrite, path)

    const url = joinURL(config.target, path)

    if (typeof config.handler === 'function') {
      if (config.handler.constructor.name == 'AsyncFunction') {
        await config.handler(event)
      }
      else {
        config.handler(event)
      }
    }

    if (config.enableLogger) {
      logger.success(`(${config.name || 'no name'})`, `Proxy path "${event.path}" accessed, forwarding to "${url}"`)
    }

    const options = typeof config.proxyOptions === 'function'
      ? config.proxyOptions.constructor.name == 'AsyncFunction'
        ? await config.proxyOptions(event)
        : config.proxyOptions(event)
      : config.proxyOptions

    return proxyRequest(event, url, options as ProxyOptions)
  })
}

export default defineNitroPlugin(async ({ router }) => {
  try {
    if (Array.isArray(configs)) {
      logger.start('Started')

      configs.forEach((config: ProxyParty) => {
        if (config.target) {
          const handler = proxyHandler(config)
          router.use(config.baseUrl, handler)
          router.use(`${config.baseUrl}/**`, handler)

          logger.success(`(${config.name || 'no name'})`, `Proxy successfully created: ${config.baseUrl} -> ${config.target}`)
        }
        else {
          logger.warn(`(${config.name || 'no name'})`, `Skipping creation of proxy for "${config.baseUrl}" due to missing target`)
        }
      })
    }
  }
  catch (e: unknown) {
    logger.error(`Error: ${(e as Error).message}`)
  }
})
