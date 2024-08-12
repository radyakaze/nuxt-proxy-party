import type { H3Event } from 'h3'

export type DefineProxyPartyHandler = (event: H3Event) => void

export interface ProxyParty {
  name: string
  baseUrl: string
  target: string
  handler?: DefineProxyPartyHandler
  pathRewrite?: { [s: string]: string } | ((path: string) => string)
}

export const defineProxyParty = (proxies: ProxyParty[]) => proxies
