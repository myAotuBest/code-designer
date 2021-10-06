import html2canvas from "html2canvas"
import axios from 'axios';
import { RespUploadData } from "@/types/respType"

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

export async function uploadFile<R = any>(file: Blob, url = "/utils/upload-img", fileName = 'screenshot.png') {
  const newFile = file instanceof File ? file : new File([file], fileName);
  const formData = new FormData();
  formData.append(newFile.name, newFile)
  const { data } = await axios.post<R>(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return data
}

function getCanvasBlob(canvas: HTMLCanvasElement) {
  return new Promise<Blob | null>(resolve => {
    canvas.toBlob(blob => {
      resolve(blob)
    })
  })
}
export async function takeScreenshotAndUpload(ele: HTMLElement) {
  // get screenshot canvas
  const canvas = await html2canvas(ele, { width: 375, useCORS: true, scale: 1 })
  // transform canvas to blob
  const canvasBlob = await getCanvasBlob(canvas)
  if (canvasBlob) {
    // upload blob to server
    const data = await uploadFile<RespUploadData>(canvasBlob)
    return data
  }
}
