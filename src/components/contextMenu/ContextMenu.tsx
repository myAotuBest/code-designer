import React, { useRef, useEffect, FC } from "react"
import { getParentElement } from "@/util"
import { ActionItem } from './index'
import styles from "./index.less"

interface IProps {
    actions: ActionItem[],
    triggerClass?: string
}

const ContextMenu: FC<IProps> = (props) => {
    const menuRef = useRef()
    let componentId = useRef<string>('')
    useEffect(() => {
        document.addEventListener('contextmenu', triggerContextMenu);
        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('contextmenu', triggerContextMenu);
            document.removeEventListener('click', handleClick);
        };
    }, []);

    const triggerContextMenu = (e: MouseEvent) => {
        const menuContainer = menuRef.current as HTMLDivElement
        const warpperElement = getParentElement(e.target as HTMLElement, props.triggerClass);
        if (warpperElement) {
            e.preventDefault();
            menuContainer.style.display = 'block';
            menuContainer.style.top = e.pageY + 'px';
            menuContainer.style.left = e.pageX + 'px';
            // 可以通过 warpperElement data-component-id 拿到对应的 id
            componentId.current = warpperElement.getAttribute("data-component-id")
        }
    };

    const handleClick = () => {
        const menuContainer = menuRef.current as HTMLDivElement
        menuContainer.style.display = "none"
    }

    return (
        <ul
            className={styles['menu-container']}
            ref={menuRef}
            id="menuContainer"
        >
            {props.actions.map((item, index) => {
                return (
                    <li onClick={() => item.action(componentId.current)} key={index}>
                        {item.text}  {item.shortcut}
                    </li>
                );
            })}
        </ul>
    );
};

ContextMenu.defaultProps = {
    triggerClass: 'edit-wrapper-box'
}

export default ContextMenu