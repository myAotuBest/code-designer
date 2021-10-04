import axios, { AxiosResponse } from "axios"
import { RespData } from "@/types/respType"
const instance = axios.create({
    baseURL: process.env.NODE_ENV === "development" ? "http://localhost:3000/api/" : 'https://api.imooc-lego.com/api',
    timeout: 1000,
    // headers: { 'Authorization': `Bearer ${token}` }
});

instance.interceptors.response.use((response: AxiosResponse<RespData<any>>) => {
    if (response.status === 200) {
        return response.data.data
    } else {
        return response.data.data
    }
})

export function get(url: string, params: object) {
    return instance.get(url, params)
}

export function post(url: string, data: object) {
    return instance.post(url, data, { method: "post" })
}