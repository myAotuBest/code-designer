import mockComponentList from '@/mock/component-list';

// 获取左侧组件信息
export const getComponentList = async (): Promise<typeof mockComponentList> => {
  return new Promise((resolve) =>
    setTimeout(() => resolve(mockComponentList), 500)
  );
};
