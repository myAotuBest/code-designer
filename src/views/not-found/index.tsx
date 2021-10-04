import React, { ReactElement } from 'react';

export default class NotFound extends React.Component<any, any> {
  render(): ReactElement {
    return <div>路由不正确或者未找到需要加载的组件</div>;
  }
}
