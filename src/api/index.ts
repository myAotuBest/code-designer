import { get, post } from "@/util/axios"

// 获取模版列表
export const getTemplates = (params) => get("/templates", params)
// 手机号登录
export const loginByPhoneNumber = (data) => post("/users/loginByPhoneNumber", data)
// 获取用户信息
export const getUserInfo = () => get("/users/getUserInfo")
// 获取画布信息
export const fetchWork = (id?: string) => get(`/works`)
