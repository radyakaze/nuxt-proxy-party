import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils/e2e'

describe('ssr', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
  })

  it('renders the index page', async () => {
    // TODO: unit test
    // Get response to a server-rendered page with `$fetch`.
    const html = await $fetch('/api/bin/get')

    expect(html).toContain('<div>basic</div>')
  })
})
