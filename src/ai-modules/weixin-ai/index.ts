import { getWeiXinAi } from "../../apis/weixin-ai-api";
const nJwt = require('njwt');
import {MessageBase} from "../../core/send-msg-base"

export default class WeixinAi extends MessageBase{
   static EncodingAESKey = ''

   async weiXinAi(msgData:{username:string,msg:string}){
      var jwt = nJwt.create(msgData, WeixinAi.EncodingAESKey,"HS256");
      var query = jwt.compact();
      const data = await getWeiXinAi({
         query
       })
       return data
   }
   
   async robotSend(){
        // 只有是@ 机器人账号 或者是触发开头是 群助手才能触发自动ai机器人
        const msg =  this.getDialogueMsg()
        console.log(msg,10002000);
        if(msg){
            const room = this.msg!.room()
            const data = await this.weiXinAi({username:room!.id,msg:msg})
            console.log(data.answer);
            this.msg?.say(data.answer || '我还在学习呢')
        }
   }
}