import { readFile } from 'node:fs/promises'
import { defineNuxtModule, createResolver, addServerPlugin } from '@nuxt/kit'
import logger from './runtime/utils/logger'

export interface ModuleOptions {
  //
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-proxy-party',
    configKey: 'proxyParty',
    compatibility: {
      nuxt: '^3.0.0',
    },
  },
  async setup(_options, nuxt) {
    const resolver = createResolver(import.meta.url)

    const serverConfigPath = await resolver.resolvePath('server.config', {
      cwd: nuxt.options.rootDir,
      extensions: ['.js', '.mjs', '.ts']
    })

    nuxt.hook('nitro:config', async (config) => {
      config.virtual = config.virtual || {}

      let serverConfig = `export default []`

      try {
        serverConfig = await readFile(serverConfigPath, 'utf8')
      }
      catch {
        logger.warn('No server.config found')
      }

      config.virtual['#nuxt-proxy-party-options'] = serverConfig
    })

    addServerPlugin(resolver.resolve('./runtime/server/plugin'))

    nuxt.options.watch.push(serverConfigPath)
  },
})
