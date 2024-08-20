import { createConsola } from 'consola'
import chalk, { type Chalk } from 'chalk'

const logStyles: Record<string, { symbol: string, color: Chalk }> = {
  log: { symbol: '\u25A1', color: chalk.white },
  info: { symbol: '\u2139', color: chalk.blue },
  success: { symbol: '\u2714', color: chalk.green },
  warn: { symbol: '\u26A0', color: chalk.yellow },
  error: { symbol: '\u2716', color: chalk.red },
  start: { symbol: '\u25B6', color: chalk.magenta }
}

export default createConsola({
  reporters: [
    {
      log(logObj) {
        const style = logStyles[logObj.type] || logStyles.log
        console.log(`${style.color(style.symbol)} ${style.color('[Nuxt Proxy Party]')}:`, logObj.args.join(' '))
      }
    }
  ],
})
