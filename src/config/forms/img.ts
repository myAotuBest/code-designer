/*
 * @file 描述图片需要的表单属性
 */
import baseFormConfig from '@/config/forms/base';
import FormConfig from '@/interface/front-end/form-config';

const imgFormConfig: FormConfig[] = [
  baseFormConfig['position-setting'],
  baseFormConfig['visual-effect-setting'],
];

export default imgFormConfig;
