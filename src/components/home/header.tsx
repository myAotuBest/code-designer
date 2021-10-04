/*
 * @message: 描述
 * @Author: Roy
 * @Email: @163.com
 * @Github: @163.com
 * @Date: 2021-07-12 21:27:25
 * @LastEditors: Roy
 * @LastEditTime: 2021-07-13 16:49:47
 * @Deprecated: 否
 * @FilePath: /cybertron-designer/src/components/home/header.tsx
 */

import React from 'react';
import { Input } from 'antd';
import style from './index.less';

const { Search } = Input;

const HomeHeader: React.FC = () => {
  const onSearch = (value: string) => {
    console.log(value);
  };

  return (
    <div className={style.header}>
      <div className={style.text}>
        <h2 className={style.headline}>海量精彩设计 一键生成</h2>
        <div className={style.search}>
          <Search
            placeholder="搜索一下，快速找模版"
            onSearch={onSearch}
            enterButton
          />
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
