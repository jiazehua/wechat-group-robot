import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
class HttpRequest {
  baseUrl: string
  constructor (baseUrl:string) {
    this.baseUrl = baseUrl
  }

  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        //
      }
    }
    return config
  }

  interceptors (instance:AxiosInstance) {
    instance.interceptors.request.use(config => {
      return config
    }, error => {
      return Promise.reject(error)
    })
    instance.interceptors.response.use(res => {
      const { data } = res
      return data
    }, error => {
      return Promise.reject(error.response.data)
    })
  }

  request<T=any> (options:AxiosRequestConfig):Promise<T> {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    // 拦截
    this.interceptors(instance)
    return new Promise((resolve, reject) => {
      instance.request(options).then(res => {
        resolve((res as unknown) as Promise<T>)
      }).catch((err) => {
        reject(err)
      })
    })
  }
}
export default HttpRequest
