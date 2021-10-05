import { memo, createElement, FC } from 'react';
import useComponentCommon from '@/hooks/useComponentCommon';
import {
  TextComponentProps,
  textDefaultProps,
  textStylePropNames,
} from '@/types/defaultProps';

type IProps = { tag?: string } & TextComponentProps

const TextWidget: FC<IProps> = (props) => {
  let { tag, text } = props;
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
  tag: "div"
};
export default memo(TextWidget);
