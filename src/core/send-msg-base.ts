import { Message  } from 'wechaty'

export class MessageBase{
    msg:null|Message = null
    
    setMsg(msg: Message){
        this.msg = msg
    }

    get msgText(){
        return this.msg?.text()
    }

    // 是否@ 账号自己 非web协议使用这个
    async isMentionSelf(){
        return  await this.msg?.mentionSelf()
    }

    // web协议使用这个验证是否@自己 有问题群的时候可以改昵称
    isWebMentionSelf(){
        const name = `@${(global as any).bot.userSelf().name()}`
        return this.msgText!.startsWith(name)
    }

    // 获取@机器人账号 发送的内容
     getDialogueMsg(){
        if( this.isWebMentionSelf()){
            console.log(12);
            const self = `@${(global as any).bot.userSelf().name()}`
            let sendText = this.msgText!.replace(self, '')
            sendText = sendText.trim()
            console.log(sendText);
            return sendText
        }
    }
}

// 抽象类 统一要实现的方法 方便后续统一调用
export  default abstract class SendMsgBase extends MessageBase{
    abstract robotSend():void
    abstract isPassRule(): Boolean
}