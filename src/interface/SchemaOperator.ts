// 控件服务需要实现的接口
import SchemaOperationPayload from '@/interface/schema-operation-payload';

export default interface SchemaOperator {
  //  TODO: 等装好 schema 的 npm 包之后把 any 替换掉。
  insertWidget: (payload: SchemaOperationPayload) => any;
  // TODO: 同上
  updateWidget: (payload: SchemaOperationPayload) => any;
  // TODO: 同上
  deleteWidget: (payload: SchemaOperationPayload) => any;
  // TODO: 同上
  moveWidget: (payload: SchemaOperationPayload) => any;
}
