import type { Callbacks, Store } from "../interface";

class FormStore {

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
  public getForm = () => {

  }

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

const useForm = () => {

  return []
}

export default useForm
