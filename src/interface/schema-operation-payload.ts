import SchemaOperation from '@/enum/schema-operation';

export default interface SchemaOperationPayload {
  type: SchemaOperation;
  // 这个控件自己的 schema id
  id: string;
  parentId: string;
  // TODO 待装入 schema 标准的 npm 包后替换为 Schema 类型
  schema: any;
}
