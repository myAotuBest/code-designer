import { PageData, PageProps, ComponentData } from "@/store/context"
export interface RespData<T = {}> {
    errno: number;
    data: T;
    message?: string
}

export interface ListData<T> {
    list: T[];
    count: number;
};

export interface WorkData extends Omit<PageData, "props"> {
    content: {
        components: ComponentData[],
        props?: PageProps
    }
}

export type RespListData<T> = RespData<ListData<T>>
export type RespWorkData = RespData<WorkData>
