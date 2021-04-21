// 使用的是微信 智能对话平台https://developers.weixin.qq.com/doc/aispeech/platform/INTRODUCTION.html

import Axios from '../utils/axios/Axios'
const axios = new Axios('https://openai.weixin.qq.com')

export interface IweixinQuery {
    query: string;
}
export interface IweixinResponse {
    answer:string,
    answer_type:'text'|'music'|'news'
}
export function getWeiXinAi (data:IweixinQuery) {
    return axios.request<IweixinResponse>({
        method:"POST",
        url:'/openapi/message/=',
        data
    })
}
