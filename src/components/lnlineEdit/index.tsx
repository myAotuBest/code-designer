import React, { useState, createRef, useRef, memo, useEffect } from 'react';
import { Typography } from 'antd';
import useKeyPress from '@/hooks/useKeyPress';
import useClickOutside from '@/hooks/useClickOutside';

const { Paragraph } = Typography;

interface IProps {
  value: string;
  onChange: (value: any) => void;
}

const LnlineEdit = (props: IProps) => {
  // let isEditing = useRef<boolean>(false)
  // let [count, setCount] = useState(0)
  let [innerValue, setValue] = useState(props.value);
  // const wrapper = createRef<HTMLDivElement>()

  //let isOutside = useClickOutside(wrapper)

  // useKeyPress("Enter", () => {
  //     // hooks 闭包问题
  //     if (isEditing.current) {
  //         isEditing.current = false
  //         props.onChange(innerValue)
  //         setCount(Math.random())
  //     }
  // })

  // useKeyPress("Escape", () => {
  //     if (isEditing.current) {
  //         isEditing.current = false
  //         props.onChange(props.value)
  //         setCount(Math.random())
  //     }
  // })

  // if (isEditing.current && isOutside) {
  //     isEditing.current = false
  //     props.onChange(props.value)
  //     setCount(Math.random())
  // }

  // const handleClick = (e) => {
  //     e.stopPropagation()
  //     isEditing.current = true
  //     setCount(Math.random())
  // }
  const onChange = (value) => {
    setValue(value);
    props.onChange(value);
  };

  return (
    <Paragraph
      style={{ display: 'inline-block' }}
      editable={{ onChange: onChange }}
    >
      {innerValue}
    </Paragraph>
  );
};

export default memo(LnlineEdit);
