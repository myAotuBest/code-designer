import Reat from 'react';
import TextWidget from '@/components/widgets/LText';
import ContainerWidget from '@/components/widgets/container';
import ImageWidget from '@/components/widgets/image';
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
  'container-widget': {
    name: '容器组件组件',
    component: ContainerWidget,
  },
  'text-widget': {
    name: '文本组件',
    component: TextWidget,
  },
  'image-widget': {
    name: '图片组件',
    component: ImageWidget,
  },
  'list-widget': {
    name: '列表组件',
    component: ListWidget,
  },
};
export default componentMap;
