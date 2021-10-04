// import React, {
//   useEffect,
//   useRef,
//   useState,
//   useContext,
//   useCallback,
// } from 'react';
// import { IComponentData } from '@/store/context';

// import EditWrapper from '@/components/editWrapper';
// import componentMap from '@/types/componentMap';
// import styles from './index.less';
// // import { initUseKeys } from '@/plugins/useKeys';
// // import useKeys from '@/hooks/useKeys'
// import { AppContext, IContextProps } from '@/store/context';
// import { getParentElement } from '@/util';

// interface IProps {
//   setActive: (id: string) => void;
// }

// // TODO
// // 待实现外层 div 拖动、点击选中、右键操作、nodeType 为文本选中出现 tool-bar
// const Index: React.FC<IProps> = (props) => {
//   const { state, dispatch } = useContext<IContextProps>(AppContext);

//   const { components } = state;

//   const menuContainer = useRef(null);
//   let [activeCurrentElement, setActiveCurrentElement] = useState(null);
//   // const updatePosition = (data: any) => {
//   //     const { id, width, height, left, top } = data;
//   //     let newData = [...componentData];
//   //     newData = newData.map((componet) => {
//   //         if (componet.id === id) {
//   //             const newComponet = {
//   //                 ...componet,
//   //                 props: {
//   //                     ...componet.props,
//   //                     width: width + 'px',
//   //                     height: height + 'px',
//   //                     left: left + 'px',
//   //                     top: top + 'px',
//   //                 },
//   //             };
//   //             // alert(2)
//   //             console.log(componet);
//   //             setHistory([
//   //                 ...historyList,
//   //                 {
//   //                     type: 'modify',
//   //                     id: uuidv4(),
//   //                     componentId: componet.id,
//   //                     data: {
//   //                         oldValue: cloneDeep(componet),
//   //                     },
//   //                 },
//   //             ]);
//   //             return newComponet;
//   //         }
//   //         return componet;
//   //     });
//   //     // setComponentData(newData);
//   // };

//   return (
//     <div className={styles.content}>
//       {activeCurrentElement ? contextmenuList() : null}
//       {/* 已经移走 */}
//       {/* <div
//                 className={styles['canvas-area']}
//                 // style={{ background: backgroundColor }}
//                 id="canvas-area"
//             >
//                 {components.map((item: IComponentData) => {
//                     const Component = componentMap[item.type].component as unknown as any;
//                     return !item.isHidden ? (
//                         // <EditWrapper
//                         //     key={item.id}
//                         //     id={item.id}
//                         //     width={item.props.width || '100px'}
//                         //     height={item.props.height || '100px'}
//                         //     setActive={props.setActive}
//                         // // updatePosition={updatePosition}
//                         // >
//                         //     {<Component tag={item.tag} {...item.props} />}
//                         // </EditWrapper>
//                     ): null
//                 })}
//             </div> */}
//     </div>
//   );
// };

// export default Index;
