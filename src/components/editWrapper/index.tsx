import React, { MouseEvent, useRef, HTMLAttributes } from 'react';
import { pick } from 'lodash-es';
import classNames from 'classnames';
import styles from './index.less';
type ResizeDirection =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';
interface OriginalPositions {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

export interface IProps {
  updatePosition: (params: any) => void;
  id: string;
  active: boolean;
  props: Object;
  setActive: (id: string) => void;
}
const EditWrapper: React.FC<IProps> = (props) => {
  const editWrapper = useRef<HTMLDivElement>();
  const style = pick(props.props, [
    'position',
    'top',
    'left',
    'width',
    'height',
  ]) as HTMLAttributes<HTMLDivElement>;

  const gap = {
    x: 0,
    y: 0,
  };
  // 检测元素是否移动（光点击不需要去修改）
  let isMoving = false;
  // 点击选中当前操作元素
  const onItemClick = () => props.setActive(props.id);

  const caculateMovePosition = (e: globalThis.MouseEvent) => {
    const container = document.getElementById('canvas-area') as HTMLElement;
    const left = e.clientX - gap.x - container.offsetLeft;
    const top =
      e.clientY -
      gap.y -
      container.offsetTop +
      container.scrollTop +
      document.documentElement.scrollTop;
    return {
      left,
      top,
    };
  };

  const startMove = (e: MouseEvent) => {
    if (editWrapper.current) {
      const { left, top } = editWrapper.current.getBoundingClientRect();
      gap.x = e.clientX - left;
      gap.y = e.clientY - top;
    }
    const handleMove = (e: globalThis.MouseEvent) => {
      const { left, top } = caculateMovePosition(e);
      isMoving = true;
      if (editWrapper.current) {
        let dom = editWrapper.current.childNodes[0] as HTMLElement;
        dom.style.top = top + 'px';
        dom.style.left = left + 'px';
        editWrapper.current.style.top = top + 'px';
        editWrapper.current.style.left = left + 'px';
      }
    };

    const handleMouseUp = (e: globalThis.MouseEvent) => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleMouseUp);
      if (isMoving) {
        const { left, top } = caculateMovePosition(e);
        if (props.updatePosition) {
          const { width, height } = editWrapper.current.style;
          props.updatePosition({ left, top, width, height });
          isMoving = false;
        }
      }
      setTimeout(() => {
        document.addEventListener('mouseup', handleMouseUp);
      }, 0);
    };
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const caculateSize = (
    direction: ResizeDirection,
    e: globalThis.MouseEvent,
    positions: OriginalPositions
  ) => {
    const { clientX, clientY } = e;
    const { left, right, top, bottom } = positions;
    const container = document.getElementById('canvas-area') as HTMLElement;
    const rightWidth = clientX - left;
    const leftWidth = right - clientX;
    const bottomHeight = clientY - top;
    const topHeight = bottom - clientY;
    const topOffset =
      clientY -
      container.offsetTop +
      container.scrollTop +
      document.documentElement.scrollTop;
    const leftOffset = clientX - container.offsetLeft;
    switch (direction) {
      case 'top-left':
        return {
          width: leftWidth,
          height: topHeight,
          top: topOffset,
          left: leftOffset,
        };
      case 'top-right':
        return {
          width: rightWidth,
          height: topHeight,
          top: topOffset,
        };
      case 'bottom-left':
        return {
          width: leftWidth,
          height: bottomHeight,
          left: leftOffset,
        };
      case 'bottom-right':
        return {
          width: rightWidth,
          height: bottomHeight,
        };
      default:
        return {};
    }
  };

  const startResize = (e: MouseEvent, direction: ResizeDirection) => {
    e.stopPropagation();
    const currentElement = editWrapper.current;
    const { left, right, top, bottom } = currentElement.getBoundingClientRect();
    const handleMove = (e: globalThis.MouseEvent) => {
      const size = caculateSize(direction, e, { left, right, top, bottom });
      const { style } = currentElement;
      let dom = editWrapper.current.childNodes[0] as HTMLElement;
      if (size) {
        style.width = size.width + 'px';
        style.height = size.height + 'px';
        dom.style.width = size.width + 'px';
        dom.style.height = size.height + 'px';
        if (size.left) {
          style.left = size.left + 'px';
          dom.style.left = size.left + 'px';
        }
        if (size.top) {
          style.top = size.top + 'px';
          dom.style.top = size.top + 'px';
        }
      }
    };

    const handleMouseUp = (e: globalThis.MouseEvent) => {
      const size = caculateSize(direction, e, { left, right, top, bottom });
      if (props.updatePosition) {
        props.updatePosition({ ...size });
      }
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleMouseUp);
      setTimeout(() => {
        document.addEventListener('mouseup', handleMouseUp);
      }, 0);
    };
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleMouseUp);
  };
  return (
    <div
      ref={editWrapper}
      id={'wrapper' + props.id}
      className={classNames(
        styles['edit-wrapper'],
        props.active ? styles['active'] : '',
        'edit-wrapper-box'
      )}
      style={{ ...style }}
      onClick={onItemClick}
      onMouseDown={startMove}
    >
      {props.children}
      <div className={styles.resizers}>
        <div
          className={classNames(styles.resizer, styles['top-left'])}
          onMouseDown={(e: MouseEvent) => {
            startResize(e, 'top-left');
          }}
        ></div>
        <div
          className={classNames(styles.resizer, styles['top-right'])}
          onMouseDown={(e: MouseEvent) => {
            startResize(e, 'top-right');
          }}
        ></div>
        <div
          className={classNames(styles.resizer, styles['bottom-left'])}
          onMouseDown={(e: MouseEvent) => {
            startResize(e, 'bottom-left');
          }}
        ></div>
        <div
          className={classNames(styles.resizer, styles['bottom-right'])}
          onMouseDown={(e: MouseEvent) => {
            startResize(e, 'bottom-right');
          }}
        ></div>
      </div>
    </div>
  );
};

export default EditWrapper;
