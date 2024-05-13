"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDelayExecTask = useDelayExecTask;
var React = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
function useDelayExecTask(delay, f) {
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