// import React from 'react';
// import { Tabs } from 'antd';
// import mockComponentList from '@/mock/component-list';
// import { IComponentList, ITemplateProps } from '@/types/templateProps';
// import { AppstoreAddOutlined } from '@ant-design/icons';

// import style from './index.less';

// export interface ComponentPanelState {
//   componentCollection: Array<IComponentList>;
// }

// export default class ComponentPanel extends React.Component<any, ComponentPanelState> {
//   constructor(props: any) {
//     super(props);
//     this.state = {
//       componentCollection: mockComponentList
//     };
//   }

//   // 渲染单个托盘里边的组件图标列表
//   renderComponentIconList(list: ITemplateProps[]) {
//     return list.map((item, index) => {
//       return (
//         <div key={index} className={style.componentInfo}>
//           <AppstoreAddOutlined className={style.icon}/>
//           <span className={style.componentName}>{item.name}</span>
//         </div>
//       );
//     });
//   }

//   render() {
//     const { TabPane } = Tabs;
//     const { componentCollection } = this.state;
//     const tabPanes = componentCollection.map((item, index) => {
//       const tpl = this.renderComponentIconList(item.list);
//       return (
//         <TabPane tab={item.typeName} key={item.type}>
//           <div className={style.componentList}>
//             {tpl}
//           </div>
//         </TabPane>
//       );
//     });

//     return (
//       <Tabs>
//         {tabPanes}
//       </Tabs>
//     );
//   }

// }
