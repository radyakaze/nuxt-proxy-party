import { readFile } from 'node:fs/promises'
import { defineNuxtModule, createResolver, addServerPlugin } from '@nuxt/kit'
import logger from './runtime/utils/logger'

export interface ModuleOptions {
  configFile?: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-proxy-party',
    configKey: 'proxyParty',
    compatibility: {
      nuxt: '^3.0.0',
    },
  },
  defaults: {
    configFile: 'server.config',
  },
  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    nuxt.options.alias['#nuxt-proxy-party'] = resolver.resolve('./core')

    const serverConfigPath = await resolver.resolvePath(options.configFile ?? 'server.config', {
      cwd: nuxt.options.rootDir,
      extensions: ['.js', '.mjs', '.ts'],
    })

    nuxt.hook('nitro:config', async (config) => {
      config.virtual = config.virtual || {}

      let serverConfig = `export default []`

      try {
        serverConfig = await readFile(serverConfigPath, 'utf8')
      }
      catch {
        logger.warn('No config found')
      }

      config.virtual['#nuxt-proxy-party-options'] = serverConfig
    })

    addServerPlugin(resolver.resolve('./runtime/server/plugin'))

    nuxt.options.watch.push(serverConfigPath)
  },
})
