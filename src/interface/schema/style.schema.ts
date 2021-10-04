export default interface StyleSchema<T = any> {
  // 属性名
  name: string;
  // 属性值
  value: T;
  // 样式的单位
  unit?: string;
}
