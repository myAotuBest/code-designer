import DynamicObject from '@/interface/dynamic-object';

export default interface LogicBranchSchema {
  // 逻辑分支的索引
  index: number;
  // 逻辑分支的中文助记名称，例如有数据，没数据
  name: string;
  // 描述
  desc: string;
  // 该分支下真实的反馈数据，为了保证结构一致，总是返回一个对象
  data: DynamicObject;
}
