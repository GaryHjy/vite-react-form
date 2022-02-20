import React, { useEffect, useContext, cloneElement } from "react";

import FormContext from './context/FormContext'

import { defaultGetValueFromEvent } from "./utils/valueUtil";

import type { EventArgs, FormInstance, InternalFormInstance, NamePath, StoreValue } from "./interface";
import { HOOK_MARK } from "./hooks/useForm";

type RenderChildren<Values = any> = (form: FormInstance<Values>) => React.ReactNode;
type ChildrenType<Values = any> = RenderChildren<Values> | React.ReactNode;

interface FormItemProps<Values = any> {
  children?: ChildrenType<Values>;
  /** 指定name值，用于收集value */
  name?: NamePath;
  /** 当前触发收集value的方法 */
  trigger?: string;
  valuePropName?: string;
  /** 自定义获取值 */
  getValueFromEvent?: (...args: EventArgs) => StoreValue;
}

interface ChildProps {
  [name: string]: any;
}


function FormItem<Values = any>(props: FormItemProps<Values>): React.ReactElement  {
  const { 
    children, 
    valuePropName = 'value', 
    trigger = 'onChange', 
    getValueFromEvent,
    name
  } = props

  useEffect(() => {
    console.log(name)
  }, [name])

  const formContext = useContext<InternalFormInstance>(FormContext)
  const { dispatch } = formContext.getInternalHooks(HOOK_MARK)!;
  const isRenderProps = typeof children === 'function';
  
  const getControlled = (childProps: ChildProps = {}) => {

    // 原触发收集value的方法
    const originTriggerFunc = childProps?.[trigger]

    const control = {
      ...childProps,
    }

    // 添加指定获取值的事件
    control[trigger] = (...args: EventArgs) => {

      let newValue: StoreValue;
      if (getValueFromEvent) {
        newValue = getValueFromEvent(...args);
      } else {
        newValue = defaultGetValueFromEvent(valuePropName, ...args);
      }

      console.log(name, newValue)

      dispatch({
        type: 'updateValue',
        namePath: ['123'],
        value: newValue,
      });

      // 触发当前事件
      if (originTriggerFunc) {
        originTriggerFunc(...args)
      }
    }

    return control
  }
  
  // 克隆当前child 进行赋值
  const child = cloneElement(children as React.ReactElement, getControlled((children as React.ReactElement).props))

  return <div>
    { child }
  </div>
}

export default FormItem
