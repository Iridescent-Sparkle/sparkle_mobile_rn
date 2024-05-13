"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FileMessagePreview = FileMessagePreview;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeChatSdk = require("react-native-chat-sdk");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _chat = require("../../chat");
var _error = require("../../error");
var _hook = require("../../hook");
var _services = require("../../services");
var _theme = require("../../theme");
var _Image = require("../../ui/Image");
var _Text = require("../../ui/Text");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * File Message Preview Component properties.
 */

/**
 * File Message Preview Component.
 */
function FileMessagePreview(props) {
  const {
    containerStyle,
    children,
    msgId: propsMsgId,
    localMsgId: propsLocalMsgId,
    onBack
  } = props;
  const im = (0, _chat.useChatContext)();
  const {
    top
  } = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  const {
    colors
  } = (0, _theme.usePaletteContext)();
  const {
    getColor
  } = (0, _hook.useColors)({
    icon: {
      light: colors.neutral[3],
      dark: colors.neutral[95]
    }
  });
  const [progress, setProgress] = React.useState(0);
  const onGetMessage = React.useCallback(msgId => {
    im.getMessage({
      messageId: msgId
    }).then(async result => {
      if (result) {
        if (result.body.type !== _reactNativeChatSdk.ChatMessageType.FILE) {
          throw new _error.UIKitError({
            code: _error.ErrorCode.chat_uikit,
            desc: 'Message type is not ChatMessageType.FILE'
          });
        }
        const body = result.body;
        const isExisted = await _services.Services.dcs.isExistedFile(body.localPath);
        if (isExisted !== true) {
          setProgress(0);
          im.messageManager.downloadAttachment(result);
        } else {
          setProgress(100);
        }
      }
    }).catch();
  }, [im]);
  React.useEffect(() => {
    onGetMessage(propsMsgId);
  }, [onGetMessage, propsMsgId]);
  React.useEffect(() => {
    const listener = {
      onSendMessageChanged: msg => {
        // upload progress
        if (msg.localMsgId === propsLocalMsgId && msg.body.type === _reactNativeChatSdk.ChatMessageType.FILE) {
          const body = msg.body;
          if (body.fileStatus === _reactNativeChatSdk.ChatDownloadStatus.SUCCESS) {
            setProgress(100);
          }
        }
      },
      onSendMessageProgressChanged: msg => {
        // upload progress
        if (msg.localMsgId === propsLocalMsgId && msg.body.type === _reactNativeChatSdk.ChatMessageType.FILE) {
          var _msg$attributes;
          const progress = (_msg$attributes = msg.attributes) === null || _msg$attributes === void 0 ? void 0 : _msg$attributes[_chat.gMessageAttributeFileProgress];
          if (progress) {
            setProgress(progress);
          }
        }
      },
      onMessageAttachmentChanged: msg => {
        // download progress
        if (msg.msgId === propsMsgId && msg.body.type === _reactNativeChatSdk.ChatMessageType.FILE) {
          const body = msg.body;
          if (body.fileStatus === _reactNativeChatSdk.ChatDownloadStatus.SUCCESS) {
            setProgress(100);
          }
        }
      },
      onMessageAttachmentProgressChanged: msg => {
        // download progress
        if (msg.msgId === propsMsgId && msg.body.type === _reactNativeChatSdk.ChatMessageType.FILE) {
          var _msg$attributes2;
          const progress = (_msg$attributes2 = msg.attributes) === null || _msg$attributes2 === void 0 ? void 0 : _msg$attributes2[_chat.gMessageAttributeFileProgress];
          if (progress) {
            setProgress(progress);
          }
        }
      }
    };
    im.messageManager.addListener('FileMessagePreview', listener);
    return () => {
      im.messageManager.removeListener('FileMessagePreview');
    };
  }, [im.messageManager, propsLocalMsgId, propsMsgId]);
  if (children) {
    return /*#__PURE__*/React.createElement(_reactNative.View, {
      style: [{
        flexGrow: 1
      }, containerStyle]
    }, children);
  } else {
    return /*#__PURE__*/React.createElement(_reactNative.View, {
      style: [{
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }, containerStyle]
    }, /*#__PURE__*/React.createElement(_Text.Text, null, progress), /*#__PURE__*/React.createElement(_reactNative.Pressable, {
      style: {
        position: 'absolute',
        width: 44,
        height: 44,
        top: top,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center'
        // backgroundColor: 'red',
      },

      onPress: onBack
      // pointerEvents={'none'}
    }, /*#__PURE__*/React.createElement(_Image.Icon, {
      name: 'chevron_left',
      style: {
        height: 24,
        width: 24,
        tintColor: getColor('icon')
      }
    })));
  }
}
//# sourceMappingURL=FileMessagePreview.js.map