import type { H3Event } from 'h3'

export type DefineProxyPartyHandler = (event: H3Event) => void

export interface ProxyParty {
  name: string
  baseUrl: string
  target: string
  handler?: DefineProxyPartyHandler
}

export const defineProxyParty = (proxies: ProxyParty[]) => proxies
