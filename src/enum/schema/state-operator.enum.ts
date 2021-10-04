/*
 * 映射 UI 用的操作符
 */
enum Operator {
  interpolate = 'interpolate',
  map = 'map',
  filter = 'filter',
  reduce = 'reduce',
  merge = 'merge',
  // custom 这个自定义操作符，需要用户自己扩展代码实现，目前还没有配套设计
  custom = 'custom',
}

export default Operator;
