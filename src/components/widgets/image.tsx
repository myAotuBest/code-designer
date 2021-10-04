import React from 'react';
import {
  ImageComponentProps,
  imageStylePropsNames,
  textDefaultProps,
} from '@/types/defaultProps';
import useComponentCommon from '@/hooks/useComponentCommon';

const ImageWidget = (props: ImageComponentProps) => {
  const { styleProps, handleClick } = useComponentCommon(
    props,
    imageStylePropsNames
  );

  return (
    <img src={props.src} style={{ ...styleProps }} onClick={handleClick} />
  );
};

ImageWidget.defaultProps = {
  ...textDefaultProps,
};

export default ImageWidget;
