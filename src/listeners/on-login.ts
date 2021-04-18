import { Contact, log } from 'wechaty'
export default function onLogin (user: Contact) {
  log.info('登陆的用户', user)
}
