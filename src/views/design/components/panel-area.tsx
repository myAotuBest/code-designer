import React from 'react';
import Tabs from 'antd/es/tabs';
import ComponentPanel from '@/views/design/components/component/component-panel';

export interface PanelAreaState {
  tabPosition: 'left' | 'right' | 'top' | 'bottom';
}
const TabPane = Tabs.TabPane;

export default class PanelArea extends React.Component<{}, PanelAreaState> {
  constructor(props: any) {
    super(props);
    this.state = {
      tabPosition: 'left',
    };
  }

  render() {
    const { tabPosition } = this.state;
    const { TabPane } = Tabs;
    return (
      <>
        <Tabs tabPosition={tabPosition}>
          <TabPane tab="组件库" key="1">
            <ComponentPanel />
          </TabPane>
          <TabPane tab="组件树" key="2">
            Content of Tab 2
          </TabPane>
        </Tabs>
      </>
    );
  }
}
