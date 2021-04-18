import SendMsgBase from "../../core/send-msg-base"

export default class Menu extends SendMsgBase{
    get isMsgRule(){
        return this.msgText === "群助手-菜单"
    }

    isPassRule(){        
        return this.isMsgRule
    }
    async robotSend(){
        if(this.isMsgRule){
            let replyMsg = `
                回复以下指令可以查看
                1.掘金-热门
                2.掘金-最新
                3.我要内推
            `
            await this.msg!.say(replyMsg)
        }
    }
}