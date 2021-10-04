/*
 * @message: 描述
 * @Author: Roy
 * @Email: @163.com
 * @Github: @163.com
 * @Date: 2021-07-13 15:18:13
 * @LastEditors: Roy
 * @LastEditTime: 2021-07-13 15:19:08
 * @Deprecated: 否
 * @FilePath: /cybertron-designer/src/views/home/home.tsx
 */
import React from 'react';
import { Row, Col } from 'antd';
import HomeHeader from '@/components/home/header';
import TemplateList from '@/components/home/templateList';
import style from './index.less';
import { TemplateProps } from '../../types/homeTemplist';
interface Welcome {
  image: string;
  title: string;
  subtitle: string;
}

const welcomeList: Welcome[] = [
  {
    image: '../../assets/html5.png',
    title: '专注H5 始终如一',
    subtitle: '三年保持行业领先',
  },
  {
    image: '../../assets/build.png',
    title: '海量 H5 模版',
    subtitle: '一键生成，一分钟轻松制作',
  },
  {
    image: '../../assets/bulb.png',
    title: '极致体验',
    subtitle: '用户的一致选择',
  },
];
const testData: TemplateProps[] = [
  {
    id: 1,
    coverImg: '../../assets/test/567308.png',
    title: '1024程序员日',
    author: 'Roy',
    copiedCount: 1,
  },
  {
    id: 2,
    coverImg: '../../assets/test/677311.png',
    title: '前端海报',
    author: 'Roy',
    copiedCount: 1,
  },
  {
    id: 3,
    coverImg: '../../assets/test/752918.png',
    title: '中秋节',
    author: 'Roy',
    copiedCount: 1,
  },
  {
    id: 4,
    coverImg: '../../assets/test/685936.jpeg',
    title: '图片',
    author: 'Roy',
    copiedCount: 1,
  },
  {
    id: 5,
    coverImg: '../../assets/test/322773.jpeg',
    title: '风景',
    author: 'Roy',
    copiedCount: 1,
  },
  {
    id: 6,
    coverImg: '../../assets/test/650134.png',
    title: '背景',
    author: 'Roy',
    copiedCount: 1,
  },
];
const Home: React.FC = () => {
  return (
    <div>
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
    </div>
  );
};

export default Home;
