import React from 'react';

// TODO
// props 属性待整合
const ContainerWidget = (props) => {
  const { text, ...restProps } = props;
  return (
    <ul {...restProps} style={{ width: 100, height: 300 }}>
      {text}
    </ul>
  );
};

export default ContainerWidget;
