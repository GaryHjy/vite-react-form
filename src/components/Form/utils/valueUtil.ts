import type { EventArgs, StoreValue } from "../interface";


/**
 * @description 判断是否为对象
 * @param obj 
 * @returns boolean
 */
export function isObject(obj: StoreValue) {
  return typeof obj === 'object' && obj !== null && Object.getPrototypeOf(obj) === Object.prototype;
}

/**
 * @description 获取默认的组件值
 * @param valuePropName 获取value指定的key值
 * @param args 事件源对象
 * @returns value
 */
export function defaultGetValueFromEvent(valuePropName: string, ...args: EventArgs) {
  const event = args[0];
  if (event && event.target && typeof event.target === 'object' && valuePropName in event.target) {
    return event.target[valuePropName];
  }
  return event;
}


