import React, { lazy } from 'react';
import { Layout, Button } from 'antd';
import { Switch, Route, Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { PageData } from "@/store/context"
import style from './index.less';

import JiQiRen from '../../assets/qijiren.png';

const { Header, Content, Footer } = Layout;

const Home = lazy(() => import("@/views/home/home"))
const Template = lazy(() => import('@/views/detail'))

export type TemplateProps = Required<Omit<PageData, 'props' | 'setting'>>

const Index: React.FC = (props) => {
  return (
    <Layout className="layout" style={{ background: "#fff" }}>
      <Header className={style.nav}>
        <div className={style.logo}>
          <img src={JiQiRen} />
          <h2>码农机器人</h2>
        </div>
        <Button type="primary" style={{ cursor: 'pointer' }}>
          <Link to="/login">登录</Link>
        </Button>
      </Header>
      <Content className="site-layout" style={{ marginTop: 64 }}>
        <Switch>
          <Route exact path="/template/:id" component={Template} />
          <Route exact path="/home" component={Home} />
          <Redirect to="/home" />
        </Switch>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        A hard-working code farm robot ©2021 Created by Robot
      </Footer>
    </Layout>
  );
};
export default Index;
