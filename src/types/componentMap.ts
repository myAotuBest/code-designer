import Reat from 'react';
import TextWidget from '@/components/widgets/LText';
import ImageWidget from '@/components/widgets/LImage';
import ListWidget from '@/components/widgets/list';

type IComponentType = {
  name: string;
  component: Reat.ReactNode;
};

export interface IComponentToFrom {
  [key: string]: IComponentType;
}

// 组件、name 映射关系、实现 Vue 的 component.is
const componentMap: IComponentToFrom = {
  'l-text': {
    name: '文本组件',
    component: TextWidget,
  },
  'l-image': {
    name: '图片组件',
    component: ImageWidget,
  },
  'list-widget': {
    name: '列表组件',
    component: ListWidget,
  },
};
export default componentMap;
