import React, { FC, memo } from 'react';
import { Collapse, Empty } from 'antd';
import { AllComponentProps } from '@/types/defaultProps';
import { difference } from 'lodash-es';
import PropsTable from '@/components/propsTable';
const { Panel } = Collapse;

export interface GroupProps {
  text: string;
  items: string[];
  props?: AllComponentProps;
}

const defaultEditGroups: GroupProps[] = [
  {
    text: '尺寸',
    items: [
      'height',
      'width',
      'paddingLeft',
      'paddingRight',
      'paddingTop',
      'paddingBottom',
    ],
  },
  {
    text: '边框',
    items: ['borderStyle', 'borderColor', 'borderWidth', 'borderRadius'],
  },
  {
    text: '位置',
    items: ['left', 'top'],
  },
  {
    text: '阴影与透明度',
    items: ['opacity', 'boxShadow'],
  },
  {
    text: '事件功能',
    items: ['actionType', 'url'],
  },
];
export interface IProps {
  props: any;
  updateComponent: (key: string, value: any) => void;
  currentElement?: string;
}
const EditGroup: FC<IProps> = (props) => {
  if (props.props) {
    const propMap = props.props;
    const allNormalProps = defaultEditGroups.reduce((prev, current) => {
      return [...prev, ...current.items];
    }, [] as string[]);
    // diff 不在这里面的
    const specialProps = difference(Object.keys(propMap), allNormalProps);
    const newGroups: GroupProps[] = [
      {
        text: '基本属性',
        items: specialProps,
      },
      ...defaultEditGroups,
    ];
    const editGroups = newGroups.map((group: GroupProps) => {
      const propsMap = {};
      group.items.forEach((item) => {
        const key = item as keyof AllComponentProps;
        propsMap[key] = propMap[key];
      });
      return {
        ...group,
        props: propsMap,
      };
    });

    return (
      <Collapse defaultActiveKey={editGroups[0].text}>
        {editGroups.map((item) => {
          return (
            <Panel header={item.text} key={item.text}>
              <PropsTable props={item.props} onChange={props.updateComponent} />
            </Panel>
          );
        })}
      </Collapse>
    );
  }
  return <Empty description="请选中组件" />;
};
export default memo(EditGroup);
