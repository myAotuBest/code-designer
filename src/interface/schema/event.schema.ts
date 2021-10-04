import EventType from '@/enum/schema/event-type.enum';
import { BindingType } from '@/enum/schema/trigger-type.enum';
import LogicChoreographySchema from '@/interface/schema/logic/logic-choreography.schema';

export default interface EventSchema {
  // 事件的语义化的助记名称
  name: string;
  // 事件描述
  desc: string;
  // 事件的类型
  eventType: EventType;
  // 触发事件的 widget 或者组件的 id （32位 uuid）
  sourceWidget: {
    // widget的 uuid
    id: string;
    // 事件的绑定类型，孤立元素，列表项，行，列，目的是为了确定要给多少元素绑定事件
    type: BindingType;
  };
  logicChoreography: LogicChoreographySchema;
}
