import { mapValues, without } from 'lodash-es';
export interface CommonComponentProps {
  // actions
  actionType: string;
  url: string;
  // size
  height: string;
  width: string;
  paddingLeft: string;
  paddingRight: string;
  paddingTop: string;
  paddingBottom: string;
  // border type
  borderStyle: string;
  borderColor: string;
  borderWidth: string;
  borderRadius: string;
  // shadow and opacity
  boxShadow: string;
  opacity: string;
  backgroundColor: string;
  // position and x,y
  position: string;
  left: string;
  top: string;
  right: string;
}
export const commonDefaultProps: CommonComponentProps = {
  // actions
  actionType: '',
  url: '',
  // size
  height: '100px',
  width: '318px',
  paddingLeft: '0px',
  paddingRight: '0px',
  paddingTop: '0px',
  paddingBottom: '0px',
  // border type
  borderStyle: 'none',
  borderColor: '#000',
  borderWidth: '0',
  borderRadius: '0',
  // shadow and opacity
  boxShadow: '0 0 0 #000000',
  opacity: '1',
  backgroundColor: 'green',
  // position and x,y
  position: 'relative',
  left: '0',
  top: '0',
  right: '0',
};
export interface TextComponentProps extends CommonComponentProps {
  tag: string;
  text: string;
  fontSize: string;
  fontFamily: string;
  fontWeight: number;
  fontStyle: string;
  textDecoration: string;
  lineHeight: string;
  textAlign: string;
  color: string;
}

export interface ImageComponentProps extends CommonComponentProps {
  src: string;
}

export type AllComponentProps = TextComponentProps & ImageComponentProps;

export const textDefaultProps: TextComponentProps = {
  // basic props - font styles
  ...commonDefaultProps,
  height: '100px',
  width: '100%',
  tag: 'div',
  text: '文本内容',
  fontSize: '14px',
  fontFamily: '',
  fontWeight: 400,
  fontStyle: 'normal',
  textDecoration: 'none',
  lineHeight: '1',
  textAlign: 'left',
  color: '#000000',
  left: '0px',
  top: '0px',
  // position: 'absolute'
};

export const imageDefaultProps: ImageComponentProps = {
  src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180721%2Fdd58d97982aa4d5eae06efe62c563b88.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1635744462&t=9aae693ece0ea49bcb1fc5f8f85389f0',
  ...commonDefaultProps,
};

export const textStylePropNames: string[] = without(
  Object.keys(textDefaultProps),
  'actionType',
  'url',
  'text',
  'tag'
);

export const imageStylePropsNames: string[] = without(
  Object.keys(textDefaultProps),
  'actionType',
  'url',
  'text',
  'tag',
  'src'
);
