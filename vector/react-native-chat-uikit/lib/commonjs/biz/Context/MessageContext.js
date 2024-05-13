"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageContext = void 0;
exports.MessageContextProvider = MessageContextProvider;
exports.useMessageContext = useMessageContext;
var React = _interopRequireWildcard(require("react"));
var _utils = require("../../utils");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Context of the Message.
 */
const MessageContext = /*#__PURE__*/React.createContext(undefined);
exports.MessageContext = MessageContext;
MessageContext.displayName = 'UIKitMessageContext';

/**
 * Properties of the Message context.
 */

/**
 * The Message context's provider.
 */
function MessageContextProvider(_ref) {
  let {
    value,
    children
  } = _ref;
  const {} = value;
  const _value = React.useMemo(() => {
    const _list = new Map();
    const _listeners = new Set();
    return {
      addListener: onUpdateUserInfo => {
        _listeners.add(onUpdateUserInfo);
        const deleter = () => {
          _listeners.delete(onUpdateUserInfo);
        };
        return deleter;
      },
      getUserInfo: userId => {
        return _list.get(userId);
      },
      dispatchUserInfo: params => {
        _list.set(params.userId, {
          userName: params.userName,
          userAvatar: params.userAvatar
        });
        (0, _utils.timeoutTask)(0, () => {
          _listeners.forEach(listener => {
            listener(params);
          });
        });
      }
    };
  }, []);
  return /*#__PURE__*/React.createElement(MessageContext.Provider, {
    value: _value
  }, children);
}

/**
 * Get the Message context's value.
 * @returns The Message context's value.
 */
function useMessageContext() {
  const msg = React.useContext(MessageContext);
  if (!msg) throw Error(`${MessageContext.displayName} is not provided`);
  return msg;
}
//# sourceMappingURL=MessageContext.js.map