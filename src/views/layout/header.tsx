import React, { memo } from 'react';
import { Button } from 'antd';
import { saveComponentState } from '@/util/store';

// TODO
// 保存、发布、前进、后退、真机预览、导出JSON、导出源代码、导出JSON 等
const Header: React.FC<{ data: any }> = (props) => {
  const saveStore = () => saveComponentState(props.data);

  return (
    <div>
      导航操作栏
      <Button type="primary" onClick={saveStore}>
        保存
      </Button>
    </div>
  );
};

export default memo(Header);
