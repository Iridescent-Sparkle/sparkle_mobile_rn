"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageInput = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _config = require("../../config");
var _hook = require("../../hook");
var _i18n = require("../../i18n");
var _theme = require("../../theme");
var _Button = require("../../ui/Button");
var _Keyboard = require("../../ui/Keyboard");
var _TextInput = require("../../ui/TextInput");
var _BottomSheetMenu = require("../BottomSheetMenu");
var _EmojiList = require("../EmojiList");
var _VoiceBar = require("../VoiceBar");
var _MessageInput = require("./MessageInput.hooks");
var _MessageInputEditMessage = require("./MessageInputEditMessage");
var _MessageInputQuoteView = require("./MessageInputQuoteView");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Message Input Component.
 *
 * This component can send text, send emoticons, send files, send pictures, send voice, send files, etc. You can customize the sending menu and add a UI for sending custom messages. Usually this component is used in conjunction with the `MessageList` component.
 */
const MessageInput = /*#__PURE__*/React.forwardRef(function (props, ref) {
  const {
    top,
    numberOfLines = 4,
    emojiList
  } = props;
  const testRef = React.useRef(null);
  const {
    fontFamily
  } = (0, _config.useConfigContext)();
  const {} = (0, _i18n.useI18nContext)();
  const {
    style
  } = (0, _theme.useThemeContext)();
  const {
    colors
  } = (0, _theme.usePaletteContext)();
  const {
    getColor
  } = (0, _hook.useColors)({
    bg: {
      light: colors.neutral[98],
      dark: colors.neutral[1]
    },
    input_bg: {
      light: colors.neutral[95],
      dark: colors.neutral[2]
    },
    text: {
      light: colors.neutral[1],
      dark: colors.neutral[98]
    },
    text_disable: {
      light: colors.neutral[7],
      dark: colors.neutral[3]
    },
    text_enable: {
      light: colors.primary[5],
      dark: colors.primary[6]
    },
    icon: {
      light: colors.neutral[3],
      dark: colors.neutral[95]
    }
  });
  const {
    value,
    setValue,
    onClickedFaceListItem,
    onClickedDelButton,
    onClickedEmojiButton,
    onClickedVoiceButton,
    inputRef,
    emojiHeight,
    emojiIconName,
    onFocus,
    onBlur,
    onCloseVoiceBar,
    voiceBarRef,
    onSelectSendVoice,
    onVoiceStateChange,
    menuRef,
    onRequestCloseMenu,
    sendIconName,
    onClickedSend,
    onVoiceFailed,
    showQuote,
    onHideQuoteMessage,
    onRequestCloseEdit,
    editRef,
    onEditMessageFinished,
    quoteMsg,
    onClickedEmojiSend
  } = (0, _MessageInput.useMessageInput)(props, ref);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_Keyboard.KeyboardAvoidingView, {
    behavior: _reactNative.Platform.OS === 'ios' ? 'padding' : 'height',
    keyboardVerticalOffset: top
  }, showQuote === true ? /*#__PURE__*/React.createElement(_MessageInputQuoteView.MessageInputQuoteView, {
    showQuote: showQuote,
    onDel: onHideQuoteMessage,
    msg: quoteMsg
  }) : null, /*#__PURE__*/React.createElement(_reactNative.View, {
    ref: testRef,
    style: {
      backgroundColor: getColor('bg'),
      display: 'flex'
    },
    onLayout: () => {
      // testRef.current?.measure(
      //   (
      //     _x: number,
      //     _y: number,
      //     _width: number,
      //     _height: number,
      //     _pageX: number,
      //     pageY: number
      //   ) => {
      //     console.log(
      //       'Sub:Sub:measure:',
      //       _x,
      //       _y,
      //       _width,
      //       _height,
      //       _pageX,
      //       pageY
      //     );
      //     // setPageY(pageY);
      //   }
      // );
      // testRef.current?.measureInWindow(
      //   (_x: number, _y: number, _width: number, _height: number) => {
      //     // console.log('Sub:Sub:measureInWindow:', _x, _y, _width, _height);
      //   }
      // );
    }
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      flexDirection: 'row',
      margin: 8
    }
  }, /*#__PURE__*/React.createElement(_Button.IconButtonMemo, {
    style: {
      width: 30,
      height: 30,
      tintColor: getColor('tintColor')
    },
    containerStyle: {
      alignSelf: 'flex-end',
      margin: 6
    },
    onPress: onClickedVoiceButton,
    iconName: 'wave_in_circle'
  }), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      flexDirection: 'column',
      flexGrow: 1,
      justifyContent: 'center',
      flexShrink: 1,
      marginHorizontal: 6
    }
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      flexDirection: 'row',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(_TextInput.TextInput, {
    ref: inputRef,
    numberOfLines: numberOfLines,
    multiline: true,
    unitHeight: _reactNative.Platform.OS === 'ios' ? 24 : 20,
    style: {
      fontSize: 16,
      fontStyle: 'normal',
      fontWeight: '400',
      // lineHeight: 22,
      fontFamily: fontFamily,
      flex: _reactNative.Platform.select({
        ios: undefined,
        android: 1
      })
    },
    containerStyle: {
      width: '100%',
      minHeight: 36,
      paddingHorizontal: 8,
      paddingVertical: 7,
      maxHeight: _reactNative.Platform.OS === 'ios' ? 96 : 96
    },
    onFocus: onFocus,
    onBlur: onBlur,
    onChangeText: setValue,
    value: value,
    keyboardAppearance: style === 'light' ? 'light' : 'dark',
    placeholder: 'Aa'
  }))), /*#__PURE__*/React.createElement(_Button.IconButtonMemo, {
    style: {
      width: 30,
      height: 30,
      tintColor: getColor('icon')
    },
    containerStyle: {
      alignSelf: 'flex-end',
      margin: 6
    },
    onPress: onClickedEmojiButton,
    iconName: emojiIconName
  }), /*#__PURE__*/React.createElement(_Button.IconButtonMemo, {
    style: {
      width: 30,
      height: 30,
      tintColor: getColor(sendIconName === 'plus_in_circle' ? 'icon' : 'text_enable'),
      backgroundColor: undefined,
      borderRadius: 30
    },
    containerStyle: {
      alignSelf: 'flex-end',
      margin: 6
    },
    onPress: onClickedSend,
    iconName: sendIconName
  })))), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      backgroundColor: emojiHeight === 0 ? undefined : getColor('backgroundColor'),
      height: emojiHeight,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(_EmojiList.EmojiListMemo, {
    containerStyle: {
      flex: 1
    },
    onFace: onClickedFaceListItem,
    onDel: onClickedDelButton,
    onSend: onClickedEmojiSend,
    emojiList: emojiList
  })), /*#__PURE__*/React.createElement(_VoiceBar.BottomVoiceBar, {
    ref: voiceBarRef,
    onRequestModalClose: onCloseVoiceBar,
    onClickedSendButton: onSelectSendVoice,
    onState: onVoiceStateChange,
    onFailed: onVoiceFailed
  }), /*#__PURE__*/React.createElement(_BottomSheetMenu.BottomSheetNameMenu, {
    ref: menuRef,
    onRequestModalClose: onRequestCloseMenu
  }), /*#__PURE__*/React.createElement(_MessageInputEditMessage.MessageInputEditMessage, {
    ref: editRef,
    top: top,
    onRequestModalClose: onRequestCloseEdit,
    onEditMessageFinished: onEditMessageFinished
  }));
});
exports.MessageInput = MessageInput;
//# sourceMappingURL=MessageInput.js.map