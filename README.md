# Nuxt Proxy Party

`Nuxt Proxy Party` is a module designed to simplify the process of creating proxies using `h3` in your Nuxt application. This module allows you to easily define and manage proxy routes with custom handlers.

## Installation

To install `Nuxt Proxy Party`, run the following command:

```bash
yarn add -D @radya/nuxt-proxy-party
```

After installation, add the module to your `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  modules: ['@radya/nuxt-proxy-party'],
})
```

## Configuration

To initialize the configuration file, run:

```bash
npx nuxt-proxy-party --init
```

This will create a default configuration file that you can modify to suit your needs.

## Usage

To use Nuxt Proxy Party, you need to define your proxy routes within the `server.config.ts` file:

## Simple
```typescript
import { getCookie } from 'h3'
import { defineProxyParty } from '#nuxt-proxy-party'

export default defineProxyParty([
  {
    name: 'bin',
    baseUrl: '/api/bin',
    target: 'https://httpbin.org',
  },
])
```

## With custom handler

```typescript
import { getCookie } from 'h3'
import { defineProxyParty } from '#nuxt-proxy-party'

export default defineProxyParty([
  {
    name: 'bin',
    baseUrl: '/api/bin',
    target: 'https://httpbin.org',
    handler: (event) => {
      const token = getCookie(event, 'oauth/token')

      if (token) {
        event.node.req.headers.authorization = `Bearer ${token}`
      }
    },
  },
])
```

### Using Runtime Config

If you need to use runtime configuration, import it from `#imports`:

```typescript
import { useRuntimeConfig } from '#imports'
```

This allows you to access and use runtime configuration values in your proxy handler.

## Contributing

We welcome contributions to `Nuxt Proxy Party`. If you’d like to contribute, please follow these steps:

1. **Enable Corepack**: Ensure Corepack is enabled by running:
   ```bash
   corepack enable
   ```

2. **Install Dependencies**: Install all necessary dependencies by running:
   ```bash
   yarn install
   ```

3. **Generate Type Stubs**: Run the following command to generate type stubs:
   ```bash
   yarn dev:prepare
   ```

4. **Start Development Mode**: Use the following command to start the playground in development mode:
   ```bash
   yarn dev
   ```

This will set up your environment to develop and test `Nuxt Proxy Party`.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
