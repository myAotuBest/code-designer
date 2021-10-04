/*
 * @file 动作的逻辑编排描述，是一个有向无环图
 */
import DynamicObject from '@/interface/dynamic-object';
import LogicUnitSchema from '@/interface/schema/logic/logic-unit-schema';

export default interface LogicChoreographySchema {
  // 动作的 id
  id: string;
  // 逻辑的函数体定义，包括签名和实现
  func: LogicUnitSchema;
  // 逻辑调用的实参，总是一个对象，所以不用关心参数的顺序
  params: DynamicObject;
  // 之后的动作 id
  next: string[];
}
