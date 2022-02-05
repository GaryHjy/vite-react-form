
import type { FC } from 'react'

export interface FormItemLabelProps {
  colon?: boolean;
  htmlFor?: string;
  label?: React.ReactNode;
}


const FormItemLabel: FC<FormItemLabelProps> = (
  {
    htmlFor,
    label,
    children
  }
) => {

  return (
    <label
      htmlFor={htmlFor}
      // className={labelClassName}
      title={typeof label === 'string' ? label : ''}
    >
      {children}
    </label>
  )
}

export default FormItemLabel
