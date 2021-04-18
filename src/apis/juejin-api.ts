import Axios from '../utils/axios/Axios'
const axios = new Axios('https://api.juejin.cn/recommend_api/v1/article/')

export interface IRecommend {
    client_type: number;
    cursor: string;
    id_type: number;
    limit: number;
    sort_type: number;
}
type pages ={data:any[]}

export function getJuejinPages (data:IRecommend) {
    return axios.request<pages>({
        method:"POST",
        url:'/recommend_all_feed',
        data
    })
}
