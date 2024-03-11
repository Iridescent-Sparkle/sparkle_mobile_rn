import { useCallback, useRef, useState } from 'react'

function useRefState<T>(
  initialValue?: T,
): [T, (value: ((v: T) => T) | T) => void, () => T] {
  /** 使用useState保存值触发更新 */
  const [, setState] = useState<T | undefined>(initialValue)
  /** 使用useRef保存值以同步获取最新值 */
  const ref = useRef<T | undefined>(initialValue)

  const updateState = useCallback((value: T | ((v: T) => T)): void => {
    if (typeof value === 'function')
      ref.current = (value as any)(ref.current)
    else
      ref.current = value

    setState(ref.current)
  }, [])
  const getRefValue = useCallback(() => ref.current as T, [])

  return [ref.current as T, updateState, getRefValue]
}

export default useRefState
