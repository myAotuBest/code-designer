import WidgetSchema from '@/interface/schema/widget/widget.schema';
import DynamicObject from '@/interface/dynamic-object';
import EventSchema from '@/interface/schema/event.schema';
import HttpRequest from '@/interface/http-request';
import StyleValueUnit from '@/enum/style-value-unit';
import ContainerSchema from '@/interface/schema/widget/container.schema';
import WidgetType from '@/enum/schema/widget-type.enum';

export interface HttpRequestOption {
  header: DynamicObject;
  [key: string]: any;
}

export default interface PageSchema extends ContainerSchema {
  // 页面 id （32位 uuid）
  id: string;
  name: string;
  type: WidgetType;
  desc: string;
  props: {
    style: {
      [key: string]: {
        name: string;
        value: number;
        unit: StyleValueUnit;
      };
    };
    route: string;
    // 运行期间读取和写入的
    localStorage: {
      read: DynamicObject;
      write: DynamicObject;
    };
    query: {
      read: DynamicObject;
      write: DynamicObject;
    };
    // 页面用到的接口
    httpApi: HttpRequest[];
    // 发送事件给 native
    nativeEvent: {
      [key: string]: {
        name: string;
        payload: DynamicObject;
      };
    };
    // 接收 native 事件
    nativeMessage: {
      [key: string]: {
        name: string;
        payload: DynamicObject;
      };
    };
    // 页面的运行时状态 ( 包括远端数据 )
    state: DynamicObject;
    // 页面内的交互事件
    events: {
      // TODO 问题很大，还没有想清楚
      [key: string]: EventSchema;
    };
  };
  children: WidgetSchema[];
}
