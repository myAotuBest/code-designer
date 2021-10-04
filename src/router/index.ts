import { lazy } from 'react';
import NotFound from '@/views/not-found';
import { RouteProps } from 'react-router-dom';

interface RouteConfig extends RouteProps {
  name: string;
  redirect?: string;
}

const Login = lazy(() => import('@/views/login'))
const Index = lazy(() => import('@/views/home'))
const Detail = lazy(() => import('@/views/detail'))
const Design = lazy(() => import('@/views/design'))

export const routes: RouteConfig[] = [
  {
    path: '/',
    name: '首页',
    redirect: '/index',
  },

  {
    path: '/index',
    name: '首页',
    component: Index,
    children: [
      {
        path: '/detail/:id',
        name: '详情',
        component: Detail
      },
    ]
  },
  {
    path: '/detail/:id',
    name: '详情',
    component: Detail,
  },
  {
    path: '/design',
    name: '设计',
    component: Design,
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
