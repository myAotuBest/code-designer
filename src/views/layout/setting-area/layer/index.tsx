import React, { MouseEvent, useContext } from 'react';
import { Tooltip, Empty } from 'antd';
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  UnlockOutlined,
} from '@ant-design/icons';
import LnlineEdit from '@/components/lnlineEdit';
import { IComponentData } from '@/store/context';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import { AppContext, IContextProps } from '@/store/context';

import styles from './index.less';

export interface Iprops {
  setActive: (id: string) => void;
  updateComponent: (key: string, value: any, isRoot?: boolean) => void;
}
const LayerList: React.FC<Iprops> = ({ setActive, updateComponent }) => {
  const { state } = useContext<IContextProps>(AppContext);
  const { currentElement, components } = state;

  if (currentElement) {
    // 锁定、隐藏、修改图层名称统一操作
    const handleChange = (key: string, value: any, isRoot: boolean) => {
      updateComponent(key, value, isRoot);
    };

    // 设置选中项
    const selectItem = (
      e: MouseEvent<HTMLDivElement>,
      item: IComponentData
    ) => {
      e.preventDefault();
      setActive(item.id);
    };

    // TODO 拖动操作、留给林老哥改
    const onDragUpdate = (result: DropResult) => {};
    const onDragEnd = (result: DropResult) => {
      // console.log(result)
      const { source, destination } = result;
      if (!destination) return;
      let arr: IComponentData[] = [...components];
      // arr[0].
      const [remove] = arr.splice(source.index, 1);
      arr.splice(destination.index, 0, remove);
      // setComponentData(arr);
    };

    return (
      <div>
        {
          <DragDropContext
            onDragEnd={(result: DropResult) => onDragEnd(result)}
            onDragUpdate={(result: DropResult) => onDragUpdate(result)}
          >
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {components.map((item: IComponentData, index: number) => {
                    return (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(p) => (
                          <div
                            className={styles['layer-cell']}
                            ref={p.innerRef}
                            {...p.draggableProps}
                            {...p.dragHandleProps}
                            style={{
                              border:
                                currentElement === item.id
                                  ? '1px solid #1890ff'
                                  : '',
                            }}
                            onClick={(events: MouseEvent<HTMLDivElement>) =>
                              selectItem(events, item)
                            }
                          >
                            {/* 是否可见 */}
                            <span
                              onClick={() =>
                                handleChange('isHidden', !item.isHidden, true)
                              }
                              className={styles['hidden-text']}
                            >
                              <Tooltip title={item.isHidden ? '显示' : '隐藏'}>
                                {!item.isHidden ? (
                                  <EyeOutlined className={styles.icon} />
                                ) : (
                                  <EyeInvisibleOutlined
                                    className={styles.icon}
                                  />
                                )}
                              </Tooltip>
                            </span>

                            {/* 是否禁止编辑 */}
                            <span
                              onClick={() =>
                                handleChange('isLocked', !item.isLocked, true)
                              }
                              className={styles['hidden-text']}
                            >
                              <Tooltip title={item.isLocked ? '解锁' : '锁定'}>
                                {!item.isLocked ? (
                                  <UnlockOutlined className={styles.icon} />
                                ) : (
                                  <LockOutlined className={styles.icon} />
                                )}
                              </Tooltip>
                            </span>
                            <LnlineEdit
                              value={item.layerName}
                              onChange={(value) =>
                                handleChange('layerName', value, true)
                              }
                            />
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        }
      </div>
    );
  }
  return (
    <div>
      <Empty description="请选中组件" />
    </div>
  );
};

export default LayerList;
