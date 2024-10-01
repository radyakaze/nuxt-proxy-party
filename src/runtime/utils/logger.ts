import { createConsola } from 'consola'
import { type colors, colorize } from 'consola/utils'

const logStyles: Record<string, { symbol: string, color: keyof typeof colors }> = {
  log: { symbol: '\u25A1', color: 'white' },
  info: { symbol: '\u2139', color: 'blue' },
  success: { symbol: '\u2714', color: 'green' },
  warn: { symbol: '\u26A0', color: 'yellow' },
  error: { symbol: '\u2716', color: 'red' },
  start: { symbol: '\u25B6', color: 'magenta' },
}

export default createConsola({
  reporters: [
    {
      log(logObj) {
        const style = logStyles[logObj.type] || logStyles.log
        console.log(`${colorize(style.color, style.symbol)} ${colorize(style.color, '[Nuxt Proxy Party]')}:`, logObj.args.join(' '))
      },
    },
  ],
})
