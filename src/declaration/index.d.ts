declare module '*.less';
declare module '*.css';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
// warning 需要声明全局变量
declare const module: {
  hot: {
    accept: Function;
    addStatusHandler: Function;
  };
};