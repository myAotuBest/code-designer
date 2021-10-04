import { memo, createElement } from 'react';
import useComponentCommon from '@/hooks/useComponentCommon';
import {
  TextComponentProps,
  textDefaultProps,
  textStylePropNames,
} from '@/types/defaultProps';

const TextWidget = (props: TextComponentProps) => {
  let { tag, text } = props;
  if (!tag) {
    tag = 'div';
  }
  const { styleProps, handleClick } = useComponentCommon(
    props,
    textStylePropNames
  );
  return createElement(
    tag,
    {
      style: { ...styleProps },
      onClick: handleClick,
    },
    text
  );
};
TextWidget.defaultProps = {
  ...textDefaultProps,
};
export default memo(TextWidget);
