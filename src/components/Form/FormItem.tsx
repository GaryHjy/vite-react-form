import type { FormInstance } from "./interface";

type RenderChildren<Values = any> = (form: FormInstance<Values>) => React.ReactNode;
type ChildrenType<Values = any> = RenderChildren<Values> | React.ReactNode;

interface FormItemProps<Values = any> {
  children?: ChildrenType<Values>;
}


const FormItem = (props: FormItemProps) => {
  return <div>123</div>
}

export default FormItem
