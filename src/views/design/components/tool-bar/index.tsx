import React from 'react';

import style from './index.less';

export default class ToolBar extends React.Component<{}, {}> {
  render() {
    return (
      <div className={style.main}>
        <div className={style.left}>左边</div>
        <div className={style.center}>中间</div>
        <div className={style.right}>右边</div>
      </div>
    );
  }
}
