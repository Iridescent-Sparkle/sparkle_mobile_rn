import * as React from 'react';

/**
 * Function component life cycle calling tool.
 */
export function useLifecycle(onLifecycle, callerName, enableLog) {
  var _useLifecycle$caller;
  const cn = callerName ?? (useLifecycle === null || useLifecycle === void 0 ? void 0 : (_useLifecycle$caller = useLifecycle.caller) === null || _useLifecycle$caller === void 0 ? void 0 : _useLifecycle$caller.name);
  React.useEffect(() => {
    if (enableLog === true) {
      console.log(`{
        toolName: '${useLifecycle.name}',
        callerName: '${cn}',
        state: 'load',
      }`);
    }
    onLifecycle === null || onLifecycle === void 0 ? void 0 : onLifecycle('load');
    return () => {
      if (enableLog === true) {
        console.log(`{
          toolName: '${useLifecycle.name}',
          callerName: '${cn}',
          state: 'unload',
        }`);
      }
      onLifecycle === null || onLifecycle === void 0 ? void 0 : onLifecycle('unload');
    };
  }, [cn, enableLog, onLifecycle]);
}
//# sourceMappingURL=useLifecycle.js.map