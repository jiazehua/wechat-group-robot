import { Message,log  } from 'wechaty'
import initModule from '../core/init-module'
import SendMsgBase from '../core/send-msg-base'
import WeixinAi from '../ai-modules/weixin-ai/index'

// 自定义模板应答模块
const moduleLs:SendMsgBase[] = initModule()
// 第三方机器人
const weixinAi = new WeixinAi()

function dispatchSendMsg(msg:Message){
  const module = moduleLs.find(item=>{
    item.setMsg(msg)
    return item.isPassRule()
  })
  if(module){
    module.robotSend()
  } else{
    weixinAi.setMsg(msg)
    weixinAi.robotSend()
  }
}

export default async function onMessage (msg: Message) {
  // const msgText  = msg.text()
  // const isSelfMsg = msg.self()  
  // || !msg.room()
  if(msg.self() ) return
  // 派发模块
  dispatchSendMsg(msg)
}

