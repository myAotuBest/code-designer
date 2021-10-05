import React, { ReactElement } from 'react';
import { Result, Button } from 'antd';
export default class NotFound extends React.Component<any, any> {
  render(): ReactElement {
    return <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button type="primary">Back Home</Button>}
    />
  }
}
