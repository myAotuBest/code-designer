import React, { useEffect, useState } from 'react';
import { Layout, Row, Col, Button } from 'antd';
import HomeHeader from '@/views/home/components/header';
import TemplateList from '@/views/home/components/templateList';
import { TemplateProps } from '@/types/respType';
import { Link } from 'react-router-dom';
import { getTemplates } from "@/api"
import style from './index.less';

import JiQiRen from '../../assets/qijiren.png';
import HTML5 from '../../assets/html5.png';
import Build from '../../assets/build.png';
import Bulb from '../../assets/bulb.png';

const { Header, Content, Footer } = Layout;

interface Welcome {
  image: string;
  title: string;
  subtitle: string;
}

const welcomeList: Welcome[] = [
  {
    image: HTML5,
    title: '专注H5 始终如一',
    subtitle: '三年保持行业领先',
  },
  {
    image: Build,
    title: '海量 H5 模版',
    subtitle: '一键生成，一分钟轻松制作',
  },
  {
    image: Bulb,
    title: '极致体验',
    subtitle: '用户的一致选择',
  },
];

const Index: React.FC = () => {
  let [templates, setList] = useState<TemplateProps[]>([])
  useEffect(() => {
    getTemplates({ pageIndex: 0, pageSize: 8 }).then((res: any) => {
      console.log(res);
      setList(res.list)
    })
  }, [])

  return (
    <div className={style.content}>
      <Header className={style.nav}>
        <div className={style.logo}>
          <img src={JiQiRen} />
          <h2>码农机器人</h2>
        </div>
        <Button type="primary" style={{ cursor: 'pointer' }}>
          <Link to="/login">登录</Link>
        </Button>
      </Header>
      <Layout>
        <Content style={{ backgroundColor: '#fff' }}>
          <HomeHeader />
          <Row className={style.welcome}>
            {welcomeList.map((item: Welcome, index: number) => {
              return (
                <Col key={index} span={8} className={style.item}>
                  <img src={item.image} />
                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>
                </Col>
              );
            })}
          </Row>
          <div className={style.templateList}>
            <div className={style.hotTitle}>
              <h2>热门海报</h2>
              <p>只需替换文字和图片，一键自动生成H5</p>
            </div>
            <TemplateList templateList={templates} />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          A hard-working code farm robot ©2021 Created by Robot
        </Footer>
      </Layout>
    </div>
  );
};
export default Index;
