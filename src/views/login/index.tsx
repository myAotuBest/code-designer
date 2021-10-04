/*
 * @message: 描述
 * @Author: Roy
 * @Email: @163.com
 * @Github: @163.com
 * @Date: 2021-07-13 10:47:31
 * @LastEditors: Roy
 * @LastEditTime: 2021-07-13 16:49:09
 * @Deprecated: 否
 * @FilePath: /cybertron-designer/src/views/login/index.tsx
 */
import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from './index.less';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import JiQiRen from '../../assets/qijiren.png';

const Login: React.FC = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  let [count, setCount] = useState<number>(0);
  const [form] = Form.useForm();

  useEffect(() => {
    const timer =
      count > 0 &&
      setInterval(() => {
        setCount(count--);
      }, 1000);
    return () => clearInterval(timer);
  }, [count]);

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  const userChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDisabled(e.target.value.length == 11 && count <= 0 ? false : true);
  };
  const sendSMS = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCount(60);
      message.success('短信验证码发送成功');
      setIsLoading(false);
    }, 3000);
  };

  return (
    <div className={styles.login}>
      <Row gutter={24} className={styles.row}>
        <Col span={12} className={styles.aside}>
          <Link to="/" className={styles.logo}>
            <img src={JiQiRen} />
            <h2>码农机器人</h2>
          </Link>
          <h2>一个勤奋的码农建站工具</h2>
        </Col>
        <Col span={12} className={styles.area}>
          <Form
            name="basic"
            form={form}
            className={styles.form}
            onFinish={onFinish}
          >
            <h2>欢迎回来</h2>
            <p>使用手机号码和验证码登录到码农建站</p>
            <Form.Item
              name="username"
              rules={[{ required: true, message: '手机号码不能为空' }]}
            >
              <Input
                onChange={userChange}
                prefix={<UserOutlined className={styles.icon} />}
                placeholder="手机号码"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: '验证码不能为空' }]}
            >
              <Input
                prefix={<LockOutlined className={styles.icon} />}
                placeholder="四位验证码"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                className={styles.button}
                htmlType="submit"
              >
                提交
              </Button>
              <Button
                onClick={sendSMS}
                loading={isLoading}
                disabled={count > 0 ? true : isDisabled}
                className={classNames(styles.button, styles.count)}
              >
                {count > 0 ? `${count}s` : '获取验证码'}
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
