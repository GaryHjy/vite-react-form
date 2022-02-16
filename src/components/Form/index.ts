import * as React from 'react'

import { FormInstance } from './interface';
import IForm, { FormProps } from './Form'
import Item from './FormItem'

type InternalFormType = typeof InternalForm;

interface FormInterface extends InternalFormType {
  Item: typeof Item
}

const InternalForm = React.forwardRef<FormInstance, FormProps>(IForm) as <Values = any>(
  props: React.PropsWithChildren<FormProps<Values>> & { ref?: React.Ref<FormInstance<Values>> },
) => React.ReactElement;

const Form = InternalForm as FormInterface

Form.Item = Item

export default Form