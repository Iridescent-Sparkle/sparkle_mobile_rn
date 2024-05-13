"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useMessageReportApi = useMessageReportApi;
exports.useScrollGesture = useScrollGesture;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function useMessageReportApi(itemData) {
  const dataRef = React.useRef(itemData.map(v => {
    return {
      data: v
    };
  }));
  const [data, setData] = React.useState(dataRef.current);
  const _onUpdate = clickedItem => {
    let isNeedUpdate = false;
    for (const data of dataRef.current) {
      if (data.data.id === clickedItem.data.id) {
        if (clickedItem.data.checked === false) {
          data.data.checked = true;
          isNeedUpdate = true;
        }
      } else {
        data.data.checked = false;
      }
    }
    if (isNeedUpdate === true) {
      setData([...dataRef.current]);
    }
  };
  return {
    data: data,
    onUpdate: _onUpdate
  };
}
function useScrollGesture(
/**
 * Callback function when the gesture is used.
 * When used together with `Modal` or `SimuModal`, the pull-down gesture conflicts with the scrolling gift list gesture and cannot be resolved using bubbling events. Resolved by manually controlling usage rights.
 */
requestUseScrollGesture) {
  const isScrollingRef = React.useRef(false);
  const r = React.useRef(_reactNative.PanResponder.create({
    onStartShouldSetPanResponder: () => {
      if (isScrollingRef.current === false) {
        isScrollingRef.current = true;
        requestUseScrollGesture === null || requestUseScrollGesture === void 0 ? void 0 : requestUseScrollGesture(false);
      }
      if (isScrollingRef.current === true) {
        return false;
      }
      return true;
    },
    onMoveShouldSetPanResponder: () => {
      if (isScrollingRef.current === false) {
        isScrollingRef.current = true;
        requestUseScrollGesture === null || requestUseScrollGesture === void 0 ? void 0 : requestUseScrollGesture(false);
      }
      if (isScrollingRef.current === true) {
        return false;
      }
      return true;
    }
  })).current;
  return {
    isScrollingRef: isScrollingRef,
    handles: r.panHandlers
  };
}
//# sourceMappingURL=MessageReport.hooks.js.map