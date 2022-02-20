import { useMemo, useImperativeHandle, useRef } from 'react'

import FormContext from './context/FormContext'
import useForm, { HOOK_MARK } from './hooks/useForm'

import type { ForwardRefRenderFunction } from 'react'
import type { Store, FormInstance, InternalFormInstance, Callbacks } from './interface'


type BaseFormProps = Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'>;
type RenderProps = (values: Store, form: FormInstance) => JSX.Element | React.ReactNode;

export interface FormProps<Values = any> extends BaseFormProps {
  /** 当前表单name */
  name?: string;
  /** form */
  form?: FormInstance<Values>;
  /** 初始值 */
  initialValues?: Store;
  onValuesChange?: Callbacks<Values>['onValuesChange'];
  children?: RenderProps | React.ReactNode;
  onFinish?: (values: Values) => void;
  onFinishFailed?: (errorInfo: any) => void;
}

const Form: ForwardRefRenderFunction<FormInstance, FormProps> = (
  {
    initialValues = {},
    onFinish,
    onFinishFailed,
    form,
    children,
    onValuesChange,
    ...restProps
  }: FormProps, ref) => {

  const [formInstance] = useForm(form);
  const { setInitialValues, setCallbacks } = (formInstance as InternalFormInstance).getInternalHooks(HOOK_MARK)!

  useImperativeHandle(ref, () => formInstance, []);

  setCallbacks({
    onValuesChange,
    onFinish: (values: Store) => {
      if (onFinish) {
        onFinish(values);
      }
    },
  })

  // 第一次渲染初始化数据
  const mountRef = useRef<boolean | null>(null);
  setInitialValues(initialValues, !mountRef.current);
  if (!mountRef.current) {
    mountRef.current = true;
  }

  let childrenNode = children

  /** 表单 */
  const formContextValue = useMemo(() => ({
    ...(formInstance as InternalFormInstance),
  }), [formInstance])

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
        restProps.onReset?.(event);
      }}
    >
      { wrapperNode }
    </form>
  )
}

export default Form
