/*
 * @file 描述容器需要的表单属性
 */
import FormConfig from '@/interface/front-end/form-config';

const baseFormConfig: { [key: string]: FormConfig } = {
  'page-style-setting': {
    name: '页面',
    desc: '页面的整体设置',
    type: 'page-style-setting',
  },
  'position-setting': {
    name: '定位',
    desc: '在页面中放在哪个位置',
    type: 'position-setting',
  },
  'layout-setting': {
    name: '布局',
    desc: '该容器内的元素将如何排布',
    type: 'layout-setting',
  },
  'box-model-setting': {
    name: '盒模型',
    desc: '改元素的大小、内外边距',
    type: 'box-model-setting',
  },
  'visual-effect-setting': {
    name: '视觉效果',
    desc: '背景色、阴影、动画、过渡等',
    type: 'visual-effect-setting',
  },
  'font-setting': {
    name: '字体',
    desc: '选择字体、字号、字重和行高',
    type: 'font-setting',
  },
  'border-setting': {
    name: '边框',
    desc: '设置边框',
    type: 'border-setting',
  },
};
export default baseFormConfig;
