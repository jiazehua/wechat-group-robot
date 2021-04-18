import { Message  } from 'wechaty'
import initModule from '../core/init-module'
import SendMsgBase from '../core/send-msg-base'

const moduleLs:SendMsgBase[] = initModule()

function dispatchSendMsg(msg:Message){
  const module = moduleLs.find(item=>{
    item.setMsg(msg)
    return item.isPassRule()
  })
  if(module) module.robotSend()
}

export default async function onMessage (msg: Message) {
  // const msgText  = msg.text()
  // const isSelfMsg = msg.self()  
  if(msg.self()) return
  // 派发模块
  dispatchSendMsg(msg)
}

