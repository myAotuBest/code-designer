import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Avatar, Button } from 'antd';
import { TemplateProps } from '../home';
import { fetchTemplate } from '@/api'
import dataJson from './mock.json'
import styles from './index.less';


const Detail: React.FC = () => {

  const params = useParams<{ id: string }>()

  const [template, setTemplate] = useState<TemplateProps>({} as TemplateProps)

  useEffect(() => {
    fetchDetail()
  }, [])

  const fetchDetail = async () => {
    if (params && params.id) {
      try {
        const { data } = await fetchTemplate('1')
        setTemplate(data.data)
      } catch (error) {
        setTemplate(dataJson.data)
      }
    }
  }

  const download = () => { };
  return (
    <div className={styles["work-detail-container"]}>
      <Row justify="center" v-if="template">
        <Col span={8} className={styles["cover-img"]}>
          <a>
            <img src={template.coverImg} alt="" id="cover-img" />
          </a>
        </Col>
        <Col span={8}>
          <h2>{template.title}</h2>
          <p>{template.desc}</p>
          <div className={styles["author"]}>
            <Avatar>V</Avatar>
            该模版由 <b>{template.author}</b> 创作
          </div>
          <div className={styles["bar-code-area"]}>
            <span>扫一扫，手机预览</span>
            <canvas id="barcode-container"></canvas>
          </div>
          <div className={styles["use-button"]}>
            <Link to="/design/1">
              <Button type="primary" size="large">使用模版</Button>
            </Link>
            <Button size="large" onClick={download}>下载图片海报</Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Detail;
