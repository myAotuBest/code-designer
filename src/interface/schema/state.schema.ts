import Operator from '@/enum/schema/state-operator.enum';
import ValueSchema from '@/interface/schema/value.schema';

export default interface StateSchema {
  // 状态的名字，用来翻译为状态变量名，或者作为状态的注释
  name: string;
  // 当前值
  curVal: ValueSchema;
  calculation: {
    operator: Operator;
    input: any[];
    output: ValueSchema;
  };
}
