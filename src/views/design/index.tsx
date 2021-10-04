import React, { Component, ReactElement } from 'react';
import EditorArea from './components/editor-area/editor-area';
import PanelArea from './components/panel-area';
import SettingArea from './components/setting-area/setting-area';
import { v4 as uuid } from 'uuid';
import StyleValueUnit from '@/enum/style-value-unit';
import WidgetType from '@/enum/schema/widget-type.enum';
import PageSchema from '@/interface/schema/page.schema';

import style from './index.less';
import ToolBar from '@/views/design/components/tool-bar';

export interface DesignState {
  schema: PageSchema | null;
}

export default class Design extends Component<{}, DesignState> {
  constructor(props: any) {
    super(props);
    this.state = {
      schema: {
        id: uuid(),
        name: '页面',
        desc: '页面',
        type: WidgetType.page,
        props: {
          style: {
            width: {
              name: 'width',
              value: 375,
              unit: StyleValueUnit.px,
            },
            height: {
              name: 'height',
              value: 812,
              unit: StyleValueUnit.px,
            },
          },
          route: '',
          // 运行期间读取和写入的
          localStorage: {
            read: {},
            write: {},
          },
          query: {
            read: {},
            write: {},
          },
          // 页面用到的接口
          httpApi: [],
          // 发送事件给 native
          nativeEvent: {},
          // 接收 native 事件
          nativeMessage: {},
          // 页面的运行时状态 ( 包括远端数据 )
          state: {},
          // 页面内的交互事件
          events: {},
        },
        children: [],
      },
    };
  }

  render(): ReactElement {
    const { schema } = this.state;
    return (
      <div className={style.main}>
        <section className={style.toolBar}>
          <ToolBar />
        </section>
        <section className={style.body}>
          <div className={style.left}>
            <PanelArea />
          </div>
          <div className={style.center}>
            <EditorArea schema={schema} />
          </div>
          <div className={style.right}>
            <SettingArea />
          </div>
        </section>
      </div>
    );
  }
}
