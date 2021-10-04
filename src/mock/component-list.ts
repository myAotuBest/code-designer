import { v4 as uuidv4 } from 'uuid';
import { IComponentData } from '@/store/context';
import {
  commonDefaultProps,
  imageDefaultProps,
  textDefaultProps,
} from '@/types/defaultProps';

const mockComponentList: Array<IComponentData> = [
  {
    id: uuidv4(),
    name: '容器',
    type: 'container-widget', // ContainerWidget ro container-widget
    icon: 'BuildOutlined',
    props: {
      ...commonDefaultProps,
    },
  },
  {
    id: uuidv4(),
    name: '文本',
    type: 'text-widget',
    icon: 'BuildOutlined',
    props: {
      ...textDefaultProps,
    },
  },
  {
    id: uuidv4(),
    name: '按钮',
    type: 'text-widget',
    icon: 'BuildOutlined',
    props: {
      ...textDefaultProps,
      tag: 'button',
    },
  },
  {
    id: uuidv4(),
    name: '图片',
    type: 'image-widget',
    icon: 'BuildOutlined',
    props: {
      ...imageDefaultProps,
    },
  },
];

export default mockComponentList;
