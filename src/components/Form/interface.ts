import type { ReducerAction } from "./hooks/useForm";

export type EventArgs = any[];

export type StoreValue = any;
export type Store = Record<string, StoreValue>;


export interface FormInstance<Values = any> {
  getFieldValue: (name: NamePath) => StoreValue;
  resetFields: (fields?: NamePath[]) => void;
  submit: () => void;
}

export type InternalNamePath = (string | number)[];
export type NamePath = string | number | InternalNamePath;

export type InternalFormInstance = FormInstance & {
  validateTrigger?: string | string[] | false;

  getInternalHooks: (secret: string) => InternalHooks | null;
}


export interface Callbacks<Values = any> {
  onValuesChange?: (changedValues: any, values: Values) => void;
  onFinish?: (values: Values) => void;
}

export interface InternalHooks {
  dispatch: (action: ReducerAction) => void;
  // initEntityValue: (entity: FieldEntity) => void;
  registerField: (entity: any) => () => void;
  // useSubscribe: (subscribable: boolean) => void;
  setInitialValues: (values: Store, init: boolean) => void;
  setCallbacks: (callbacks: Callbacks) => void;
  // getFields: (namePathList?: InternalNamePath[]) => FieldData[];
  // setValidateMessages: (validateMessages: ValidateMessages) => void;
  // setPreserve: (preserve?: boolean) => void;
  // getInitialValue: (namePath: InternalNamePath) => StoreValue;
}