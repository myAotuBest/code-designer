import StyleSchema from '@/interface/schema/style.schema';
import DynamicObject from '@/interface/dynamic-object';
import containerFormConfig from '@/config/forms/container';
import imgFormConfig from '@/config/forms/img';
import listFormConfig from '@/config/forms/list';
import textFormConfig from '@/config/forms/text';
import FormConfig from '@/interface/front-end/form-config';
import pageFormConfig from '@/config/forms/page';

export function convertSchemaToStyle(
  styleSchema: StyleSchema[]
): DynamicObject {
  return Object.values(styleSchema).reduce(
    (accumulator: DynamicObject, curVal) => {
      const key = hyphensToCamel(curVal.name);
      accumulator[key] = `${curVal.value}${curVal.unit}`;
      return accumulator;
    },
    {}
  );
}

export function getFormConfig(widgetType: string): FormConfig[] {
  const dict: DynamicObject = {
    page: pageFormConfig,
    'container-widget': containerFormConfig,
    'image-widget': imgFormConfig,
    'list-widget': listFormConfig,
    'text-widget': textFormConfig,
  };
  return dict[widgetType];
}

/*
 * 连字符属性转为驼峰
 */
export function hyphensToCamel(name: string): string {
  return name.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

/*
 * 驼峰转为连字符
 */
export function camelToHyphens(name: string): string {
  return name.replace(/([A-Z])/g, (g) => `-${g.toLowerCase()}`);
}

/**
 * 首字母转大写
 * @param str
 * @returns
 */
export function firstToUpper(str) {
  return str.replace(/\b(\w)(\w*)/g, function ($0, $1, $2) {
    return $1.toUpperCase() + $2.toLowerCase();
  });
}
/**
 * 数组插入
 * @param arr
 * @param index
 * @param newItem
 * @returns
 */
export const insertAt = (arr: any[], index: number, newItem: any) => {
  return [...arr.slice(0, index), newItem, ...arr.slice(index)];
};
/**
 *
 * @param element
 * @param className
 * @returns
 */
export const getParentElement = (element: HTMLElement, className: string) => {
  while (element) {
    if (element.classList && element.classList.contains(className)) {
      return element;
    } else {
      element = element.parentNode as HTMLElement;
    }
  }
  return null;
};
