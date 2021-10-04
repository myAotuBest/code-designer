import React, { Fragment, memo } from 'react';
import { Row } from 'antd';
import { reduce } from 'lodash-es';
import { mapPropsToForms, FormProps, PropToForm } from '@/types/propsMap';
import { AllFormProps } from '@/store/context';
import { firstToUpper } from '@/util';
import styles from './index.less';

interface IProps {
  props: any;
  onChange: (key: string, value: any) => void;
}

/**
 * 属性映射表单组件、不参与任何逻辑、只管输入、输出
 * @param props
 * @returns
 */

const Index: React.FC<IProps> = (props) => {
  const propMap = props.props;

  const finalProps = reduce(
    propMap,
    (result, value, key) => {
      const newKey = key as keyof AllFormProps;
      const item = mapPropsToForms[newKey] as PropToForm;

      if (item) {
        const {
          valueProp = 'value',
          eventName = 'change',
          initalTransform,
          afterTransform,
        } = item;
        const newItem: FormProps = {
          ...item,
          valueProp, // 自定义值的名称
          eventName, // 自定义事件名称
          value: initalTransform ? initalTransform(value) : value,
          events: {
            // eventName:change/foce 等 需要拼接成 onChange
            [`on${firstToUpper(eventName)}`]: (e: unknown) => {
              const value = afterTransform ? afterTransform(e) : e;
              props.onChange(key, value);
            },
          },
        };
        result[newKey] = newItem;
      }
      return result;
    },
    {} as FormProps
  );

  return (
    <div>
      {finalProps &&
        Object.keys(finalProps).map((key: string) => {
          const values = finalProps[key];
          const {
            component: Component,
            subComponent: SubComponent,
            options,
            valueProp,
            value,
            extraProps,
            events,
          } = values;
          const domProps = {
            [valueProp]: value,
            ...extraProps,
            ...events,
          };
          return (
            <Fragment key={key}>
              {Component && (
                <Row className={styles['prop-item']}>
                  <label className={styles.label}>{values.text}</label>
                  <Component {...domProps}>
                    {options && options.length
                      ? options.map((option) => {
                          return (
                            <SubComponent
                              value={option.value}
                              key={option.value}
                            >
                              {option.text}
                            </SubComponent>
                          );
                        })
                      : null}
                  </Component>
                </Row>
              )}
            </Fragment>
          );
        })}
    </div>
  );
};

export default memo(Index);
