import React from 'react';
import { Row, Col, Card, Button } from 'antd';
import { Link } from 'react-router-dom';
import { TemplateProps } from '../index';
import style from './index.less';
const { Meta } = Card;

interface IProps {
  templateList: TemplateProps[];
}

const TemplateList: React.FC<IProps> = (props) => {
  return (
    <div className={style.component}>
      <Row gutter={16}>
        {props.templateList.length && props.templateList.map((item: TemplateProps) => {
          return (
            <Col key={item.id} span={6} className={style.poster}>
              <>
                <Card
                  hoverable
                  cover={
                    <div>
                      <img src={item.coverImg} />
                      <div className={style.hoverItem}>
                        <Button size="large" type="primary">
                          <Link to="/detail/1">使用该模版创建</Link>
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
              </>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default TemplateList;
