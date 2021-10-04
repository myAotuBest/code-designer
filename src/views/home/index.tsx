/*
 * @message: 描述
 * @Author: Roy
 * @Email: @163.com
 * @Github: @163.com
 * @Date: 2021-06-29 22:34:52
 * @LastEditors: Roy
 * @LastEditTime: 2021-07-13 16:55:25
 * @Deprecated: 否
 * @FilePath: /cybertron-designer/src/views/home/index.tsx
 */
import React, { ReactNode } from 'react';
import { Layout, Row, Col, Button } from 'antd';
const { Header, Content, Footer } = Layout;
import style from './index.less';
import HomeHeader from '@/components/home/header';
import TemplateList from '@/components/home/templateList';
import { TemplateProps } from '../../types/homeTemplist';
import { Link } from 'react-router-dom';

import JiQiRen from '../../assets/qijiren.png';
import HTML5 from '../../assets/html5.png';
import Build from '../../assets/build.png';
import Bulb from '../../assets/bulb.png';
import Img1 from '../../assets/test/567308.png';
import Img2 from '../../assets/test/677311.png';
import Img3 from '../../assets/test/752918.png';
import Img4 from '../../assets/test/685936.jpeg';
import Img5 from '../../assets/test/322773.jpeg';
import Img6 from '../../assets/test/650134.png';
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
const testData: TemplateProps[] = [
  {
    id: 1,
    coverImg: Img1,
    title: '1024程序员日',
    author: 'Roy',
    copiedCount: 1,
  },
  {
    id: 2,
    coverImg: Img2,
    title: '前端海报',
    author: 'Roy',
    copiedCount: 1,
  },
  {
    id: 3,
    coverImg: Img3,
    title: '中秋节',
    author: 'Roy',
    copiedCount: 1,
  },
  {
    id: 4,
    coverImg: Img4,
    title: '图片',
    author: 'Roy',
    copiedCount: 1,
  },
  {
    id: 5,
    coverImg: Img5,
    title: '风景',
    author: 'Roy',
    copiedCount: 1,
  },
  {
    id: 6,
    coverImg: Img6,
    title: '背景',
    author: 'Roy',
    copiedCount: 1,
  },
];

const Index: React.FC = () => {
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
            <TemplateList templateList={testData} />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          A hard-working code farm robot ©2021 Created by Robot
        </Footer>
      </Layout>
    </div>
    // <div className="content-container">
    //   <h1>Coder X 一个任劳任怨的码农机器人</h1>
    //   <img alt="暂无图片" src="" />
    //   <Button type="primary">
    //     <Link to='/design'>开始设计</Link>
    //   </Button>

    // </div>
  );
};
export default Index;
