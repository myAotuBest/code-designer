import { get } from "@/util/axios"

// 获取模版列表
export const getTemplates = (params) => get("/templates", params)