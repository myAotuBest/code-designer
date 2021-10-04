import Design from '@/views/design';
import Index from '@/views/home';
import NotFound from '@/views/not-found';
import Layout from '@/views/layout';
import Login from '@/views/login';
import Detail from '@/views/detail';
import { RouteProps } from 'react-router-dom';

interface RouteConfig extends RouteProps {
  name: string;
  redirect?: string;
}

export const routeConfig: RouteConfig[] = [
  {
    path: '/',
    name: '首页',
    redirect: '/index',
  },

  {
    path: '/index',
    name: '首页',
    component: Index,
    // children: [
    //   {
    //     path: '/detail/:id',
    //     name: '详情',
    //     component: Detail
    //   },
    // ]
  },
  {
    path: '/detail/:id',
    name: '详情',
    component: Detail,
  },
  {
    path: '/design',
    name: '设计',
    component: Layout,
  },
  {
    path: '/login',
    name: '登录',
    component: Login,
  },
  {
    path: '*',
    name: '未知',
    component: NotFound,
  },
];
