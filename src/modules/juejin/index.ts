import SendMsgBase from "../../core/send-msg-base"
import { log  } from 'wechaty'
import { getJuejinPages } from "../../apis/juejin-api";

export const pageType = {'最新':300,'热门':200}

class JuejinPage extends SendMsgBase{
    static pageInfols:{title:string,article_id:string}[] = []

   
    // 建议将条件作为
    get isPagelsRule(){
        return this.msgText!.startsWith('掘金-')

    }
    get isPageInfoRule(){
        return this.msgText!.startsWith('#') && JuejinPage.pageInfols.length>0
    }

    async  juejinPageinfo(type:keyof typeof pageType){
       const {data} = await getJuejinPages({
           client_type: 2608,
           cursor: "0",
           id_type: 2,
           limit: 10,
           sort_type: pageType[type],
       })
       // return 
       JuejinPage.pageInfols = data.reduce((acc,cur)=>{
           const title = cur.item_info.article_info?.title
           if(cur.item_type === 2 && title){
               let index = acc.length +1
               acc.push({title: `${index}.${title}`,article_id:cur.item_info.article_info.article_id })
           }
           return acc
       },[])
       return JuejinPage.pageInfols.map(item=>item.title).slice(0,5).join('\n')
   }
   

    // 是符合规则
    isPassRule(){
        return this.isPagelsRule || this.isPageInfoRule
    }

    async robotSend(){
        let replyMsg = "我不知道你在说什么"
        if(this.isPagelsRule){
            const type = this.msgText!.slice(3,5)
            if(['最新','热门'].includes(type)){
              const data= await this.juejinPageinfo(type as any)
              replyMsg = `掘金前五${type}\n${data}\n #加序号得到文章详情地址`
            }
            log.info(replyMsg)
            await this.msg!.say(replyMsg)
        }
        if(this.isPageInfoRule){
            const index = Number(this.msgText!.slice(1,2))
            if(!isNaN(index)){
                const page = JuejinPage.pageInfols[index-1]
                replyMsg = `我猜你想看${page.title}-https://juejin.cn/post/${page.article_id}`
            }
            await this.msg!.say(replyMsg)
        }
    }
}

export default JuejinPage