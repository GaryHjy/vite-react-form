import React, { Component, useContext, cloneElement } from "react";

import FormContext from './context/FormContext'

import { defaultGetValueFromEvent } from "./utils/valueUtil";

import type { EventArgs, FormInstance, InternalFormInstance, StoreValue } from "./interface";

type RenderChildren<Values = any> = (form: FormInstance<Values>) => React.ReactNode;
type ChildrenType<Values = any> = RenderChildren<Values> | React.ReactNode;

interface FormItemProps<Values = any> {
  children?: ChildrenType<Values>;
  /** 当前触发方法 */
  trigger?: string;
  validateTrigger?: string | string[] | false;
  valuePropName?: string;
  getValueFromEvent?: (...args: EventArgs) => StoreValue;
}


// class FormItem extends Component {
//   render() {
//     console.log(this)
//     return (<div>
//       { this.props.children }
//     </div>)
//   }
// }

interface ChildProps {
  [name: string]: any;
}


function FormItem<Values = any>(props: FormItemProps<Values>): React.ReactElement  {
  const { 
    children, 
    valuePropName = 'value', 
    trigger = 'onChange', 
    validateTrigger
  } = props

  const formContext = useContext<InternalFormInstance>(FormContext)
  const isRenderProps = typeof children === 'function';
  
  const getControlled = (childProps: ChildProps = {}) => {
    const mergedValidateTrigger =
      validateTrigger !== undefined ? validateTrigger : formContext.validateTrigger;

    // 原触发方法
    const originTriggerFunc = childProps?.[trigger]

    const control = {
      ...childProps,
    }

    // 添加指定获取值的事件
    control[trigger] = (...args: EventArgs) => {

      const value = defaultGetValueFromEvent(valuePropName, ...args);

      console.log(value);
      // dispatch操作更新value值

      if (originTriggerFunc) {
        originTriggerFunc(...args)
      }
    }

    return control
  }
  
  const child = cloneElement(children as React.ReactElement, getControlled((children as React.ReactElement).props))

  console.log(props)

  return <div>
    { child }
  </div>
}

export default FormItem
