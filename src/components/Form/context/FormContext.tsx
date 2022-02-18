import { createContext } from "react";
import type { InternalFormInstance } from "../interface";

const warningFunc: any = () => {};

const FormContext = createContext<InternalFormInstance>({
  getFieldValue: warningFunc,
  resetFields: warningFunc,
  submit: warningFunc,

  getInternalHooks: () => {

    return {
      dispatch: warningFunc,
      registerField: warningFunc,
      setInitialValues: warningFunc,
      setCallbacks: warningFunc
    }
  }
})

export default FormContext
