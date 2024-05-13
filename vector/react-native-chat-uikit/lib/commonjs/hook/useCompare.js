"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCompare = useCompare;
var React = _interopRequireWildcard(require("react"));
var _useGetObjectName = require("./useGetObjectName");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
function useCompare(object, others) {
  var _useCompare$caller;
  const ref = React.useRef(object);
  const {
    getObjectName
  } = (0, _useGetObjectName.useGetObjectName)();
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