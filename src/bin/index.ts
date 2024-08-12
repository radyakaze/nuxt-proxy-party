import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineCommand, runMain } from 'citty'
import { resolve, dirname } from 'pathe'
import { consola } from 'consola'

const main = defineCommand({
  meta: {
    name: 'Nuxt Proxy Party',
    description: 'Nuxt Proxy Party CLI',
  },
  args: {
    init: {
      type: 'boolean',
      description: 'Generate new server config',
    },
  },
  async run() {
    const DIRNAME = dirname(fileURLToPath(import.meta.url))

    const examplePath = resolve(DIRNAME, '../../template/server.config.tmpl')
    const configPath = resolve(process.cwd(), './server.config.ts')

    if (fs.existsSync(configPath)) {
      console.warn('server.config.ts already exist')
    }
    else {
      fs.copyFileSync(examplePath, configPath)

      consola.success('Generate new server.config.ts')
    }
  },
})

runMain(main)
