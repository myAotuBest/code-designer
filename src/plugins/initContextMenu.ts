import { useEffect, useContext } from "react"
import { ActionItem } from "@/components/contextMenu"
import createContextMenu from '@/components/contextMenu'
import { AppContext, IContextProps } from '@/store/context';
import { SETACTIVE, DELETECOMPONENT, PASTECOPIEDCOMPONENT, COPYCOMPONENT } from '@/store/contant'

export default function initContextMenu() {
    const { dispatch } = useContext<IContextProps>(AppContext);

    const editorActions: ActionItem[] = [
        {
            shortcut: 'command+c', text: "拷贝图层", action: (cid: string) => {
                dispatch({
                    type: COPYCOMPONENT,
                    data: {
                        id: cid
                    }
                });
            }
        },
        {
            shortcut: 'command+v', text: "粘贴图层", action: (cid: string) => {
                dispatch({
                    type: PASTECOPIEDCOMPONENT,
                });
            }
        },
        {
            shortcut: 'command+backspace', text: "删除图层", action: (cid: string) => {
                dispatch({
                    type: DELETECOMPONENT,
                    data: {
                        id: cid
                    }
                });
            }
        },
        {
            shortcut: 'esc', text: "取消选中", action: (cid: string) => {
                dispatch({
                    type: SETACTIVE,
                    data: {
                        value: '',
                    },
                });
            }
        }
    ]

    const settingAction: ActionItem[] = [
        { shortcut: 'cv', text: "复制配置", action: () => { } }
    ]
    useEffect(() => {
        // 画布右键操作
        createContextMenu(editorActions, "edit-wrapper-box")
        // 表单编辑右键操作
        createContextMenu(settingAction, "pane-setting")
    }, [dispatch])
}