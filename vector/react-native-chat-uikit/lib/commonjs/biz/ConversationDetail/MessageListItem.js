"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AvatarView = AvatarView;
exports.CheckView = CheckView;
exports.MessageBubble = MessageBubble;
exports.MessageContent = MessageContent;
exports.MessageCustomCard = MessageCustomCard;
exports.MessageDefaultImage = MessageDefaultImage;
exports.MessageFile = MessageFile;
exports.MessageImage = MessageImage;
exports.MessageListItem = MessageListItem;
exports.MessageListItemMemo = void 0;
exports.MessageQuoteBubble = MessageQuoteBubble;
exports.MessageText = MessageText;
exports.MessageVideo = MessageVideo;
exports.MessageView = MessageView;
exports.MessageVoice = MessageVoice;
exports.NameView = NameView;
exports.StateView = StateView;
exports.SystemTipView = SystemTipView;
exports.TimeTipView = TimeTipView;
exports.TimeView = TimeView;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeChatSdk = require("react-native-chat-sdk");
var _assets = require("../../assets");
var _chat = require("../../chat");
var _utils = require("../../chat/utils");
var _config = require("../../config");
var _hook = require("../../hook");
var _i18n = require("../../i18n");
var _theme = require("../../theme");
var _Image = require("../../ui/Image");
var _Text = require("../../ui/Text");
var _utils2 = require("../../utils");
var _Avatar = require("../Avatar");
var _const = require("../const");
var _MessageListItem = require("./MessageListItem.hooks");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function MessageText(props) {
  const {
    layoutType,
    msg,
    isSupport
  } = props;
  const {
    tr
  } = (0, _i18n.useI18nContext)();
  const {
    colors
  } = (0, _theme.usePaletteContext)();
  const {
    getColor
  } = (0, _hook.useColors)({
    left_text: {
      light: colors.neutral[1],
      dark: colors.neutral[1]
    },
    right_text: {
      light: colors.neutral[98],
      dark: colors.neutral[98]
    },
    left_text_flag: {
      light: colors.neutralSpecial[5],
      dark: colors.neutralSpecial[7]
    },
    right_text_flag: {
      light: colors.neutral[98],
      dark: colors.neutral[1]
    }
  });
  const body = msg.body;
  // const content = emoji.toCodePointText(body.content);
  let content = body.content;
  const editable = body.modifyCount !== undefined && body.modifyCount > 0 ? 'edited' : 'no-editable';
  if (isSupport !== true) {
    content = tr('_uikit_msg_tip_not_support');
  }
  return /*#__PURE__*/React.createElement(_reactNative.View, null, /*#__PURE__*/React.createElement(_Text.Text, {
    textType: 'large',
    paletteType: 'body',
    style: {
      color: getColor(layoutType === 'left' ? 'left_text' : 'right_text')
    }
  }, content), editable === 'edited' ? /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      flexDirection: 'row',
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement(_Text.SingleLineText, {
    textType: 'extraSmall',
    paletteType: 'body',
    style: {
      color: getColor(layoutType === 'left' ? 'left_text_flag' : 'right_text_flag')
    }
  }, tr('_uikit_msg_edit'))) : null);
}
function MessageDefaultImage(props) {
  const {
    url,
    width,
    height,
    thumbHeight,
    thumbWidth,
    iconName,
    onError,
    containerStyle
  } = props;
  const {
    colors,
    cornerRadius
  } = (0, _theme.usePaletteContext)();
  const {
    cornerRadius: corner
  } = (0, _theme.useThemeContext)();
  const {
    getBorderRadius
  } = (0, _hook.useGetStyleProps)();
  const {
    getColor
  } = (0, _hook.useColors)({
    bg: {
      light: colors.neutral[8],
      dark: colors.neutral[3]
    },
    fg: {
      light: colors.neutral[7],
      dark: colors.neutral[2]
    },
    border: {
      light: colors.neutral[9],
      dark: colors.neutral[3]
    }
  });
  return /*#__PURE__*/React.createElement(_Image.DefaultImage, {
    source: {
      uri: url
    },
    style: [{
      width: width,
      height: height,
      borderRadius: getBorderRadius({
        height: width + 1,
        crt: corner.bubble[0],
        cr: cornerRadius
      })
    }],
    defaultSource: _assets.ICON_ASSETS[iconName]('3x'),
    defaultStyle: {
      width: thumbWidth,
      height: thumbHeight,
      tintColor: getColor('fg')
    },
    defaultContainerStyle: {
      width: width,
      height: height,
      backgroundColor: getColor('bg'),
      borderRadius: getBorderRadius({
        height: width + 1,
        crt: corner.bubble[0],
        cr: cornerRadius
      }),
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden'
    },
    onError: onError,
    containerStyle: [{
      borderWidth: 1,
      borderColor: getColor('border'),
      borderRadius: getBorderRadius({
        height: width + 1,
        crt: corner.bubble[0],
        cr: cornerRadius
      }),
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden'
    }, containerStyle]
  });
}
function MessageImage(props) {
  const {
    msg,
    maxWidth
  } = props;
  // const url1 =
  //   '/storage/emulated/0/Android/data/com.hyphenate.rn.ChatUikitExample/1135220126133718#demo/files/asterisk003/asterisk001/53e8d540-a144-11ee-a811-ab4c303d7025.jpg';
  // const url3 =
  //   'file:///storage/emulated/0/Android/data/com.hyphenate.rn.ChatUikitExample/1135220126133718%23demo/files/asterisk003/asterisk001/53e8d540-a144-11ee-a811-ab4c303d7025.jpg';
  // const url5 =
  //   'file:///storage/emulated/0/Android/data/com.hyphenate.rn.ChatUikitExample/1135220126133718#demo/files/asterisk003/asterisk001/53e8d540-a144-11ee-a811-ab4c303d7025.jpg';
  // const url2 =
  //   '/var/mobile/Containers/Data/Application/CC0AD493-D627-463B-B351-44500E6FB1E2/tmp/AD1256B8-B32C-4CFE-B5F5-ECA21662B4E8.jpg';

  const [thumbUrl, setThumbUrl] = React.useState(undefined);
  const {
    width,
    height
  } = (0, _MessageListItem.getImageShowSize)(msg, maxWidth);
  React.useEffect(() => {
    msg.status;
    (0, _MessageListItem.getImageThumbUrl)(msg).then(url => {
      setThumbUrl(url);
    }).catch();
  }, [msg, msg.status]);
  return /*#__PURE__*/React.createElement(MessageDefaultImage, {
    url: thumbUrl,
    width: width,
    height: height,
    thumbWidth: 64,
    thumbHeight: 64,
    iconName: 'img'
  });
}
function MessageVoice(props) {
  const {
    msg,
    layoutType,
    isPlay: propsIsPlay = false,
    maxWidth: propsMaxWidth
  } = props;
  const body = msg.body;
  const {
    duration: propsDuration
  } = body;
  const safeDuration = propsDuration > 60 ? 60 : propsDuration < 1 ? 1 : propsDuration;
  const duration = safeDuration * 1000;
  const maxWidth = propsMaxWidth ?? _reactNative.Dimensions.get('window').width * 0.6;
  const minWidth = _reactNative.Dimensions.get('window').width * 0.1;
  const width = Math.floor((maxWidth - minWidth) * duration / _const.gMaxVoiceDuration) + minWidth;
  const loopCount = -1;
  const ref = React.useRef({});
  // const isPlayRef = React.useRef(false);
  const {
    colors
  } = (0, _theme.usePaletteContext)();
  const {
    getColor
  } = (0, _hook.useColors)({
    left_voice: {
      light: colors.neutralSpecial[5],
      dark: colors.neutralSpecial[6]
    },
    right_voice: {
      light: colors.neutral[98],
      dark: colors.neutral[95]
    },
    left_second: {
      light: colors.neutral[1],
      dark: colors.neutral[98]
    },
    right_second: {
      light: colors.neutral[98],
      dark: colors.neutral[1]
    }
  });
  const voiceIcons = React.useMemo(() => {
    if (layoutType === 'left') {
      return ['1st_frame_lft_lgt_sdy', '2nd_frame_lft_lgt_sdy', '3th_frame_lft_lgt_sdy'];
    } else {
      return ['1st_frame_rgt_lgt_sdy', '2nd_frame_rgt_lgt_sdy', '3th_frame_rgt_lgt_sdy'];
    }
  }, [layoutType]);
  const seconds = safeDuration;
  React.useEffect(() => {
    if (propsIsPlay === true) {
      var _ref$current, _ref$current$startPla;
      (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : (_ref$current$startPla = _ref$current.startPlay) === null || _ref$current$startPla === void 0 ? void 0 : _ref$current$startPla.call(_ref$current);
    } else {
      var _ref$current2, _ref$current2$stopPla;
      (_ref$current2 = ref.current) === null || _ref$current2 === void 0 ? void 0 : (_ref$current2$stopPla = _ref$current2.stopPlay) === null || _ref$current2$stopPla === void 0 ? void 0 : _ref$current2$stopPla.call(_ref$current2);
    }
  }, [propsIsPlay]);
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      flexDirection: layoutType === 'left' ? 'row' : 'row-reverse',
      maxWidth: maxWidth,
      width: Math.floor(width),
      // !!! Decimals cause errors. Appears only if aligned right. for example: 105.5
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(_Image.DynamicIcon, {
    propsRef: ref,
    names: voiceIcons,
    loopCount: loopCount,
    resolution: '3x'
    // onPlayStart={onPlayStart}
    // onPlayFinished={onPlayFinished}
    ,
    initialIndex: 2,
    style: {
      width: 20,
      height: 20,
      tintColor: getColor(layoutType === 'left' ? 'left_voice' : 'right_voice')
    }
  }), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      flexGrow: 1
    }
  }), /*#__PURE__*/React.createElement(_Text.Text, {
    textType: 'large',
    paletteType: 'body',
    style: {
      color: getColor(layoutType === 'left' ? 'left_second' : 'right_second')
    }
  }, `${seconds}"`));
}
function MessageVideo(props) {
  const {
    msg,
    maxWidth
  } = props;
  const [thumbUrl, setThumbUrl] = React.useState();
  const {
    width,
    height
  } = (0, _MessageListItem.getImageShowSize)(msg, maxWidth);
  const [showTriangle, setShowTriangle] = React.useState(true);
  const {
    colors
  } = (0, _theme.usePaletteContext)();
  const {
    getColor
  } = (0, _hook.useColors)({
    video: {
      light: colors.neutral[98],
      dark: colors.neutral[95]
    }
  });
  React.useEffect(() => {
    msg.status;
    (0, _MessageListItem.getVideoThumbUrl)(msg).then(url => {
      if (url) {
        setThumbUrl(url);
      }
    }).catch();
  }, [msg, msg.status]);
  return /*#__PURE__*/React.createElement(_reactNative.View, null, /*#__PURE__*/React.createElement(MessageDefaultImage, {
    url: thumbUrl,
    width: width,
    height: height,
    thumbWidth: 64,
    thumbHeight: 64,
    iconName: 'triangle_in_rectangle',
    onError: () => {
      setShowTriangle(false);
    }
  }), showTriangle === true ? /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [_reactNative.StyleSheet.absoluteFill, {
      justifyContent: 'center',
      alignItems: 'center'
    }]
  }, /*#__PURE__*/React.createElement(_Image.Icon, {
    name: 'triangle_in_circle',
    style: {
      width: 64,
      height: 64,
      tintColor: getColor('video')
    },
    resolution: '3x'
  })) : null);
}
function MessageFile(props) {
  const {
    msg,
    maxWidth,
    layoutType
  } = props;
  const body = msg.body;
  const fileName = body.displayName;
  const fileSize = React.useMemo(() => (0, _MessageListItem.getFileSize)(body.fileSize), [body.fileSize]);
  const {
    colors,
    cornerRadius
  } = (0, _theme.usePaletteContext)();
  const {
    cornerRadius: corner
  } = (0, _theme.useThemeContext)();
  const {
    getBorderRadius
  } = (0, _hook.useGetStyleProps)();
  const {
    getColor
  } = (0, _hook.useColors)({
    left_file_bg: {
      light: colors.neutral[100],
      dark: colors.neutral[6]
    },
    right_file_bg: {
      light: colors.neutral[100],
      dark: colors.neutral[6]
    },
    left_file_fg: {
      light: colors.neutral[7],
      dark: colors.neutral[6]
    },
    right_file_fg: {
      light: colors.neutral[7],
      dark: colors.neutral[6]
    },
    left_name: {
      light: colors.neutral[1],
      dark: colors.neutral[98]
    },
    right_name: {
      light: colors.neutral[98],
      dark: colors.neutral[98]
    },
    left_size: {
      light: colors.neutralSpecial[5],
      dark: colors.neutralSpecial[6]
    },
    right_size: {
      light: colors.neutral[95],
      dark: colors.neutralSpecial[6]
    }
  });
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      flexDirection: layoutType === 'left' ? 'row' : 'row-reverse',
      width: maxWidth,
      padding: 8
    }
  }, layoutType !== 'right' ? null : /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      flexGrow: 1
    }
  }), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      maxWidth: '75%',
      paddingHorizontal: layoutType === 'left' ? undefined : 12,
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement(_Text.SingleLineText, {
    textType: 'medium',
    paletteType: 'title',
    style: {
      color: getColor(layoutType === 'left' ? 'left_name' : 'right_name')
    }
  }, fileName), /*#__PURE__*/React.createElement(_Text.SingleLineText, {
    textType: 'medium',
    paletteType: 'body',
    style: {
      color: getColor(layoutType === 'left' ? 'left_size' : 'right_size')
    }
  }, fileSize)), layoutType === 'left' ? /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      flexGrow: 1
    }
  }) : null, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      padding: 6,
      backgroundColor: getColor(layoutType === 'left' ? 'left_file_bg' : 'right_file_bg'),
      borderRadius: getBorderRadius({
        height: 32,
        crt: corner.bubble[0],
        cr: cornerRadius
      }),
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(_Image.Icon, {
    name: 'doc',
    style: {
      width: 32,
      height: 32,
      tintColor: getColor(layoutType === 'left' ? 'left_file_fg' : 'right_file_fg')
    }
  })));
}
function MessageCustomCard(props) {
  var _body$params, _body$params2, _body$params3;
  const {
    msg,
    maxWidth,
    layoutType
  } = props;
  const body = msg.body;
  const avatar = (_body$params = body.params) === null || _body$params === void 0 ? void 0 : _body$params.avatar;
  const userId = (_body$params2 = body.params) === null || _body$params2 === void 0 ? void 0 : _body$params2.userId;
  const userName = (_body$params3 = body.params) === null || _body$params3 === void 0 ? void 0 : _body$params3.nickname;
  const {
    tr
  } = (0, _i18n.useI18nContext)();
  const {
    colors
  } = (0, _theme.usePaletteContext)();
  const {
    getColor
  } = (0, _hook.useColors)({
    left_divider: {
      light: colors.neutralSpecial[8],
      dark: colors.primary[6]
    },
    right_divider: {
      light: colors.primary[8],
      dark: colors.primary[6]
    },
    left_name: {
      light: colors.neutral[1],
      dark: colors.neutral[98]
    },
    right_name: {
      light: colors.neutral[98],
      dark: colors.neutral[98]
    },
    left_name_small: {
      light: colors.neutralSpecial[5],
      dark: colors.neutralSpecial[3]
    },
    right_name_small: {
      light: colors.neutral[95],
      dark: colors.neutralSpecial[7]
    }
  });
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      width: maxWidth
    }
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      padding: 12,
      flexDirection: 'row',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(_Avatar.Avatar, {
    size: 44,
    url: avatar
  }), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      width: 12
    }
  }), /*#__PURE__*/React.createElement(_Text.SingleLineText, {
    textType: 'medium',
    paletteType: 'title',
    style: {
      color: getColor(layoutType === 'left' ? 'left_name' : 'right_name'),
      maxWidth: '70%'
    }
  }, userName ?? userId)), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      borderBottomColor: getColor(layoutType === 'left' ? 'left_divider' : 'right_divider'),
      borderBottomWidth: 0.5,
      marginHorizontal: 12
    }
  }), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      paddingHorizontal: 12,
      paddingVertical: 4
    }
  }, /*#__PURE__*/React.createElement(_Text.SingleLineText, {
    textType: 'extraSmall',
    paletteType: 'label',
    style: {
      color: getColor(layoutType === 'left' ? 'left_name_small' : 'right_name_small'),
      maxWidth: '100%'
    }
  }, tr('contact'))));
}
function MessageContent(props) {
  const {
    msg,
    isSupport,
    layoutType,
    contentMaxWidth,
    isVoicePlaying
  } = props;
  if (isSupport === true) {
    switch (msg.body.type) {
      case _reactNativeChatSdk.ChatMessageType.TXT:
        {
          return /*#__PURE__*/React.createElement(MessageText, {
            msg: msg,
            layoutType: layoutType,
            isSupport: isSupport,
            maxWidth: contentMaxWidth
          });
        }
      case _reactNativeChatSdk.ChatMessageType.IMAGE:
        {
          return /*#__PURE__*/React.createElement(MessageImage, {
            layoutType: layoutType,
            msg: msg,
            maxWidth: contentMaxWidth
          });
        }
      case _reactNativeChatSdk.ChatMessageType.VOICE:
        {
          return /*#__PURE__*/React.createElement(MessageVoice, {
            msg: msg,
            layoutType: layoutType,
            isPlay: isVoicePlaying,
            maxWidth: contentMaxWidth
          });
        }
      case _reactNativeChatSdk.ChatMessageType.VIDEO:
        {
          return /*#__PURE__*/React.createElement(MessageVideo, {
            msg: msg,
            layoutType: layoutType,
            maxWidth: contentMaxWidth
          });
        }
      case _reactNativeChatSdk.ChatMessageType.FILE:
        {
          return /*#__PURE__*/React.createElement(MessageFile, {
            msg: msg,
            layoutType: layoutType,
            maxWidth: contentMaxWidth
          });
        }
      case _reactNativeChatSdk.ChatMessageType.CUSTOM:
        {
          const body = msg.body;
          if (body.event === _chat.gCustomMessageCardEventType) {
            return /*#__PURE__*/React.createElement(MessageCustomCard, {
              msg: msg,
              layoutType: layoutType,
              maxWidth: contentMaxWidth
            });
          }
          return /*#__PURE__*/React.createElement(MessageText, {
            msg: msg,
            layoutType: layoutType,
            isSupport: isSupport,
            maxWidth: contentMaxWidth
          });
        }
      default:
        {
          return /*#__PURE__*/React.createElement(MessageText, {
            msg: msg,
            layoutType: layoutType,
            isSupport: isSupport,
            maxWidth: contentMaxWidth
          });
        }
    }
  } else {
    return /*#__PURE__*/React.createElement(MessageText, {
      msg: msg,
      layoutType: layoutType,
      isSupport: isSupport
    });
  }
}
function MessageBubble(props) {
  const {
    hasTriangle = true,
    model,
    containerStyle,
    onClicked,
    onLongPress,
    maxWidth,
    MessageContent: propsMessageContent
  } = props;
  const _MessageContent = propsMessageContent ?? MessageContent;
  const {
    layoutType,
    msg,
    isVoicePlaying
  } = model;
  const {
    paddingHorizontal,
    paddingVertical
  } = React.useMemo(() => (0, _MessageListItem.getMessageBubblePadding)(msg), [msg]);
  const triangleWidth = 5;
  const isSupport = (0, _MessageListItem.isSupportMessage)(msg);
  const {
    colors,
    cornerRadius
  } = (0, _theme.usePaletteContext)();
  const {
    cornerRadius: corner
  } = (0, _theme.useThemeContext)();
  const {
    getBorderRadius
  } = (0, _hook.useGetStyleProps)();
  const {
    getColor
  } = (0, _hook.useColors)({
    left_bg: {
      light: colors.primary[95],
      dark: colors.primary[6]
    },
    right_bg: {
      light: colors.primary[5],
      dark: colors.primary[2]
    }
  });
  const isShowTriangle = React.useMemo(() => {
    return hasTriangle === true && msg.body.type !== _reactNativeChatSdk.ChatMessageType.IMAGE && msg.body.type !== _reactNativeChatSdk.ChatMessageType.VIDEO;
  }, [hasTriangle, msg.body.type]);
  const contentMaxWidth = React.useMemo(() => {
    const _maxWidth = maxWidth ? maxWidth - (paddingHorizontal ?? 0) * 2 : undefined;
    if (isShowTriangle === true) {
      return _maxWidth ? _maxWidth - triangleWidth : undefined;
    } else {
      return _maxWidth;
    }
  }, [isShowTriangle, maxWidth, paddingHorizontal]);
  const _onClicked = React.useCallback(() => {
    if (onClicked) {
      onClicked(msg.msgId.toString(), model);
    }
  }, [model, msg.msgId, onClicked]);
  const _onLongPress = React.useCallback(() => {
    if (onLongPress) {
      onLongPress(msg.msgId.toString(), model);
    }
  }, [model, msg.msgId, onLongPress]);
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [{
      flexDirection: layoutType === 'left' ? 'row' : 'row-reverse',
      maxWidth: maxWidth ?? '60%'
    }, containerStyle]
  }, isShowTriangle ? /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      paddingBottom: 10
    }
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      flexGrow: 1
    }
  }), /*#__PURE__*/React.createElement(_Image.Icon, {
    name: layoutType === 'left' ? 'message_arrow_lft' : 'message_arrow_rgt',
    style: {
      width: triangleWidth,
      height: 8,
      tintColor: getColor(layoutType === 'left' ? 'left_bg' : 'right_bg')
    }
  })) : null, /*#__PURE__*/React.createElement(_reactNative.Pressable, {
    style: [styles.text_bubble, {
      backgroundColor: getColor(layoutType === 'left' ? 'left_bg' : 'right_bg'),
      borderRadius: getBorderRadius({
        height: 0,
        crt: corner.bubble[0],
        cr: cornerRadius
      }),
      paddingHorizontal: paddingHorizontal,
      paddingVertical: paddingVertical
    }],
    onPress: _onClicked,
    onLongPress: _onLongPress
  }, _MessageContent({
    isSupport,
    msg,
    layoutType,
    isVoicePlaying,
    contentMaxWidth
  })));
}
function AvatarView(props) {
  const {
    isVisible = true,
    layoutType,
    avatar,
    onAvatarClicked
  } = props;
  return /*#__PURE__*/React.createElement(_reactNative.Pressable, {
    style: {
      display: isVisible === true ? 'flex' : 'none',
      paddingLeft: layoutType === 'left' ? undefined : 8,
      paddingRight: layoutType === 'left' ? 8 : undefined
    },
    onPress: onAvatarClicked
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      flexGrow: 1
    }
  }), /*#__PURE__*/React.createElement(_Avatar.Avatar, {
    size: 28,
    url: avatar
  }));
}
function NameView(props) {
  const {
    isVisible = true,
    layoutType,
    name,
    hasAvatar,
    hasTriangle
  } = props;
  const {
    colors
  } = (0, _theme.usePaletteContext)();
  const {
    getColor
  } = (0, _hook.useColors)({
    text: {
      light: colors.neutralSpecial[5],
      dark: colors.neutralSpecial[6]
    }
  });
  const paddingWidth = hasAvatar === true ? hasTriangle === true ? 53 : 48 : hasTriangle === true ? 17 : 12;
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      display: isVisible === true ? 'flex' : 'none',
      paddingLeft: layoutType === 'left' ? paddingWidth : undefined,
      paddingRight: layoutType === 'left' ? undefined : paddingWidth,
      marginBottom: 2
    }
  }, /*#__PURE__*/React.createElement(_Text.SingleLineText, {
    textType: 'small',
    paletteType: 'label',
    style: {
      color: getColor('text')
    }
  }, name));
}
function TimeView(props) {
  const {
    isVisible = true,
    layoutType,
    timestamp,
    hasAvatar,
    hasTriangle
  } = props;
  const {
    formatTime
  } = (0, _config.useConfigContext)();
  const {
    colors
  } = (0, _theme.usePaletteContext)();
  const {
    getColor
  } = (0, _hook.useColors)({
    text: {
      light: colors.neutral[7],
      dark: colors.neutral[6]
    }
  });
  const time = formatTime !== null && formatTime !== void 0 && formatTime.conversationDetailCallback ? formatTime.conversationDetailCallback(timestamp) : (0, _utils2.formatTsForConvDetail)(timestamp);
  const paddingWidth = hasAvatar === true ? hasTriangle === true ? 53 : 48 : hasTriangle === true ? 17 : 12;
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      display: isVisible === true ? 'flex' : 'none',
      paddingLeft: layoutType === 'left' ? paddingWidth : undefined,
      paddingRight: layoutType === 'left' ? undefined : paddingWidth,
      marginTop: 2
    }
  }, /*#__PURE__*/React.createElement(_Text.Text, {
    textType: 'small',
    paletteType: 'body',
    style: {
      color: getColor('text')
    }
  }, time));
}
function StateView(props) {
  const {
    isVisible = true,
    layoutType,
    state,
    onClicked
  } = props;
  const {
    colors
  } = (0, _theme.usePaletteContext)();
  const {
    getColor
  } = (0, _hook.useColors)({
    common: {
      light: colors.neutral[7],
      dark: colors.neutral[6]
    },
    red: {
      light: colors.error[5],
      dark: colors.error[6]
    },
    green: {
      light: colors.secondary[4],
      dark: colors.secondary[5]
    }
  });
  const isStop = React.useMemo(() => {
    return state !== 'loading-attachment' && state !== 'sending';
  }, [state]);
  const iconName = React.useMemo(() => (0, _MessageListItem.getStateIcon)(state), [state]);
  const iconColor = React.useMemo(() => (0, _MessageListItem.getStateIconColor)(state), [state]);
  return /*#__PURE__*/React.createElement(_reactNative.Pressable, {
    style: {
      display: isVisible === true ? 'flex' : 'none',
      paddingLeft: layoutType === 'left' ? 4 : undefined,
      paddingRight: layoutType === 'left' ? undefined : 4
    },
    onPress: onClicked
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      flexGrow: 1
    }
  }), isStop === true ? /*#__PURE__*/React.createElement(_Image.Icon, {
    name: iconName,
    style: {
      height: 20,
      width: 20,
      tintColor: getColor(iconColor)
    }
  }) : /*#__PURE__*/React.createElement(_Image.LoadingIcon, {
    isStop: isStop,
    name: iconName,
    style: {
      width: 20,
      height: 20,
      tintColor: getColor(iconColor)
    }
  }));
}
function CheckView(props) {
  const {
    isVisible = false,
    layoutType
  } = props;
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      display: isVisible === true ? 'flex' : 'none',
      justifyContent: 'center',
      paddingLeft: layoutType === 'left' ? 12 : undefined,
      paddingRight: layoutType === 'left' ? undefined : 12
    }
  }, /*#__PURE__*/React.createElement(_Image.Icon, {
    name: 'checked_ellipse',
    style: {
      width: 20,
      height: 20
    }
  }));
}
function MessageQuoteBubble(props) {
  const {
    hasAvatar,
    hasTriangle,
    model,
    containerStyle,
    maxWidth,
    onQuoteClicked
  } = props;
  const {
    layoutType,
    quoteMsg,
    msg: originalMsg
  } = model;
  const {
    paddingHorizontal,
    paddingVertical
  } = React.useMemo(() => {
    return {
      paddingHorizontal: 12,
      paddingVertical: 8
    };
  }, []);
  // const triangleWidth = 5;
  const {
    tr
  } = (0, _i18n.useI18nContext)();
  const {
    colors,
    cornerRadius
  } = (0, _theme.usePaletteContext)();
  const {
    cornerRadius: corner
  } = (0, _theme.useThemeContext)();
  const {
    getBorderRadius
  } = (0, _hook.useGetStyleProps)();
  const {
    getColor
  } = (0, _hook.useColors)({
    left_bg: {
      light: colors.neutral[95],
      dark: colors.neutral[6]
    },
    right_bg: {
      light: colors.neutral[95],
      dark: colors.neutral[2]
    },
    left_name: {
      light: colors.neutralSpecial[6],
      dark: colors.neutralSpecial[7]
    },
    right_name: {
      light: colors.neutralSpecial[6],
      dark: colors.neutralSpecial[7]
    },
    left_text: {
      light: colors.neutral[5],
      dark: colors.neutral[6]
    },
    right_text: {
      light: colors.neutral[5],
      dark: colors.neutral[6]
    }
  });
  const marginWidth = hasAvatar === true ? hasTriangle === true ? 53 : 48 : hasTriangle === true ? 17 : 12;
  const getContent = (originalMsg, quoteMsg) => {
    const user = (0, _utils.userInfoFromMessage)(quoteMsg);
    switch (quoteMsg === null || quoteMsg === void 0 ? void 0 : quoteMsg.body.type) {
      case _reactNativeChatSdk.ChatMessageType.TXT:
        {
          const body = quoteMsg === null || quoteMsg === void 0 ? void 0 : quoteMsg.body;
          return /*#__PURE__*/React.createElement(_reactNative.View, null, /*#__PURE__*/React.createElement(_Text.SingleLineText, {
            textType: 'small',
            paletteType: 'label',
            style: {
              color: getColor(layoutType === 'left' ? 'left_name' : 'right_name')
            }
          }, (user === null || user === void 0 ? void 0 : user.userName) ?? (user === null || user === void 0 ? void 0 : user.userId) ?? quoteMsg.from), /*#__PURE__*/React.createElement(_Text.Text, {
            textType: 'medium',
            paletteType: 'label',
            numberOfLines: 2,
            style: {
              color: getColor(layoutType === 'left' ? 'left_text' : 'right_text')
            }
          }, body.content));
        }
      case _reactNativeChatSdk.ChatMessageType.IMAGE:
        {
          const body = quoteMsg.body;
          return /*#__PURE__*/React.createElement(_reactNative.View, {
            style: {
              flexDirection: 'row'
            }
          }, /*#__PURE__*/React.createElement(_reactNative.View, {
            style: {
              paddingRight: 12,
              justifyContent: 'space-between'
            }
          }, /*#__PURE__*/React.createElement(_Text.SingleLineText, {
            textType: 'small',
            paletteType: 'label',
            style: {
              color: getColor(layoutType === 'left' ? 'left_name' : 'right_name')
            }
          }, (user === null || user === void 0 ? void 0 : user.userName) ?? (user === null || user === void 0 ? void 0 : user.userId) ?? quoteMsg.from), /*#__PURE__*/React.createElement(_reactNative.View, {
            style: {
              flexDirection: 'row',
              alignItems: 'center'
            }
          }, /*#__PURE__*/React.createElement(_Image.Icon, {
            name: 'img',
            style: {
              width: 18,
              height: 18,
              tintColor: getColor(layoutType === 'left' ? 'left_text' : 'left_text')
            }
          }), /*#__PURE__*/React.createElement(_reactNative.View, {
            style: {
              width: 2
            }
          }), /*#__PURE__*/React.createElement(_Text.Text, {
            textType: 'medium',
            paletteType: 'label',
            numberOfLines: 2,
            style: {
              color: getColor(layoutType === 'left' ? 'left_text' : 'right_text')
            }
          }, tr('picture')))), /*#__PURE__*/React.createElement(MessageDefaultImage, {
            url: body.thumbnailRemotePath ? body.thumbnailRemotePath : body.thumbnailLocalPath,
            width: 36,
            height: 36,
            thumbWidth: 24,
            thumbHeight: 24,
            iconName: 'img',
            containerStyle: {
              borderWidth: 0
            }
          }));
        }
      case _reactNativeChatSdk.ChatMessageType.VOICE:
        {
          const body = quoteMsg === null || quoteMsg === void 0 ? void 0 : quoteMsg.body;
          return /*#__PURE__*/React.createElement(_reactNative.View, null, /*#__PURE__*/React.createElement(_Text.SingleLineText, {
            textType: 'small',
            paletteType: 'label',
            style: {
              color: getColor(layoutType === 'left' ? 'left_name' : 'right_name'),
              alignSelf: layoutType === 'left' ? 'flex-start' : 'flex-end'
            }
          }, (user === null || user === void 0 ? void 0 : user.userName) ?? (user === null || user === void 0 ? void 0 : user.userId) ?? quoteMsg.from), /*#__PURE__*/React.createElement(_reactNative.View, {
            style: {
              flexDirection: 'row',
              alignItems: 'center'
            }
          }, /*#__PURE__*/React.createElement(_Image.Icon, {
            name: '3th_frame_lft_lgt_sdy',
            style: {
              width: 18,
              height: 18,
              tintColor: getColor(layoutType === 'left' ? 'left_text' : 'left_text')
            }
          }), /*#__PURE__*/React.createElement(_Text.Text, {
            textType: 'medium',
            paletteType: 'label',
            numberOfLines: 2,
            style: {
              color: getColor(layoutType === 'left' ? 'left_text' : 'right_text')
            }
          }, tr('voice'), /*#__PURE__*/React.createElement(_Text.Text, {
            textType: 'medium',
            paletteType: 'body',
            numberOfLines: 2,
            style: {
              color: getColor(layoutType === 'left' ? 'left_text' : 'right_text')
            }
          }, `: ${Math.floor(body.duration)}`))));
        }
      case _reactNativeChatSdk.ChatMessageType.VIDEO:
        {
          const body = quoteMsg.body;
          return /*#__PURE__*/React.createElement(_reactNative.View, {
            style: {
              flexDirection: 'row'
            }
          }, /*#__PURE__*/React.createElement(_reactNative.View, {
            style: {
              paddingRight: 12,
              justifyContent: 'space-between'
            }
          }, /*#__PURE__*/React.createElement(_Text.SingleLineText, {
            textType: 'small',
            paletteType: 'label',
            style: {
              color: getColor(layoutType === 'left' ? 'left_name' : 'right_name')
            }
          }, (user === null || user === void 0 ? void 0 : user.userName) ?? (user === null || user === void 0 ? void 0 : user.userId) ?? quoteMsg.from), /*#__PURE__*/React.createElement(_reactNative.View, {
            style: {
              flexDirection: 'row',
              alignItems: 'center'
            }
          }, /*#__PURE__*/React.createElement(_Image.Icon, {
            name: 'triangle_in_rectangle',
            style: {
              width: 18,
              height: 18,
              tintColor: getColor(layoutType === 'left' ? 'left_text' : 'left_text')
            }
          }), /*#__PURE__*/React.createElement(_reactNative.View, {
            style: {
              width: 2
            }
          }), /*#__PURE__*/React.createElement(_Text.Text, {
            textType: 'medium',
            paletteType: 'label',
            numberOfLines: 2,
            style: {
              color: getColor(layoutType === 'left' ? 'left_text' : 'right_text')
            }
          }, tr('video')))), /*#__PURE__*/React.createElement(MessageDefaultImage, {
            url: body.thumbnailRemotePath ? body.thumbnailRemotePath : body.thumbnailLocalPath,
            width: 36,
            height: 36,
            thumbWidth: 24,
            thumbHeight: 24,
            iconName: 'triangle_in_rectangle',
            containerStyle: {
              borderWidth: 0
            }
          }));
        }
      case _reactNativeChatSdk.ChatMessageType.FILE:
        {
          const body = quoteMsg === null || quoteMsg === void 0 ? void 0 : quoteMsg.body;
          return /*#__PURE__*/React.createElement(_reactNative.View, null, /*#__PURE__*/React.createElement(_Text.SingleLineText, {
            textType: 'small',
            paletteType: 'label',
            style: {
              color: getColor(layoutType === 'left' ? 'left_name' : 'right_name')
            }
          }, (user === null || user === void 0 ? void 0 : user.userName) ?? (user === null || user === void 0 ? void 0 : user.userId) ?? quoteMsg.from), /*#__PURE__*/React.createElement(_reactNative.View, {
            style: {
              flexDirection: 'row',
              alignItems: 'center'
            }
          }, /*#__PURE__*/React.createElement(_Image.Icon, {
            name: 'doc',
            style: {
              width: 18,
              height: 18,
              tintColor: getColor(layoutType === 'left' ? 'left_text' : 'left_text')
            }
          }), /*#__PURE__*/React.createElement(_Text.Text, {
            textType: 'medium',
            paletteType: 'label',
            numberOfLines: 2,
            style: {
              width: '90%',
              color: getColor(layoutType === 'left' ? 'left_text' : 'right_text')
            }
          }, tr('file'), /*#__PURE__*/React.createElement(_Text.Text, {
            textType: 'medium',
            paletteType: 'label',
            numberOfLines: 2,
            style: {
              color: getColor(layoutType === 'left' ? 'left_text' : 'right_text'),
              flexWrap: 'wrap'
            }
          }, `: ${body.displayName}`))));
        }
      case _reactNativeChatSdk.ChatMessageType.CUSTOM:
        {
          const body = quoteMsg === null || quoteMsg === void 0 ? void 0 : quoteMsg.body;
          if (body.event === _chat.gCustomMessageCardEventType) {
            const cardParams = body.params;
            return /*#__PURE__*/React.createElement(_reactNative.View, null, /*#__PURE__*/React.createElement(_Text.SingleLineText, {
              textType: 'small',
              paletteType: 'label',
              style: {
                color: getColor(layoutType === 'left' ? 'left_name' : 'right_name'),
                alignSelf: layoutType === 'left' ? 'flex-start' : 'flex-end'
              }
            }, (user === null || user === void 0 ? void 0 : user.userName) ?? (user === null || user === void 0 ? void 0 : user.userId) ?? quoteMsg.from), /*#__PURE__*/React.createElement(_reactNative.View, {
              style: {
                flexDirection: 'row'
              }
            }, /*#__PURE__*/React.createElement(_Image.Icon, {
              name: 'person_single_fill',
              style: {
                width: 18,
                height: 18,
                tintColor: getColor(layoutType === 'left' ? 'left_text' : 'left_text')
              }
            }), /*#__PURE__*/React.createElement(_Text.Text, {
              textType: 'medium',
              paletteType: 'label',
              numberOfLines: 2,
              style: {
                color: getColor(layoutType === 'left' ? 'left_text' : 'right_text')
              }
            }, tr('card'), /*#__PURE__*/React.createElement(_Text.Text, {
              textType: 'medium',
              paletteType: 'body',
              numberOfLines: 2,
              style: {
                color: getColor(layoutType === 'left' ? 'left_text' : 'right_text')
              }
            }, `: ${cardParams.nickname ?? cardParams.userId}`))));
          }
          return /*#__PURE__*/React.createElement(_Text.Text, {
            textType: 'large',
            paletteType: 'body',
            style: {
              color: getColor(layoutType === 'left' ? 'left_text' : 'right_text')
            }
          }, tr('_uikit_msg_tip_not_support'));
        }
      default:
        {
          var _originalMsg$attribut;
          if ((_originalMsg$attribut = originalMsg.attributes) !== null && _originalMsg$attribut !== void 0 && _originalMsg$attribut[_chat.gMessageAttributeQuote] && !quoteMsg) {
            return /*#__PURE__*/React.createElement(_Text.Text, {
              textType: 'large',
              paletteType: 'body',
              style: {
                color: getColor(layoutType === 'left' ? 'left_text' : 'right_text')
              }
            }, tr('_uikit_msg_tip_msg_not_exist'));
          } else {
            return /*#__PURE__*/React.createElement(_Text.Text, {
              textType: 'large',
              paletteType: 'body',
              style: {
                color: getColor(layoutType === 'left' ? 'left_text' : 'right_text')
              }
            }, tr('_uikit_msg_tip_not_support'));
          }
        }
    }
  };
  const _onClicked = (msg, quoteMsg) => {
    if (onQuoteClicked) {
      const quote = msg.attributes[_chat.gMessageAttributeQuote];
      onQuoteClicked === null || onQuoteClicked === void 0 ? void 0 : onQuoteClicked(quoteMsg ? quoteMsg.msgId : quote.msgID, model);
    }
  };
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [{
      flexDirection: layoutType === 'left' ? 'row' : 'row-reverse',
      maxWidth: maxWidth ?? '70%',
      marginLeft: layoutType === 'left' ? marginWidth : marginWidth,
      marginBottom: 2
    }, containerStyle]
  }, /*#__PURE__*/React.createElement(_reactNative.Pressable, {
    style: [styles.text_bubble, {
      backgroundColor: getColor(layoutType === 'left' ? 'left_bg' : 'right_bg'),
      borderRadius: getBorderRadius({
        height: 36,
        crt: corner.bubble[0],
        cr: cornerRadius
      }),
      paddingHorizontal: paddingHorizontal,
      paddingVertical: paddingVertical
    }],
    onPress: () => _onClicked(originalMsg, quoteMsg)
  }, getContent(originalMsg, quoteMsg)));
}
function MessageView(props) {
  var _info$avatarURL;
  const {
    isVisible = true,
    model,
    avatarIsVisible = true,
    nameIsVisible = true,
    timeIsVisible = true,
    onQuoteClicked,
    onAvatarClicked,
    onStateClicked,
    MessageQuoteBubble: propsMessageQuoteBubble,
    MessageBubble: propsMessageBubble,
    ...others
  } = props;
  const _MessageQuoteBubble = propsMessageQuoteBubble ?? MessageQuoteBubble;
  const _MessageBubble = propsMessageBubble ?? MessageBubble;
  const {
    layoutType
  } = model;
  const state = (0, _MessageListItem.getMessageState)(model.msg);
  const maxWidth = _reactNative.Dimensions.get('window').width * 0.6;
  const time = model.msg.localTime ?? model.msg.serverTime;
  const bubblePadding = 12;
  const hasTriangle = true;
  const isQuote = (0, _MessageListItem.isQuoteMessage)(model.msg, model.quoteMsg);
  const info = (0, _utils.userInfoFromMessage)(model.msg);
  // const userName = model.userName ?? model.userId;
  const [userName] = React.useState((info === null || info === void 0 ? void 0 : info.userName) ?? model.userName ?? model.userId);
  const isSingleChat = React.useRef(model.msg.chatType === _reactNativeChatSdk.ChatMessageChatType.PeerChat).current;
  // const avatar = avatarIsVisible === true ? model.userAvatar : undefined;
  const [userAvatar] = React.useState(avatarIsVisible === true ? info !== null && info !== void 0 && info.avatarURL && (info === null || info === void 0 ? void 0 : (_info$avatarURL = info.avatarURL) === null || _info$avatarURL === void 0 ? void 0 : _info$avatarURL.length) > 0 ? info.avatarURL : model.userAvatar : undefined);
  const onClickedAvatar = React.useCallback(() => {
    onAvatarClicked === null || onAvatarClicked === void 0 ? void 0 : onAvatarClicked(model.msg.msgId, model);
  }, [model, onAvatarClicked]);
  const onClickedState = React.useCallback(() => {
    onStateClicked === null || onStateClicked === void 0 ? void 0 : onStateClicked(model.msg.msgId, model);
  }, [model, onStateClicked]);
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      flexDirection: layoutType === 'left' ? 'row' : 'row-reverse',
      display: isVisible === true ? 'flex' : 'none'
    }
  }, /*#__PURE__*/React.createElement(CheckView, {
    layoutType: layoutType
  }), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      flexDirection: 'column',
      alignItems: layoutType === 'left' ? 'flex-start' : 'flex-end'
    }
  }, nameIsVisible && isSingleChat !== true ? /*#__PURE__*/React.createElement(NameView, {
    layoutType: layoutType,
    name: userName,
    hasAvatar: avatarIsVisible,
    hasTriangle: hasTriangle
  }) : null, isQuote ? /*#__PURE__*/React.createElement(_MessageQuoteBubble, {
    hasAvatar: avatarIsVisible,
    hasTriangle: hasTriangle,
    onQuoteClicked: onQuoteClicked,
    maxWidth: maxWidth,
    model: model
  }) : null, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      flexDirection: layoutType === 'left' ? 'row' : 'row-reverse',
      paddingHorizontal: bubblePadding
    }
  }, avatarIsVisible ? /*#__PURE__*/React.createElement(AvatarView, {
    layoutType: layoutType,
    avatar: userAvatar,
    onAvatarClicked: onClickedAvatar
  }) : null, /*#__PURE__*/React.createElement(_MessageBubble, _extends({
    model: model,
    maxWidth: maxWidth,
    hasTriangle: hasTriangle
  }, others)), state !== 'none' ? /*#__PURE__*/React.createElement(StateView, {
    layoutType: layoutType,
    state: state,
    onClicked: onClickedState
  }) : null), timeIsVisible ? /*#__PURE__*/React.createElement(TimeView, {
    layoutType: layoutType,
    timestamp: time,
    hasAvatar: avatarIsVisible,
    hasTriangle: hasTriangle
  }) : null));
}
function SystemTipView(props) {
  const {
    isVisible = true,
    model
  } = props;
  const {
    msg
  } = model;
  const {
    tr
  } = (0, _i18n.useI18nContext)();
  const {
    colors
  } = (0, _theme.usePaletteContext)();
  const {
    getColor
  } = (0, _hook.useColors)({
    fg: {
      light: colors.neutral[7],
      dark: colors.neutral[6]
    }
  });
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      display: isVisible === true ? 'flex' : 'none',
      alignItems: 'center',
      paddingHorizontal: 27.5
    }
  }, /*#__PURE__*/React.createElement(_Text.Text, {
    style: {
      flexWrap: 'wrap',
      textAlign: 'center',
      color: getColor('fg')
    }
  }, (0, _MessageListItem.getSystemTip)(msg, tr)));
}
function TimeTipView(props) {
  const {
    isVisible = true,
    model
  } = props;
  const {
    timestamp
  } = model;
  const date = new Date(timestamp);
  const {
    colors
  } = (0, _theme.usePaletteContext)();
  const {
    getColor
  } = (0, _hook.useColors)({
    fg: {
      light: colors.neutral[7],
      dark: colors.neutral[6]
    }
  });
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      display: isVisible === true ? 'flex' : 'none',
      alignItems: 'center',
      paddingHorizontal: 27.5
    }
  }, /*#__PURE__*/React.createElement(_Text.Text, {
    style: {
      flexWrap: 'wrap',
      textAlign: 'center',
      color: getColor('fg')
    }
  }, date.toDateString()));
}
function MessageListItem(props) {
  const {
    model,
    MessageView: propsMessageView,
    SystemTipView: propsSystemTipView,
    TimeTipView: propsTimeTipView,
    ...others
  } = props;
  const {
    modelType
  } = model;
  const _MessageView = propsMessageView ?? MessageView;
  const _SystemTipView = propsSystemTipView ?? SystemTipView;
  const _TimeTipView = propsTimeTipView ?? TimeTipView;
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      // height: 100,
      // width: '100%',
      // borderBottomColor: 'yellow',
      // borderBottomWidth: 1,
      // borderTopWidth: 1,
      paddingVertical: 8,
      flexDirection: 'column'
    }
  }, modelType === 'message' ? /*#__PURE__*/React.createElement(_MessageView, _extends({
    isVisible: modelType === 'message' ? true : false,
    model: model
  }, others)) : null, modelType === 'system' ? /*#__PURE__*/React.createElement(_SystemTipView, {
    isVisible: modelType === 'system' ? true : false,
    model: model
  }) : null, modelType === 'time' ? /*#__PURE__*/React.createElement(_TimeTipView, {
    isVisible: modelType === 'time' ? true : false,
    model: model
  }) : null);
}
const MessageListItemMemo = /*#__PURE__*/React.memo(MessageListItem);
exports.MessageListItemMemo = MessageListItemMemo;
const styles = _reactNative.StyleSheet.create({
  text_bubble: {
    overflow: 'hidden'
  }
});
//# sourceMappingURL=MessageListItem.js.map