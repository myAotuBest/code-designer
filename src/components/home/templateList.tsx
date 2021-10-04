/*
 * @message: 描述
 * @Author: Roy
 * @Email: @163.com
 * @Github: @163.com
 * @Date: 2021-07-12 22:40:30
 * @LastEditors: Roy
 * @LastEditTime: 2021-07-13 15:33:09
 * @Deprecated: 否
 * @FilePath: /cybertron-designer/src/components/home/templateList.tsx
 */
import React from 'react';
import { Row, Col, Card, Button } from 'antd';
import { Link } from 'react-router-dom';
import { TemplateProps } from '../../types/homeTemplist';
const { Meta } = Card;

import style from './index.less';

interface IProps {
  templateList: TemplateProps[];
}

const TemplateList: React.FC<IProps> = (props) => {
  return (
    <div className={style.component}>
      <Row gutter={16}>
        {props.templateList.map((item: TemplateProps) => {
          return (
            <Col key={item.id} span={6} className={style.poster}>
              <Link to="/">
                <Card
                  hoverable
                  cover={
                    <div>
                      <img src={item.coverImg} />
                      <div className={style.hoverItem}>
                        <Button size="large" type="primary">
                          <Link to="/design">使用该模版创建</Link>
                        </Button>
                      </div>
                    </div>
                  }
                >
                  <Meta
                    title={item.title}
                    description={
                      <div className={style.description}>
                        <span>作者：{item.author}</span>
                        <span className={style.number}>{item.copiedCount}</span>
                      </div>
                    }
                  ></Meta>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default TemplateList;
