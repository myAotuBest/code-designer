import React from 'react'
import ReactDOM from 'react-dom'
import ContextMenu from './ContextMenu'

export interface ActionItem {
    action: (cid?: string) => void;
    text: string;
    shortcut: string;
}

export default function createContextMenu(actions: ActionItem[], triggerClass = "edit-wrapper-box") {
    const container = document.createElement("div")
    // ReactDOM.createPortal 也可以添加到外部
    ReactDOM.render(<ContextMenu actions={actions} triggerClass={triggerClass} />, container)
    document.body.append(container)
}