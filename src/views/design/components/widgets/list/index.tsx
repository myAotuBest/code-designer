import React from 'react';

import style from './index.less';

export default class ListWidget extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return <div className={style.main}>List Widget works!</div>;
  }
}
