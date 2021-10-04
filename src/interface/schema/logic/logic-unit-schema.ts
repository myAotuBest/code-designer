import DynamicObject from '@/interface/dynamic-object';
import LogicBranchSchema from '@/interface/schema/logic/logic-branch.schema';

export default interface LogicUnitSchema {
  // 输入，就是入参
  input: DynamicObject;
  // 完整的函数定义（包括签名）
  func: string;
  // 输出，就是返回值
  output: LogicBranchSchema[];
  isAsync: boolean;
}
