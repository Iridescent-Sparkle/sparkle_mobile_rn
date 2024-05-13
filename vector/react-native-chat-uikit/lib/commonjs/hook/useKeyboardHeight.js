"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useKeyboardHeight = useKeyboardHeight;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Get the keyboard height. Need to be obtained dynamically.
 */
function useKeyboardHeight() {
  const [keyboardHeight, setKeyboardHeight] = React.useState(0);
  const [keyboardCurrentHeight, setKeyboardCurrentHeight] = React.useState(0);
  React.useEffect(() => {
    const showSubscriptionI = _reactNative.Keyboard.addListener('keyboardWillShow', e => {
      if (_reactNative.Platform.OS === 'ios') {
        setKeyboardHeight(e.endCoordinates.height);
      }
    });
    const hideSubscriptionI = _reactNative.Keyboard.addListener('keyboardWillHide', () => {
      if (_reactNative.Platform.OS === 'ios') {}
    });
    const showSubscription = _reactNative.Keyboard.addListener('keyboardDidShow', e => {
      if (_reactNative.Platform.OS === 'android') {
        setKeyboardHeight(e.endCoordinates.height);
      }
      setKeyboardCurrentHeight(e.endCoordinates.height);
    });
    const hideSubscription = _reactNative.Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardCurrentHeight(0);
    });
    return () => {
      showSubscriptionI.remove();
      hideSubscriptionI.remove();
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  return {
    keyboardHeight,
    keyboardCurrentHeight
  };
}
//# sourceMappingURL=useKeyboardHeight.js.map