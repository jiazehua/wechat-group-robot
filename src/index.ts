import { Wechaty } from 'Wechaty'
import { log } from 'wechaty-puppet'
import onScan from './listeners/on-scan'
import onLogin from './listeners/on-login'
import onLogout from './listeners/on-logout'
import onMessage from './listeners/on-message'



const bot = new Wechaty({ name: 'bot' })

bot.on('scan', onScan)
bot.on('login', onLogin)
bot.on('logout', onLogout)
bot.on('message', onMessage)

bot.start()
  .then(() => log.info('StarterBot', 'Starter Bot Started.'))
  .catch(e => log.error('StarterBot', e))
