import React, { useReducer, ReactNode } from 'react';
import { cloneDeep } from 'lodash-es';
import { v4 as uuidv4 } from 'uuid';
import { message } from 'antd';
import { AppContext, IEditorProps } from './context';
import { getComponentState } from '@/util/store';
import { IComponentData } from './context';
import * as actionTypes from './contant';

const pageDefaultProps = {
  backgroundColor: 'red',
  backgroundImage: '',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  height: '560px',
};
export type MoveDirection = 'Up' | 'Down' | 'Left' | 'Right';

const cacheData: IEditorProps = getComponentState();

const initState: IEditorProps = {
  components: cacheData.components || [],
  currentElement: '',
  page: {
    props: cacheData.page?.props || pageDefaultProps,
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
  };
};

const reducer = (state: IEditorProps, action: ActionType) => {
  const { key, value, isRoot } = action.data || {};
  console.log('key', key, 'value', value);
  const currentComponent = state.components.filter(
    (item) => item.id === state.currentElement
  )[0];
  let components = [...state.components];

  switch (action.type) {
    case actionTypes.SETACTIVE:
      return {
        ...state,
        currentElement: value,
      };
    case actionTypes.ADDCOMPONENT:
      (value as IComponentData).layerName = `图层${
        state.components.length + 1
      }`;
      components = components.concat(value);
      return {
        ...state,
        components,
      };
    case actionTypes.UPDATEPAGE:
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
      newData = newData.map((data: IComponentData) => {
        if (state.currentElement === data.id) {
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
          (item) => item.id !== state.currentElement
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
        components = components.map((data: IComponentData) => {
          if (state.currentElement === data.id) {
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
