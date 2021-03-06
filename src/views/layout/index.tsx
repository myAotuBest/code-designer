import React, { Fragment, memo, useCallback, useContext, useEffect, useRef } from 'react';
import { Layout, Tabs, Empty, Menu, Button } from 'antd';
import { Link, useParams, withRouter, Prompt } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid';
import html2canvas from "html2canvas"
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
import { takeScreenshotAndUpload } from "@/util"
import {
  SETACTIVE,
  ADDCOMPONENT,
  UPDATECOMPONENT,
  UPDATEPAGE,
  FETCHWORk
} from '@/store/contant';
import { AppContext, IContextProps } from '@/store/context';
import mockComponentList from '@/mock/component-list';


import classNames from 'classnames';
import styles from './index.less';

const { Header, Content, Footer, Sider } = Layout;
const { TabPane } = Tabs;

const BaseLayout: React.FC = () => {
  const { state, dispatch } = useContext<IContextProps>(AppContext);
  const { currentElement, components, page } = state;
  const canvasFix = useRef<boolean>(false) // 修复截图时有黑色阴影的bug
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

  const publish = () => {
    // 1、取消选中
    setActive("")
    // 2、取消 box-shadow 为 none
    canvasFix.current = true
    const el = document.getElementById("canvas-area") as HTMLDivElement
    setTimeout(async () => {
      html2canvas(el, { width: 375, useCORS: true, scale: 1 }).then(canvas => {
        const image = document.getElementById("test-image") as HTMLImageElement
        image.src = canvas.toDataURL()
        canvasFix.current = false
      })
      // 3、上传并展示
      // const { data } = await takeScreenshotAndUpload(el)
    }, 0);

  }

  return (
    <Layout className={classNames(styles['editor-container'], "layout")}>
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
          <Menu.Item key="publish"><Button type="primary" onClick={publish}>发布</Button></Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Sider theme="light" width={300} className={styles.componentList}>
          <div className='sidebar-container'>
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
            <img src="" style={{ width: 300 }} id="test-image" />
          </div>
        </Sider>
        <Layout className="site-layout" style={{ padding: '0 24px 24px' }} >
          <Content>
            <div className={classNames({ "canvas-fix": canvasFix.current }, styles['preview-container'])}>
              <p>画布区域</p>
              <div
                className={styles['preview-list']}
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
        </Layout>
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
