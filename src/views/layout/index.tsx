import React, { Fragment, memo, useCallback, useContext, useEffect } from 'react';
import { Layout, Tabs, Empty, Menu, Button } from 'antd';
import { Link, useParams, withRouter, Prompt } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid';
import EditGroup from './setting-area/edit';
import LnlineEdit from "@/components/lnlineEdit"
import LayerList from './setting-area/layer';
import PropsTable from '@/components/propsTable';
import { ComponentData } from '@/store/context';
import componentMap from '@/types/componentMap';
import EditWrapper from '@/components/editWrapper';
import LText from "@/components/widgets/LText"
import { initHotKeys, initContextMenu } from '@/plugins';
import { TextComponentProps } from "@/types/defaultProps"
import { fetchWork, fetchSaveWork } from "@/api"
import {
  SETACTIVE,
  ADDCOMPONENT,
  UPDATECOMPONENT,
  UPDATEPAGE,
  FETCHWORk
} from '@/store/contant';
import { AppContext, IContextProps } from '@/store/context';
import mockComponentList from '@/mock/component-list';

import styles from './index.less';

import './index.less';

const { Header, Content, Footer, Sider } = Layout;
const { TabPane } = Tabs;

const BaseLayout: React.FC = () => {
  const { state, dispatch } = useContext<IContextProps>(AppContext);
  const { currentElement, components, page } = state;

  let filterComponents: ComponentData[] =
    components.filter((data: ComponentData) => data.id === currentElement) ||
    [];
  const currentComponentData: ComponentData = filterComponents.length
    ? filterComponents[0]
    : ({} as ComponentData);

  const isLocked = currentComponentData?.isLocked;
  const isHidden = currentComponentData?.isHidden;

  initHotKeys();
  initContextMenu();


  useEffect(() => {
    // const { id } = useParams()
    fetchWork().then((res) => {
      dispatch({
        type: FETCHWORk,
        data: {
          value: res.data
        }
      })
    })
  }, [])

  // 设置当前选中元素
  const setActive = useCallback(
    (id: string) => {
      dispatch({
        type: SETACTIVE,
        data: {
          value: id,
        },
      });
    },
    [currentElement, components]
  );

  const addComponent = useCallback((props: TextComponentProps) => {
    const component: ComponentData = {
      id: uuidv4(),
      props: {
        ...props,
      },
      name: 'l-text',
    };
    dispatch({
      type: ADDCOMPONENT,
      data: {
        value: component,
      },
    });
  }, []);

  // 修改统一操作
  const updateComponent = useCallback(
    (key: string, value: any, isRoot = false) => {
      dispatch({
        type: UPDATECOMPONENT,
        data: {
          key,
          value,
          isRoot,
        },
      });
    },
    [currentComponentData, currentElement]
  );

  const updatePosition = useCallback(
    (data: { left: number; top: number; width: number; height: number }) => {
      data.left && updateComponent('left', data.left);
      data.top && updateComponent('top', data.top);
      data.width && updateComponent('width', data.width);
      data.height && updateComponent('height', data.height);
    },
    []
  );

  const updatePage = useCallback(
    (key: string, value: any, isRoot = false) => {
      dispatch({
        type: UPDATEPAGE,
        data: {
          key,
          value,
          isRoot
        },
      });
    },
    [page]
  );

  const saveWork = useCallback(() => {
    const { title, props } = page
    const payload = {
      title,
      content: {
        components: components,
        props
      }
    }
    fetchSaveWork(payload)
  }, [page])

  return (
    <Layout className="layout">
      <Header className={styles.header}>
        <div className={styles["page-title"]}>
          <Link to="/">
            <img className={styles["logo-img"]} src={require('../../assets/qijiren.png')} />
          </Link>
          <LnlineEdit value={page.title} onChange={(title) => updatePage("title", title, true)} />
        </div>
        <Menu mode="horizontal" theme="dark">
          <Menu.Item key="preview"><Button type="primary">预览和设置</Button></Menu.Item>
          <Menu.Item key="saveWork"><Button type="primary" onClick={saveWork}>保存</Button></Menu.Item>
          <Menu.Item key="publish"><Button type="primary">发布</Button></Menu.Item>
        </Menu>
      </Header>
      <Content
        style={{ padding: '0 50px', height: 'calc(100vh - 64px - 70px)' }}
      >
        <Layout
          className="site-layout-background"
          style={{ padding: '24px 0', height: '100%' }}
        >
          <Sider theme="light" width={300} className={styles.componentList}>
            {mockComponentList.map((item: TextComponentProps, index) => {
              return (
                <div
                  key={index}
                  className={styles['component-item']}
                  onClick={() => addComponent(item)}
                >
                  <LText {...item} />
                </div>
              );
            })}
          </Sider>
          <Content
            style={{
              display: 'flex',
              justifyContent: 'center',
              minHeight: 280,
            }}
          >
            <div className={styles.content}>
              <div
                className={styles['canvas-area']}
                style={{ ...page.props }}
                id="canvas-area"
              >
                {components.map((item: ComponentData) => {
                  const Component = componentMap[item.name]
                    .component as unknown as any;
                  return !item.isHidden ? (
                    <EditWrapper
                      key={item.id}
                      id={item.id}
                      active={item.id === currentElement}
                      props={item.props}
                      setActive={setActive}
                      updatePosition={updatePosition}
                    >
                      {<Component tag={item.tag} {...item.props} />}
                    </EditWrapper>
                  ) : null;
                })}
              </div>
            </div>
          </Content>
          <Sider theme="light" width={300} style={{ overflow: 'auto' }} className="pane-setting">
            <Tabs defaultActiveKey="1">
              <TabPane tab="组件属性" key="formProps">
                {currentElement && <Fragment>
                  {!isLocked ? (
                    <EditGroup
                      currentElement={currentElement}
                      updateComponent={updateComponent}
                      props={currentComponentData?.props}
                    />
                  ) : (
                    <Empty
                      description={
                        isHidden ? '已隐藏，暂无法编辑' : '已锁定，暂无法编辑'
                      }
                    />
                  )}
                </Fragment>}
              </TabPane>
              <TabPane tab="图层设置" key="layer">
                <LayerList
                  setActive={setActive}
                  updateComponent={updateComponent}
                />
              </TabPane>
              <TabPane tab="页面设置" key="pageSetting">
                <PropsTable onChange={updatePage} props={page.props} />
              </TabPane>
              <TabPane tab="数据源" key="dataSource">
                Content of Tab Pane 2
              </TabPane>
            </Tabs>
          </Sider>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};

const RouterLeave = () => {
  // useEffect(() => {
  //   const listener = ev => {
  //     ev.preventDefault();
  //     ev.returnValue = '文章要保存吼，确定离开吗？';
  //   };
  //   window.addEventListener('beforeunload', listener);
  //   return () => {
  //     window.removeEventListener('beforeunload', listener)
  //   }
  // }, []);
  return (<Fragment>
    <BaseLayout />
    <Prompt when={true} message="信息未保存、确定离开吗?"></Prompt>
  </Fragment>)
}

export default RouterLeave;
