export type EventArgs = any[];

export type StoreValue = any;
export type Store = Record<string, StoreValue>;


export interface FormInstance<Values = any> {

}

export type InternalFormInstance = FormInstance & {
  validateTrigger?: string | string[] | false;
}


export interface Callbacks<Values = any> {
  onValuesChange?: (changedValues: any, values: Values) => void;
  onFinish?: (values: Values) => void;
}