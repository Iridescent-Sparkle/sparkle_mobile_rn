"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConversationDetail = ConversationDetail;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _Context = require("../Context");
var _ConversationDetail = require("./ConversationDetail.hooks");
var _ConversationDetail2 = require("./ConversationDetail.navi");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
/**
 * Conversation Detail Component.
 *
 * This component displays the chat content of individual chats and group chats. This component mainly includes a message bubble list component and a message sending component, as well as a bottom menu component and a warning component.
 */
function ConversationDetail(props) {
  const {
    containerStyle,
    onBack,
    convId,
    enableNavigationBar = true,
    NavigationBar: propsNavigationBar
  } = props;
  const {
    onClickedSend,
    _messageInputRef,
    _MessageInput,
    messageInputProps,
    _messageListRef,
    _MessageList,
    messageListProps,
    onQuoteMessageForInput,
    onEditMessageForInput,
    onEditMessageFinished,
    convName,
    convAvatar,
    onClickedAvatar,
    doNotDisturb
  } = (0, _ConversationDetail.useConversationDetail)(props);
  const getContent = () => /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [{
      flexGrow: 1
    }, containerStyle]
  }, enableNavigationBar === true ? /*#__PURE__*/React.createElement(_ConversationDetail2.ConversationDetailNavigationBar, {
    convId: convId,
    convName: convName,
    convAvatar: convAvatar,
    onBack: onBack,
    onClickedAvatar: onClickedAvatar,
    NavigationBar: propsNavigationBar,
    doNotDisturb: doNotDisturb
  }) : null, /*#__PURE__*/React.createElement(_MessageList, _extends({
    onClicked: () => {
      var _messageInputRef$curr, _messageInputRef$curr2;
      _messageInputRef === null || _messageInputRef === void 0 ? void 0 : (_messageInputRef$curr = _messageInputRef.current) === null || _messageInputRef$curr === void 0 ? void 0 : (_messageInputRef$curr2 = _messageInputRef$curr.close) === null || _messageInputRef$curr2 === void 0 ? void 0 : _messageInputRef$curr2.call(_messageInputRef$curr);
    },
    onQuoteMessageForInput: onQuoteMessageForInput,
    onEditMessageForInput: onEditMessageForInput,
    ref: _messageListRef
  }, messageListProps)), /*#__PURE__*/React.createElement(_MessageInput, _extends({
    ref: _messageInputRef,
    onClickedSend: onClickedSend,
    onEditMessageFinished: onEditMessageFinished,
    onHeightChange: height => {
      var _messageListRef$curre, _messageListRef$curre2;
      _messageListRef === null || _messageListRef === void 0 ? void 0 : (_messageListRef$curre = _messageListRef.current) === null || _messageListRef$curre === void 0 ? void 0 : (_messageListRef$curre2 = _messageListRef$curre.onInputHeightChange) === null || _messageListRef$curre2 === void 0 ? void 0 : _messageListRef$curre2.call(_messageListRef$curre, height);
    }
  }, messageInputProps)));
  return /*#__PURE__*/React.createElement(_Context.MessageContextProvider, {
    value: {}
  }, getContent());
}
//# sourceMappingURL=ConversationDetail.js.map