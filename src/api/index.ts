import { get, post, patch, del } from "@/util/axios"

// 获取模版列表
export const fetchTemplates = (params) => get("/templates", params)
// 获取单个模版详情
export const fetchTemplate = (id: string) => get(`/templates/${id}`)
// 手机号登录
export const loginByPhoneNumber = (data) => post("/users/loginByPhoneNumber", data)
// 获取用户信息
export const getUserInfo = () => get("/users/getUserInfo")
// 获取画布信息
export const fetchWork = (id?: string) => get(`/works`)
// 保存画布信息
export const fetchSaveWork = (data: object, id?: string) => patch(`works/${id}`, data)

// 发布操作
export const fetchPublish = (data: object, id: string) => post(`/works/publish/${id}`, data)
// 获取渠道
export const getWorkChannels = (id: string) => get(`/channel/getWorkChannels/${id}`)
// 添加渠道
export const addWorkChannels = (data: object, id: string) => post(`/api/channel/${id}`, data)
// 删除渠道
export const deleteWorkChannels = (id: string) => del(`/channel/${id}`)
// 发布模版
export const publishTemplate = (id: string) => post(`/works/publish-template/${id}`)