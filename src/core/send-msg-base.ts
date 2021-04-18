import { Message  } from 'wechaty'

export  default abstract class SendMsgBase{
    msg:null|Message = null
    setMsg(msg: Message){
        this.msg = msg
    }
     get msgText(){
        return this.msg?.text()
    }
    abstract isPassRule(): Boolean
    abstract robotSend():void
}