import React from 'react';
import useComponentCommon from '@/hooks/useComponentCommon';
import {
  ImageComponentProps,
  imageStylePropsNames,
  imageDefaultProps
} from '@/types/defaultProps';
import './index.less'

const ImageWidget = (props: ImageComponentProps) => {
  const { styleProps, handleClick } = useComponentCommon(
    props,
    imageStylePropsNames
  );

  return (
    <img src={props.src} style={{ ...styleProps }} onClick={handleClick} className="l-image-component" />
  );
};

ImageWidget.defaultProps = {
  ...imageDefaultProps,
};

export default ImageWidget;
