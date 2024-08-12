import type { ProxyParty } from '../../core'

export const rewritePath = (pathRewrite: ProxyParty['pathRewrite'] | undefined, path: string) => {
  if (!pathRewrite) return path

  if (typeof pathRewrite === 'function') {
    return pathRewrite(path)
  }

  for (const [pattern, replacement] of Object.entries(pathRewrite)) {
    const regex = new RegExp(pattern)
    if (regex.test(path)) {
      return path.replace(regex, replacement)
    }
  }
  return path
}
