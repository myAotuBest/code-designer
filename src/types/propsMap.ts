import { ReactNode } from 'react';
import { Input, InputNumber, Slider, Select, Radio, Button } from 'antd';
import Upload from '@/components/widgets/uploader';
import SketchPicker from '@/components/widgets/colorPicker';
import BackgroundProcesser from '@/components/backgroundProcesser';
import fontFamilyOptions from '../components/widgets/fontFamilyOptions';
import { AllFormProps } from '@/store/context';

const TextArea = Input.TextArea;
const Group = Radio.Group;
const Option = Select.Option;

// TODO
// SketchPicker 待二次封装、点击弹出来颜色选择器、不然太占位置
export interface PropToForm {
  component: any;
  subComponent?: any;
  value?: string;
  valueProp?: string;
  text?: string;
  extraProps?: { [key: string]: any };
  options?: { text: string | ReactNode; value: any }[];
  initalTransform?: (v: any) => any;
  afterTransform?: (v: any) => any;
  eventName?: string;
}

export interface FormProps {
  component: string;
  subComponent?: string;
  value: string;
  extraProps?: { [key: string]: any };
  text?: string;
  options?: { text: string | ReactNode; value: any }[];
  valueProp?: string;
  eventName?: string;
  events?: { [key: string]: (e: any) => void };
}

export type PropsToForms = {
  [P in keyof AllFormProps]?: PropToForm;
};

const pxToNumberHandler: PropToForm = {
  component: InputNumber,
  initalTransform: (v: string) => parseInt(v),
  afterTransform: (e: number) => (e ? `${e}px` : ''),
};

export const mapPropsToForms: PropsToForms = {
  // textComponentProps
  text: {
    text: '文本',
    component: TextArea,
    value: 'test',
    extraProps: { rows: 3 },
    afterTransform: (e: any) => e.target.value,
  },
  fontSize: {
    text: '字号',
    ...pxToNumberHandler,
  },
  lineHeight: {
    text: '行高',
    component: Slider,
    extraProps: { min: 0, max: 3, step: 0.1 },
    initalTransform: (v: string) => parseFloat(v),
    afterTransform: (e: number) => e.toString(),
  },
  textAlign: {
    component: Group,
    subComponent: Radio,
    text: '对齐',
    options: [
      { value: 'left', text: '左' },
      { value: 'center', text: '中' },
      { value: 'right', text: '右' },
    ],
    afterTransform: (e: any) => e.target.value,
  },
  fontFamily: {
    component: Select,
    subComponent: Option,
    text: '字体',
    options: [{ value: '', text: '无' }, ...fontFamilyOptions],
  },
  // fontWeight: {
  //   component: 'icon-switch',
  //   initalTransform: (v: string) => v === 'bold',
  //   afterTransform: (e: boolean) => e ? 'bold' : 'normal',
  //   valueProp: 'checked',
  //   extraProps: { iconName: 'BoldOutlined', tip: '加粗' }
  // },
  // fontStyle: {
  //   component: 'icon-switch',
  //   initalTransform: (v: string) => v === 'italic',
  //   afterTransform: (e: boolean) => e ? 'italic' : 'normal',
  //   valueProp: 'checked',
  //   extraProps: { iconName: 'ItalicOutlined', tip: '斜体' }
  // },
  // textDecoration: {
  //   component: 'icon-switch',
  //   initalTransform: (v: string) => v === 'underline',
  //   afterTransform: (e: boolean) => e ? 'underline' : 'none',
  //   valueProp: 'checked',
  //   extraProps: { iconName: 'UnderlineOutlined', tip: '下划线' }
  // },
  color: {
    component: SketchPicker,
    text: '字体颜色',
    valueProp: 'color',
  },
  backgroundColor: {
    component: SketchPicker,
    text: '背景颜色',
    valueProp: 'color',
  },
  // imageComponentProps
  src: {
    component: Upload,
    valueProp: 'src',
  },
  // commonComponentProps - sizes
  width: {
    text: '宽度',
    ...pxToNumberHandler,
  },
  height: {
    text: '高度',
    ...pxToNumberHandler,
  },
  paddingLeft: {
    ...pxToNumberHandler,
    text: '左边距',
  },
  paddingRight: {
    ...pxToNumberHandler,
    text: '右边距',
  },
  paddingTop: {
    ...pxToNumberHandler,
    text: '上边距',
  },
  paddingBottom: {
    ...pxToNumberHandler,
    text: '下边距',
  },
  // commonComponentProps - border type
  borderStyle: {
    component: Select,
    subComponent: Option,
    extraProps: {
      style: {
        width: '100px',
      },
    },
    text: '边框类型',
    options: [
      { value: 'none', text: '无' },
      { value: 'solid', text: '实线' },
      { value: 'dashed', text: '破折线' },
      { value: 'dotted', text: '点状线' },
    ],
  },
  borderColor: {
    text: '边框颜色',
    component: SketchPicker,
    valueProp: 'color',
  },
  borderWidth: {
    ...pxToNumberHandler,
    text: '边框宽度',
    extraProps: { min: 0, max: 20 },
  },
  borderRadius: {
    ...pxToNumberHandler,
    text: '边框圆角',
    extraProps: { min: 0, max: 200 },
  },
  // commonComponentProps - opacity and boxShadow
  opacity: {
    text: '透明度',
    component: Slider,
    initalTransform: (v: number) => v ? v * 100 : 100,
    afterTransform: (v: number) => v / 100,
    extraProps: { min: 0, max: 100, reverse: true },
  },
  // boxShadow: {
  //   component: 'shadow-picker'
  // },
  // commonComponentProps - positions
  left: {
    ...pxToNumberHandler,
    text: 'X轴坐标',
  },
  top: {
    ...pxToNumberHandler,
    text: 'Y轴坐标',
  },
  // commonComponentProps - actions and urls
  // actions
  actionType: {
    component: Select,
    subComponent: Option,
    text: '点击',
    options: [
      { value: '', text: '无' },
      { value: 'to', text: '跳转到 URL' }
    ],
    extraProps: {
      style: {
        width: '120px',
      },
    }
  },
  url: {
    component: Input,
    afterTransform: (e: any) => e.target.value,
    text: '链接地址',
  },
  backgroundImage: {
    text: '背景图片',
    component: BackgroundProcesser,
    initalTransform: (v: string) => {
      if (v) {
        const reg = /\(["'](.+)["']\)/g;
        const matches = reg.exec(v);
        if (matches && matches.length > 1) {
          console.log(matches);
          return matches[1];
        } else {
          return '';
        }
      } else {
        return '';
      }
    },
    afterTransform: (e: string) => (e ? `url('${e}')` : ''),
  },
};
