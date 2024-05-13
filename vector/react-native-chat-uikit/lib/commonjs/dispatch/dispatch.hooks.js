"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDispatchListener = useDispatchListener;
var React = _interopRequireWildcard(require("react"));
var _hook = require("../hook");
var _dispatch = require("./dispatch");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Use dispatch listener.
 */
function useDispatchListener(key, cb) {
  const {
    addListener,
    removeListener
  } = (0, _dispatch.useDispatchContext)();
  (0, _hook.useLifecycle)(React.useCallback(state => {
    if (state === 'load') {
      addListener(key, cb);
    } else if (state === 'unload') {
      removeListener(key, cb);
    }
  }, [addListener, cb, key, removeListener]), useDispatchListener.name, false);
}
//# sourceMappingURL=dispatch.hooks.js.map