"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useChatListener = useChatListener;
var React = _interopRequireWildcard(require("react"));
var _hook = require("../hook");
var _chat = require("./chat");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * The life cycle of a listener should be as long as the component declaration and should not be added or deleted frequently. Therefore, it is recommended to use `useMemo` or `useRef` to wrap the listener and reduce dependencies.
 * @param listener The IM service object.
 */
function useChatListener(listener) {
  const im = (0, _chat.useChatContext)();
  (0, _hook.useLifecycle)(React.useCallback(state => {
    if (state === 'load') {
      im.addListener(listener);
    } else if (state === 'unload') {
      im.removeListener(listener);
    }
  }, [im, listener]), useChatListener.name);
}
//# sourceMappingURL=chat.hooks.js.map