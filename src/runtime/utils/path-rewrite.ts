import type { ProxyParty } from '../core'

export const rewritePath = (pathRewrite: ProxyParty['pathRewrite'], url: string) => {
  if (!pathRewrite) return url

  if (typeof pathRewrite === 'function') {
    return pathRewrite(url)
  }

  for (const [pattern, replacement] of Object.entries(pathRewrite)) {
    const regex = new RegExp(pattern)
    if (regex.test(url)) {
      return url.replace(regex, replacement)
    }
  }
  return url
}
