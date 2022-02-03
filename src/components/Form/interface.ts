
export type StoreValue = any;
export type Store = Record<string, StoreValue>;


export interface FormInstance<Values = any> {}


export interface Callbacks<Values = any> {
  onValuesChange?: (changedValues: any, values: Values) => void;
  onFinish?: (values: Values) => void;
}