import SendMsgBase from "../../core/send-msg-base"


export default class RecruitTemplate extends SendMsgBase{
    get isMsgRule(){
        return this.msgText === "我要内推"
    }

    isPassRule(){
        console.log(this.isMsgRule,this.msgText);
        
        return this.isMsgRule
    }
    async robotSend(){
        if(this.isMsgRule){
            let replyMsg = `名称/岗位名称
            - 与自己关系：
            - 岗位名称：
              - 
            - 薪资带宽：
            - 工作城市：
            - 内推人： 
            - 联系方式：
            `
            await this.msg!.say(replyMsg)
        
        }
    }
}