"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatContext = void 0;
exports.ChatContextProvider = ChatContextProvider;
exports.getChatService = getChatService;
exports.useChatContext = useChatContext;
var _react = _interopRequireDefault(require("react"));
var _chat = require("./chat.impl");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// import { once2 } from '../utils';

/**
 * Context of the IM.
 */
const ChatContext = /*#__PURE__*/_react.default.createContext(undefined);
exports.ChatContext = ChatContext;
ChatContext.displayName = 'UIKitIMContext';

/**
 * Properties of the IM context.
 */

/**
 * The IM context's provider.
 *
 * **Note** IM will be initialized here. If other UIKit is integrated at the same time, the parameters initialized first shall prevail.
 *
 * For example: if `chat uikit sdk` and `chat uikit sdk` are integrated at the same time, then the parameter initialized first will prevail.
 *
 * It can only be initialized once. Even if it is initialized multiple times, parameters modified in time will not take effect again. The reason is that `CHAT SDK` uses the native platform.
 */
function ChatContextProvider(_ref) {
  let {
    value,
    children
  } = _ref;
  const {
    options,
    onInitialized,
    onRequestMultiData
  } = value;
  const _im = (0, _chat.getChatServiceImpl)();
  _react.default.useEffect(() => {
    _im.init({
      options: options,
      result: _ref2 => {
        let {
          isOk,
          error
        } = _ref2;
        if (isOk === false) {
          if (error) _im.sendError({
            error: error
          });
        } else {
          onInitialized === null || onInitialized === void 0 ? void 0 : onInitialized();
          _im.sendFinished({
            event: 'init'
          });
        }
      }
    });
    _im.setOnRequestData(onRequestMultiData);
  }, [_im, onInitialized, onRequestMultiData, options]);
  return /*#__PURE__*/_react.default.createElement(ChatContext.Provider, {
    value: _im
  }, children);
}

/**
 * Get the IM context's value.
 * @returns The IM context's value.
 */
function useChatContext() {
  const im = _react.default.useContext(ChatContext);
  if (!im) throw Error(`${ChatContext.displayName} is not provided`);
  return im;
}

/**
 * Get the built-in single instance IM object.
 * @returns The IM service.
 */
function getChatService() {
  return (0, _chat.getChatServiceImpl)();
}

// const initChat = once2(
//   (im: ChatService, options: ChatOptionsType, onInitialized?: () => void) => {
//     im.init({
//       options: options,
//       result: ({ isOk, error }) => {
//         if (isOk === false) {
//           if (error) im.sendError({ error: error });
//         } else {
//           onInitialized?.();
//           im.sendFinished({ event: 'undefined' });
//         }
//       },
//     });
//   }
// );
//# sourceMappingURL=chat.js.map