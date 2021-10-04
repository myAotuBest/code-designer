export interface RespData<T> {
    error: number;
    data: T;
}

export interface ListData<T> {
    list: T[];
    count: number;
};

export type RespListData<T> = RespData<ListData<T>>

export interface TemplateProps {
    id: number;
    coverImg: string;
    title: string;
    author: string;
    copiedCount: number;
}