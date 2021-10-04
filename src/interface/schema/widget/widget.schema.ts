/*
 * @file 控件 schema
 */

import WidgetType from '@/enum/schema/widget-type.enum';
import DynamicObject from '@/interface/dynamic-object';

export default interface WidgetSchema {
  // widget 的 id （32位 uuid）
  id: string;
  // widget 的类型
  type: WidgetType;
  // widget 的 语义名字，例如标题，文案，不可以重名
  name: string;
  // 表单项描述
  desc: string;
  // 包括数据，事件，回调等等
  props: DynamicObject;
}
