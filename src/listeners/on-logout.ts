import { Contact, log } from 'wechaty'
export default function onLogout (user: Contact) {
  log.info('退出的用户', user)
}
