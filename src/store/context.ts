import { createContext } from 'react';
import { AllComponentProps } from '@/types/defaultProps';
export interface PageProps {
  backgroundColor: string;
  backgroundImage: string;
  backgroundRepeat: string;
  backgroundSize: string;
  height: string;
}
export interface PageData {
  id?: number;
  props?: PageProps;
  title?: string;
  desc?: string;
  coverImg?: string;
  uuid?: string;
  setting?: { [key: string]: any };
  isTemplate?: boolean;
  isHot?: boolean;
  isNew?: boolean;
  author?: string;
  copiedCount?: number;
  status?: number;
  user?: {
    gender: string;
    nickName: string;
    picture: string;
    userName: string;
  };
}

export interface IComponentData {
  /** uuid v4 生成 */
  id: string;
  /** 和mock里面的类型对应 也就是 React.createElement<tag> */
  type: string;
  /** 图标*/
  icon?: string;
  /** 组件名 */
  name: string;
  /** 标签名 可能一个组件有N种不同类型的组件 */
  tag?: string;
  /** 图层名称 */
  layerName?: string;
  /** 是否隐藏 */
  isHidden?: boolean;
  /** 是否锁定 */
  isLocked?: boolean;
  /** 组件属性 详情见 defaultProps */
  props: Partial<AllComponentProps>;
}

export type AllFormProps = PageProps & AllComponentProps;

export interface IEditorProps {
  // 供中间编辑器渲染的数组
  components: IComponentData[];
  // 当前编辑的是哪个元素，uuid
  currentElement: string;
  // 当然最后保存的时候还有有一些项目信息，这里并没有写出，等做到的时候再补充
  page: PageData;
  // 当前被复制的组件
  copiedComponent?: IComponentData;
  // 当前操作的历史记录
  // histories: HistoryProps[];
  // 当前历史记录的操作位置
  historyIndex: number;
  // 开始更新时的缓存值
  cachedOldValues: any;
  // 保存最多历史条目记录数
  maxHistoryNumber: number;
  // 数据是否有修改
  isDirty: boolean;
  // 当前 work 的 channels
  // channels: ChannelProps[];
}

export interface IContextProps {
  state: IEditorProps;
  dispatch: Function;
}

export const AppContext = createContext<IContextProps>(null);
