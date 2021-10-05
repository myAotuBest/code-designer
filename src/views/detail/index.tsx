import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Avatar, Button } from 'antd';
import { TemplateProps } from '../home';
import './index.less';


const Detail: React.FC = () => {

  const [template, setTemplate] = useState<TemplateProps>({} as TemplateProps)

  const download = () => { };
  return (
    <div className="work-detail-container">
      <Row justify="center" v-if="template">
        <Col span={8} className="cover-img">
          <a>
            <img src={template.coverImg} alt="" id="cover-img" />
          </a>
        </Col>
        <Col span={8}>
          <h2>{template.title}</h2>
          <p>{template.desc}</p>
          <div className="author">
            <Avatar>V</Avatar>
            该模版由 <b>{template.author}</b> 创作
          </div>
          <div className="bar-code-area">
            <span>扫一扫，手机预览</span>
            <canvas id="barcode-container"></canvas>
          </div>
          <div className="use-button">
            <Link to="/design/1">
              <Button type="primary" size="large">
                使用模版
              </Button>
            </Link>
            <Button size="large" onClick={download}>
              下载图片海报
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Detail;
