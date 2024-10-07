import type { H3Event, ProxyOptions } from 'h3'

export type DefineProxyPartyHandler = (event: H3Event) => void | Promise<void>

export interface ProxyParty {
  name?: string
  baseUrl: string
  target: string
  handler?: DefineProxyPartyHandler
  pathRewrite?: { [s: string]: string } | ((path: string) => string)
  enableLogger?: boolean
  proxyOptions?: ProxyOptions | ((event: H3Event) => ProxyOptions | Promise<ProxyOptions>)
}

export const defineProxyParty = (proxies: ProxyParty[]) => proxies
