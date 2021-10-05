import axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from "axios"
import { RespData } from "@/types/respType"
const instance = axios.create({
    baseURL: process.env.NODE_ENV === "development" ? "http://localhost:3000/api/" : 'https://api.imooc-lego.com/api',
    timeout: 1000,
    // headers: { 'Authorization': `Bearer ${token}` }
});

instance.interceptors.request.use((config: AxiosRequestConfig) => {
    // 可以设置一些全局的操作
    return config
})

instance.interceptors.response.use((response) => {
    // if (response.status === 200) {
    //     return response.data.data
    // } else {
    //     return response.data.data
    // }
    // store.finishLoading({status:true,message})
    const { data } = response
    const { errno, message } = data
    if (errno !== 0) {
        // store.setError({status:true,message}) 设置全局错误
        return Promise.reject(data)
    }
    return data
}, (e: AxiosError) => {
    // store.setError({status:true,message:服务器异常}) 设置全局错误
    return Promise.reject(e)
})

export function get(url: string, params?: object) {
    return instance.get(url, params)
}

export function post(url: string, data?: object) {
    return instance.post(url, data, { method: "post" })
}