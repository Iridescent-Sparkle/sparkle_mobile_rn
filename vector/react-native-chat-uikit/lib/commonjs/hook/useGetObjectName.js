"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGetObjectName = useGetObjectName;
var React = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Try to get the name of the component. If it is of other types, it will be parsed accordingly.
 */
function useGetObjectName() {
  const getObjectName = React.useCallback(object => {
    const objectType = typeof object;
    if (objectType === 'bigint' || objectType === 'boolean' || objectType === 'number' || objectType === 'string') {
      return object;
    } else if (objectType === 'function') {
      return object === null || object === void 0 ? void 0 : object.name;
    } else if (objectType === 'object') {
      try {
        const r = JSON.stringify(object);
        return r;
      } catch (error) {
        return object;
      }
    } else if (objectType === 'symbol') {
      const s = object;
      return s.toString();
    } else {
      return object;
    }
  }, []);
  return {
    getObjectName
  };
}
//# sourceMappingURL=useGetObjectName.js.map