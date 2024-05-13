import * as React from 'react';
/**
 * delayed call. If multiple identical calls are made in a short period of time, they will be merged into one call.
 *
 * @example
 *
 * ```tsx
 * const { delayExecTask: _deferSearch } = useDelayExecTask(
 *   1000,
 *   () => {
 *     // ...
 *   }
 * );
 * ```
 */
export function useDelayExecTask(delay, f) {
  const timeoutRef = React.useRef();
  const _delayExecF = React.useCallback(function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => f(...args), delay);
  }, [delay, f]);
  return {
    delayExecTask: _delayExecF
  };
}
//# sourceMappingURL=useDelayExecTask.js.map