import { useMemo, useImperativeHandle } from 'react'

import FormContext from './context/FormContext'

import type { ForwardRefRenderFunction } from 'react'
import type { Store } from './interface'


interface FormProps<Values = any> {
  /** 当前表单name */
  name?: string;
  /** 初始值 */
  initialValues?: Store;
  /** 触发校验的事件集合 */
  validateTrigger?: string | string[] | false;
  onFinish?: (values: Values) => void;
  onFinishFailed?: (errorInfo: any) => void;
}

interface FormInstance {}

const Form: ForwardRefRenderFunction<FormInstance, FormProps> = (
  {
    initialValues,
    onFinish,
    onFinishFailed,
    validateTrigger = 'onChange',
    children
  }, ref) => {
  const formInstance: any = {}

  // useImperativeHandle(ref, () => formInstance, []);

  let childrenNode = children

  /** 表单 */
  const formContextValue = useMemo(() => ({
    validateTrigger,
    
  }), [validateTrigger])

  const wrapperNode = (
    <FormContext.Provider value={formContextValue}>
      { childrenNode }
    </FormContext.Provider>
  )

  return (
    <form
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();

        formInstance.submit();
      }}
      onReset={(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        formInstance.resetFields();
        // restProps.onReset?.(event);
      }}
    >
      { wrapperNode }
    </form>
  )
}

export default Form
