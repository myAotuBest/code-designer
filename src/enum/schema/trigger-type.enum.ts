/*
 * 触发类型
 * isolated 表示点击这个元素触发事件，
 * listItem 表示这是个列表项，或者是列表项内的一个元素
 * column
 */
export enum BindingType {
  isolated = 'isolated',
  listItem = 'listItem',
  columnItem = 'columnItem',
  rowItem = 'rowItem',
}
