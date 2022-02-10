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

export interface InternalHooks {
  // dispatch: (action: ReducerAction) => void;
  // initEntityValue: (entity: FieldEntity) => void;
  // registerField: (entity: FieldEntity) => () => void;
  // useSubscribe: (subscribable: boolean) => void;
  setInitialValues: (values: Store, init: boolean) => void;
  setCallbacks: (callbacks: Callbacks) => void;
  // getFields: (namePathList?: InternalNamePath[]) => FieldData[];
  // setValidateMessages: (validateMessages: ValidateMessages) => void;
  // setPreserve: (preserve?: boolean) => void;
  // getInitialValue: (namePath: InternalNamePath) => StoreValue;
}