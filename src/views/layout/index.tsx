import React, { useCallback, useContext } from 'react';
import { Layout, Tabs, Empty } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import HeaderBase from './header';
import EditGroup from './setting-area/edit';
import LayerList from './setting-area/layer';
import PropsTable from '@/components/propsTable';
import { IComponentData } from '@/store/context';
import componentMap from '@/types/componentMap';
import EditWrapper from '@/components/editWrapper';
import initHotKeys from '@/plugins/hotKeys';
import {
  SETACTIVE,
  ADDCOMPONENT,
  UPDATECOMPONENT,
  UPDATEPAGE,
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

  let filterComponents: IComponentData[] =
    components.filter((data: IComponentData) => data.id === currentElement) ||
    [];
  const currentComponentData: IComponentData = filterComponents.length
    ? filterComponents[0]
    : ({} as IComponentData);

  const isLocked = currentComponentData?.isLocked;
  const isHidden = currentComponentData?.isHidden;

  initHotKeys();

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

  const addComponent = useCallback((item: IComponentData) => {
    console.log(item);
    const component: IComponentData = {
      id: uuidv4(),
      props: {
        ...item.props,
      },
      type: item.type,
      name: item.name,
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
    (key: string, value: any) => {
      dispatch({
        type: UPDATEPAGE,
        data: {
          key,
          value,
        },
      });
    },
    [page]
  );

  return (
    <Layout>
      <Header className={styles.header}>
        <div className="logo" />
        <HeaderBase data={state} />
      </Header>
      <Content
        style={{ padding: '0 50px', height: 'calc(100vh - 64px - 70px)' }}
      >
        <Layout
          className="site-layout-background"
          style={{ padding: '24px 0', height: '100%' }}
        >
          <Sider theme="light" width={400} className={styles.componentList}>
            {mockComponentList.map((item: IComponentData) => {
              return (
                <div
                  key={item.id}
                  className={styles.name}
                  onClick={() => addComponent(item)}
                >
                  {item.name}
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
              {/* {activeCurrentElement ? contextmenuList() : null} */}
              <div
                className={styles['canvas-area']}
                style={{ ...page.props }}
                id="canvas-area"
              >
                {components.map((item: IComponentData) => {
                  const Component = componentMap[item.type]
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
          <Sider theme="light" width={400} style={{ overflow: 'auto' }}>
            <Tabs defaultActiveKey="1">
              <TabPane tab="组件属性" key="formProps">
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

export default BaseLayout;
