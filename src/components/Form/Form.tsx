import { useImperativeHandle } from 'react'

import FormContext from './context/FormContext'

import type { ForwardRefRenderFunction } from 'react'
import type { Store } from './interface'


interface FormProps<Values = any> {
  initialValues?: Store;
  onFinish?: (values: Values) => void;
  onFinishFailed?: (errorInfo: any) => void;
}

interface FormInstance {}

const Form: ForwardRefRenderFunction<FormInstance, FormProps> = (
  {
    initialValues,
    onFinish,
    onFinishFailed,
    children
  }, ref) => {
  const formInstance: any = {}

  // useImperativeHandle(ref, () => formInstance, []);

  let childrenNode = children

  const wrapperNode = (
    <FormContext.Provider value={{a: 123}}>
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
