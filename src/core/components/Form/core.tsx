import React, { cloneElement, createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import Schema from 'async-validator'
import { Cell, Toast } from '@fruits-chain/react-native-xiaoshu'

const setRulesSy = Symbol('setRules')
const valuesListenSy = Symbol('valuesListen')

/** 创建form实例，可以给class组件使用 */
function createForm(target?: any, ...names: string[]) {
  /** 表单的数据 */
  const values = {}
  /** 表单验证规则 */
  const rules = {}
  const rulesOrder = {}
  /** 表单监听的数组 */
  const listens: any[] = []

  /** 获取表单数据 */
  function getFieldsValue(): Record<string, any> {
    return values
  }

  /** 根据key获取对应的字段值 */
  function getFieldValue(name: string) {
    return values?.[name]
  }

  /** 设置表单数据 */
  function setFieldsValue(newValues: object) {
    Object.assign(values, newValues)
    listens.forEach(item => item())
    // 如果有传入class对象，传入需要监听的name，并且有指定的name有变化，那么就更新传入的class
    if (target && names?.length) {
      // 判断更新的值是不是包含需要监听的name
      const isUpdate = Object.keys(newValues).find(item =>
        names.includes(item),
      )
      if (isUpdate)
        target.forceUpdate()
    }
  }

  /** 触发表单验证 https://www.npmjs.com/package/async-validator */
  function validateFields({ showMsg = true } = {}) {
    // 对rules进行排序
    const entries = Object.entries(rulesOrder).sort(
      ([, aValue]: [string, number], [, bValue]: [string, number]) => {
        if (aValue === 0)
          return 1

        if (bValue === 0)
          return -1

        return aValue - bValue
      },
    )
    const sortedRules = {}
    for (const [key] of entries)
      sortedRules[key] = rules[key]

    return new Schema(sortedRules)
      .validate(values)
      .then(() => {
        return getFieldsValue()
      })
      .catch(({ errors }) => {
        // 默认提示
        if (showMsg)
          Toast.fail(errors[0].message)

        return Promise.reject(errors)
      })
  }

  /** 单独校验某一个字段 */
  function validateField(name: string) {
    return new Schema({ [name]: rules[name] })
      .validate({ [name]: values[name] })
      .then(() => {
        return getFieldsValue()
      })
      .catch(({ errors }) => {
        Toast.fail(errors[0].message)
        return Promise.reject(errors)
      })
  }

  /** 表单值的监听 */
  function valuesListen(fn: any) {
    listens.push(fn)
    return function unValuesListen() {
      listens.splice(listens.indexOf(fn), 1)
    }
  }

  /** 设置表单验证规则 */
  function setRules(fn: (arg0: object, arg1: object) => void) {
    fn(rules, rulesOrder)
  }

  return {
    getFieldValue,
    getFieldsValue,
    setFieldsValue,
    validateFields,
    validateField,
    [valuesListenSy]: valuesListen,
    [setRulesSy]: setRules,
  }
}

type FormStore = ReturnType<typeof createForm>

/** FormContext */
const FormContext = createContext<FormStore>(null)

/** formItem子组件的props */
type FormItemChildrenProps<T = any> = Partial<{
  value: T
  onChange: (v: T) => void
}>

interface FormItemProps {
  children: React.ReactElement<FormItemChildrenProps>
  /** 字段名称 */
  name: string
  /** 表单验证规则 */
  rules?: Array<any>
  ruleIndex?: number
  title?: string
}

/** 响应name变化 */
function useWatch(form: FormStore, name: string) {
  /** 表单初始值 */
  const [value, setValue] = useState(() => form.getFieldsValue()[name])
  /** 缓存value值 */
  const valueRef = useRef(value)
  valueRef.current = value

  useEffect(() => {
    function updateValue() {
      const newValue = form.getFieldsValue()[name]
      // 值如果有变化就更新
      if (valueRef.current !== newValue)
        setValue(newValue)
    }
    // 挂载的时候在取一下值是否更新
    updateValue()
    // 监听表单值变化后重新赋值
    return form[valuesListenSy]?.(updateValue)
  }, [form, name])

  return value
}

function FormItem(props: FormItemProps) {
  const { name, children, rules, ruleIndex = 0, title = '' } = props as any
  /** 获取表单实例 */
  const form = useContext(FormContext)
  /** 表单初始值 */
  const value = useWatch(form, name)

  useEffect(() => {
    // 更新规则
    if (rules) {
      form[setRulesSy]?.(
        (formRules: { [x: string]: any }, rulesOrder: { [x: string]: any }) => {
          rulesOrder[name] = ruleIndex
          formRules[name] = rules
        },
      )
    }
    return () => {
      // 销毁后删除对应规则
      if (rules) {
        form[setRulesSy]?.((formRules: object, rulesOrder: object) => {
          Reflect.deleteProperty(formRules, name)
          Reflect.deleteProperty(rulesOrder, name)
        })
      }
    }
  }, [rules, name, form, ruleIndex])

  useEffect(() => {
    return () => {
      // 组件销毁的时候把值重置为空
      form.setFieldsValue({ [name]: undefined })
    }
  }, [name, form])

  /** 获取子组件本身的onChange事件 */
  const onPropsChange = useRef(children.props?.onChange)
  onPropsChange.current = children.props?.onChange

  const onChange = useCallback(
    (value: any) => {
      form.setFieldsValue({ [name]: value })
      onPropsChange.current?.(value)
    },
    [form, name],
  )

  if (name === undefined)
    return children

  return (
    <Cell
      title={`${title}:`}
      vertical
      divider={false}
      value={cloneElement(children, { value, onChange })}
    />
  )
}

/** 函数组件中使用，获取创建form实例 */
function useForm() {
  /** 创建form实例 */
  const [form] = useState(createForm)
  return form
}

interface FormProps {
  children: React.ReactNode
  form: FormStore
  /** 表单值改变回调函数 */
  onChange?: (value: Record<string, any>) => void
}

interface FormType {
  Item: typeof FormItem
  createForm: typeof createForm
  useForm: typeof useForm
  useWatch: typeof useWatch
}

const Form: React.FC<FormProps> & FormType = (props: FormProps) => {
  const { children, form, onChange } = props

  // 表单值监听
  useEffect(() => {
    const unValuesListen = onChange
      ? form[valuesListenSy]?.(onChange)
      : undefined
    return () => {
      unValuesListen && unValuesListen()
    }
  }, [form, onChange])

  return <FormContext.Provider value={form}>{children}</FormContext.Provider>
}

// 相当于每一项表单，需要套一下控件
Form.Item = FormItem
// 给class组件使用，创建form实例，响应字段变化两个功能
Form.createForm = createForm
// 给函数组件使用，创建form实例
Form.useForm = useForm
// 给函数组件使用，响应字段变化
Form.useWatch = useWatch

export { type FormStore, type FormItemChildrenProps }
export default Form
