import { IEditorProps } from '@/store/context';
export const prefix = 'coderX';

export function saveComponentState(componentData: IEditorProps) {
  window.localStorage.setItem(
    `${prefix}-componentState`,
    JSON.stringify(componentData)
  );
}

export function getComponentState(): IEditorProps {
  const data = window.localStorage.getItem(`${prefix}-componentState`);
  const componentData: IEditorProps = JSON.parse(data) || [];
  return componentData;
}
