import * as React from 'react';
import type { Callbacks, FormInstance, InternalHooks, Store } from "../interface";

export const HOOK_MARK = 'INTERNAL_HOOKS';

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
        // dispatch: this.dispatch,
        // initEntityValue: this.initEntityValue,
        // registerField: this.registerField,
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

  /** 设置初始值 */ 
  private setInitialValues = (initialValues: Store, init: boolean) => {
    
  }

  /** 设置回调 */
  private setCallbacks = (callbacks: Callbacks) => {
    this.callbacks = callbacks;
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
