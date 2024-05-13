"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLifecycle = useLifecycle;
var React = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Function component life cycle calling tool.
 */
function useLifecycle(onLifecycle, callerName, enableLog) {
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