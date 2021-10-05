import React, { useReducer, ReactNode } from 'react';
import { cloneDeep } from 'lodash-es';
import { v4 as uuidv4 } from 'uuid';
import { message } from 'antd';
import { AppContext, IEditorProps } from './context';
import { getComponentState } from '@/util/store';
import { ComponentData } from './context';
import * as actionTypes from './contant';

const pageDefaultProps = {
  backgroundColor: 'red',
  backgroundImage: '',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  height: '560px',
};
export type MoveDirection = 'Up' | 'Down' | 'Left' | 'Right';

// const cacheData: IEditorProps = getComponentState();

const initState: IEditorProps = {
  components: [],
  currentElement: '',
  page: {
    props: pageDefaultProps,
    title: 'test title',
  },
  copiedComponent: null,
  historyIndex: -1,
  cachedOldValues: null,
  maxHistoryNumber: 5,
  isDirty: false,
};

export type ActionType = {
  type: string;
  data: {
    key?: string;
    value: any;
    isRoot?: boolean;
    id?: string; // 比如在右键操作时 没有操作选中的就用自己的传来的 id、否则默认用 state 里面的id
  };
};

const reducer = (state: IEditorProps, action: ActionType) => {
  const { key, value, isRoot, id } = action.data || {};
  console.log('key', key, 'value', value);
  const currentElementId = (id || state.currentElement)
  const currentComponent = state.components.filter(
    (item) => item.id === currentElementId
  )[0];
  let components = [...state.components];
  switch (action.type) {
    case actionTypes.SETACTIVE:
      return {
        ...state,
        currentElement: value,
      };
    case actionTypes.ADDCOMPONENT:
      (value as ComponentData).layerName = `图层${state.components.length + 1
        }`;
      components = components.concat(value);
      return {
        ...state,
        components,
      };
    case actionTypes.UPDATEPAGE:
      if (isRoot) {
        return {
          ...state,
          page: {
            ...state.page,
            [key]: value
          }
        }
      }
      return {
        ...state,
        page: {
          ...state.page,
          props: {
            ...state.page.props,
            [key]: value,
          },
        },
      };
    case actionTypes.UPDATECOMPONENT:
      let newData = [...state.components];
      newData = newData.map((data: ComponentData) => {
        if (currentElementId === data.id) {
          if (isRoot) {
            return {
              ...data,
              [key]: value,
            };
          } else {
            return {
              ...data,
              props: {
                ...data.props,
                [key]: value,
              },
            };
          }
        }
        return data;
      });
      return {
        ...state,
        components: newData,
      };
    case actionTypes.COPYCOMPONENT:
      if (currentComponent) {
        return {
          ...state,
          copiedComponent: currentComponent,
        };
      }
      return {
        ...state,
      };
    case actionTypes.PASTECOPIEDCOMPONENT:
      if (state.copiedComponent) {
        const clone = cloneDeep(state.copiedComponent);
        clone.id = uuidv4();
        clone.layerName = clone.layerName + '副本';
        state.components.push(clone);
        const newcomponents = [...state.components].concat(clone);
        message.success('已黏贴当前图层', 1);
        return {
          ...state,
          components: newcomponents,
        };
      }
      message.error('请先拷贝元素');
      return {
        ...state,
      };
    case actionTypes.DELETECOMPONENT:
      // const index = componentData.findIndex(v => v.id === state.currentElement)
      // const [deleteComponet] = componentData.splice(index, 1)
      if (currentComponent) {
        components = components.filter(
          (item) => item.id !== currentElementId
        );
        message.success('删除当前图层成功');
        return {
          ...state,
          components,
        };
      }
      return state;
    case actionTypes.MOVECOMPONENT:
      if (currentComponent) {
        const oldTop = parseInt(currentComponent.props.top || '0');
        const oldLeft = parseInt(currentComponent.props.left || '0');
        const { direction, amount } = value as {
          direction: MoveDirection;
          amount: number;
        };
        let key = '',
          newValue = '';
        switch (direction) {
          case 'Up': {
            key = 'top';
            newValue = oldTop - amount + 'px';
            break;
          }
          case 'Down': {
            key = 'top';
            newValue = oldTop + amount + 'px';
            break;
          }
          case 'Left': {
            key = 'left';
            newValue = oldLeft - amount + 'px';
            break;
          }
          case 'Right': {
            key = 'left';
            newValue = oldLeft + amount + 'px';
            break;
          }
          default:
            break;
        }
        // 进行属性合并
        components = components.map((data: ComponentData) => {
          if (currentElementId === data.id) {
            return {
              ...data,
              props: {
                ...data.props,
                [key]: newValue,
              },
            };
          }
          return data;
        });
        return {
          ...state,
          components,
        };
      }
      return state;
    case actionTypes.FETCHWORk:
      const newState = { ...state }
      let { content, ...rest } = value
      newState.page = { ...newState.page, ...rest }
      if (content.props) {
        newState.page.props = content.props
      }
      newState.components = content.components
      return {
        ...newState
      }
    default:
      return state;
  }
};

export default (props: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
};
