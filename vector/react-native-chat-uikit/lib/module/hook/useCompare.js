import * as React from 'react';
import { useGetObjectName } from './useGetObjectName';

/**
 * Compare whether the objects before and after rendering are the same.
 *
 * @example
 *
 * ```tsx
 * const cb = React.useCallback(() => {
 *   // ...
 * }, []);
 * useCompare(cb);
 * ```
 */
export function useCompare(object, others) {
  var _useCompare$caller;
  const ref = React.useRef(object);
  const {
    getObjectName
  } = useGetObjectName();
  if ((others === null || others === void 0 ? void 0 : others.enabled) === false) {
    return;
  }
  const log = `{
    toolName: '${useCompare.name}',
    callerName: '${(others === null || others === void 0 ? void 0 : others.callerName) ?? (useCompare === null || useCompare === void 0 ? void 0 : (_useCompare$caller = useCompare.caller) === null || _useCompare$caller === void 0 ? void 0 : _useCompare$caller.name)}',
    objectName: '${(others === null || others === void 0 ? void 0 : others.objectName) ?? getObjectName(object)}',
    equalResult: '${ref.current === object}',
  }`;
  if (ref.current !== object) {
    console.warn(log);
  } else {
    console.log(log);
  }
}
//# sourceMappingURL=useCompare.js.map