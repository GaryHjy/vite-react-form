
import * as React from 'react';
import type { 
  Callbacks,
  FormInstance,
  InternalHooks,
  InternalNamePath,
  NamePath,
  Store,
  StoreValue
} from "../interface";

import { setValues } from '../utils/valueUtil'

export const HOOK_MARK = 'INTERNAL_HOOKS';

/** 更新操作action */
interface UpdateAction {
  type: 'updateValue';
  namePath: InternalNamePath;
  value: StoreValue;
}

export type ReducerAction = UpdateAction;

class FormStore {
  private formHooked: boolean = false;

  /** 更新表单组件方法 */
  private forceRootUpdate: () => void;

  /** 数据存储 */
  private store: Store = {};

  /** 初始值 */
  private initialValues: Store = {};


  /** 回调集合 */
  private callbacks = {};
  
  constructor(forceRootUpdate: () => void) {
    this.forceRootUpdate = forceRootUpdate;
  }

  /** 获取表单方法 */
  public getForm = () => ({
    getFieldValue: this.getFieldValue,
    getFieldsValue: this.getFieldsValue,
    // getFieldError: this.getFieldError,
    // getFieldWarning: this.getFieldWarning,
    // getFieldsError: this.getFieldsError,
    // isFieldsTouched: this.isFieldsTouched,
    // isFieldTouched: this.isFieldTouched,
    // isFieldValidating: this.isFieldValidating,
    // isFieldsValidating: this.isFieldsValidating,
    resetFields: this.resetFields,
    setFields: this.setFields,
    setFieldsValue: this.setFieldsValue,
    // validateFields: this.validateFields,
    submit: this.submit,

    getInternalHooks: this.getInternalHooks,
  })

  private getInternalHooks = (key: string): InternalHooks | null => {
    if (key === HOOK_MARK) {
      this.formHooked = true;

      return {
        dispatch: this.dispatch,
        // initEntityValue: this.initEntityValue,
        registerField: this.registerField,
        // useSubscribe: this.useSubscribe,
        setInitialValues: this.setInitialValues,
        setCallbacks: this.setCallbacks,
        // setValidateMessages: this.setValidateMessages,
        // getFields: this.getFields,
        // setPreserve: this.setPreserve,
        // getInitialValue: this.getInitialValue,
      };
    }

    return null;
  };

  private registerField = (entity: any) => {

    // unRegisterField
    return () => {

    }
  }

  /** 设置初始值 */ 
  private setInitialValues = (initialValues: Store, init: boolean) => {
    this.initialValues = initialValues || {};
    if (init) {
      this.store = setValues({}, initialValues, this.store);
    }
  }

  /** 设置回调 */
  private setCallbacks = (callbacks: Callbacks) => {
    this.callbacks = callbacks;
  };

  /** 调度操作 */
  private dispatch = (action: ReducerAction) => {
    switch (action.type) {
      case 'updateValue': {
        const { namePath, value } = action;
        this.updateValue(namePath, value);
        break;
      }
      default:
    }
  };

  /** 更新值 */
  private updateValue = (name: NamePath, value: StoreValue) => {
    // const namePath = getNamePath(name);
    // const prevStore = this.store;
    // this.store = setValue(this.store, namePath, value);

    // this.notifyObservers(prevStore, [namePath], {
    //   type: 'valueUpdate',
    //   source: 'internal',
    // });

    // // Dependencies update
    // const childrenFields = this.triggerDependenciesUpdate(prevStore, namePath);

    // // trigger callback function
    // const { onValuesChange } = this.callbacks;

    // if (onValuesChange) {
    //   const changedValues = cloneByNamePathList(this.store, [namePath]);
    //   onValuesChange(changedValues, this.getFieldsValue());
    // }

    // this.triggerOnFieldsChange([namePath, ...childrenFields]);
  };

  /** 重置操作 */
  private resetFields = () => {

  }

  /** 设置一组字段状态 */
  private setFields = () => {

  }

  /** 设置表单的值 */
  private setFieldsValue = () => {

  }

  /** 获取值 */
  private getFields = () => {
    
  }

  /** 获取一组字段名对应的值 */
  private getFieldsValue = () => {

  }

  /** 获取对应字段名的值 */
  private getFieldValue = () => {
    
  }

  /** 提交操作 */
  private submit = () => {
    
  }
}

function useForm<Values = any>(form?: FormInstance<Values>): [FormInstance<Values>] {
  const formRef = React.useRef<FormInstance>();
  const [, forceUpdate] = React.useState({});

  if (!formRef.current) {
    if (form) {
      formRef.current = form;
    } else {
      // Create a new FormStore if not provided
      const forceReRender = () => {
        forceUpdate({});
      };

      const formStore: FormStore = new FormStore(forceReRender);

      formRef.current = formStore.getForm();
    }
  }

  return [formRef.current];
}

export default useForm;
