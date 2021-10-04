// 枚举 UI 界面操作背后的 schema 操作
enum SchemaOperation {
  // 插入一个控件schema,此时应当根据插入控件的类型，初始化它的 schema 初值
  insert = 'insert',
  // 更新一个控件的 schema
  update = 'update',
  // 删除一个控件的 schema，同时要考虑删除这个控件的副作用（比如动画效果、动作等）
  delete = 'delete',
  // 移动一个控件的 schema，可能是改变顺序，也可能是改变父节点
  move = 'move',
}

export default SchemaOperation;
