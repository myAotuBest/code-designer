import ValueType from '@/enum/value-type';

export default interface DataSourceSchema {
  // 变量名，自动生成
  name: string;
  // 变量类型
  type: ValueType;
  // 样例数据
  example: any;
  // 字段
  fields?: DataSourceSchema[];
}
