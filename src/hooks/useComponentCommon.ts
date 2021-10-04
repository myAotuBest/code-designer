import { useEffect, useState } from 'react';
import { pick } from 'lodash-es';
import { CommonComponentProps } from '@/types/defaultProps';

const useComponentCommon = (
  props: Readonly<Partial<CommonComponentProps & { isEditing: boolean }>>,
  picks: string[]
) => {
  const [styleProps, setStyleProps] = useState({});
  useEffect(() => {
    const formatStyleProps = pick(props, picks);
    setStyleProps(formatStyleProps);
  }, [props, picks]);

  const handleClick = () => {
    if (props.actionType === 'url' && props.url && !props.isEditing) {
      window.location.href = props.url;
    }
  };
  return {
    styleProps,
    handleClick,
  };
};

export default useComponentCommon;
