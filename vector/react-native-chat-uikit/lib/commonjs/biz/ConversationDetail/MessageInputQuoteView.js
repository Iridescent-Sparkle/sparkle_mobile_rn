"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageInputQuoteView = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeChatSdk = require("react-native-chat-sdk");
var _chat = require("../../chat");
var _utils = require("../../chat/utils");
var _hook = require("../../hook");
var _i18n = require("../../i18n");
var _theme = require("../../theme");
var _Button = require("../../ui/Button");
var _Image = require("../../ui/Image");
var _Text = require("../../ui/Text");
var _MessageListItem = require("./MessageListItem");
var _MessageListItem2 = require("./MessageListItem.hooks");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Message Input Quote View Component properties.
 */

/**
 * Message Input Quote View Component.
 */
const MessageInputQuoteView = props => {
  const {
    showQuote,
    onDel,
    msg: propsMsg
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
    quote: {
      light: colors.neutral[9],
      dark: colors.neutral[3]
    },
    quote_del: {
      light: colors.neutral[3],
      dark: colors.neutral[7]
    },
    t1: {
      light: colors.neutralSpecial[5],
      dark: colors.neutralSpecial[6]
    },
    t2: {
      light: colors.neutral[5],
      dark: colors.neutral[6]
    }
  });
  const bodyType = React.useRef(propsMsg === null || propsMsg === void 0 ? void 0 : propsMsg.body.type).current;
  const [thumbUrl, setThumbUrl] = React.useState();
  const getContent = msg => {
    let maxWidth = _reactNative.Dimensions.get('window').width;
    if (msg.body.type === _reactNativeChatSdk.ChatMessageType.TXT) {
      maxWidth = maxWidth * 0.9;
      const body = msg.body;
      const content = body.content;
      return /*#__PURE__*/React.createElement(_Text.SingleLineText, {
        textType: 'small',
        paletteType: 'body',
        style: {
          color: getColor('t2'),
          maxWidth: maxWidth
        }
      }, content);
    } else if (msg.body.type === _reactNativeChatSdk.ChatMessageType.FILE) {
      maxWidth = maxWidth * 0.8;
      const body = msg.body;
      return /*#__PURE__*/React.createElement(_reactNative.View, {
        style: {
          flexDirection: 'row',
          maxWidth: maxWidth
        }
      }, /*#__PURE__*/React.createElement(_Image.Icon, {
        name: 'doc',
        style: {
          width: 16,
          height: 16,
          tintColor: getColor('t2'),
          marginRight: 2
        }
      }), /*#__PURE__*/React.createElement(_Text.SingleLineText, {
        textType: 'small',
        paletteType: 'label',
        style: {
          color: getColor('t2')
        }
      }, tr('_uikit_chat_input_quote_file'), /*#__PURE__*/React.createElement(_Text.SingleLineText, {
        textType: 'small',
        paletteType: 'body',
        style: {
          color: getColor('t2')
        }
      }, body.displayName.substring(0))));
    } else if (msg.body.type === _reactNativeChatSdk.ChatMessageType.IMAGE) {
      maxWidth = maxWidth * 0.6;
      return /*#__PURE__*/React.createElement(_reactNative.View, {
        style: {
          flexDirection: 'row',
          maxWidth: maxWidth
        }
      }, /*#__PURE__*/React.createElement(_Image.Icon, {
        name: 'img',
        style: {
          width: 16,
          height: 16,
          tintColor: getColor('t2'),
          marginRight: 2
        }
      }), /*#__PURE__*/React.createElement(_Text.SingleLineText, {
        textType: 'small',
        paletteType: 'label',
        style: {
          color: getColor('t2')
        }
      }, tr('picture')));
    } else if (msg.body.type === _reactNativeChatSdk.ChatMessageType.VIDEO) {
      maxWidth = maxWidth * 0.6;
      return /*#__PURE__*/React.createElement(_reactNative.View, {
        style: {
          flexDirection: 'row',
          maxWidth: maxWidth
        }
      }, /*#__PURE__*/React.createElement(_Image.Icon, {
        name: 'triangle_in_rectangle',
        style: {
          width: 16,
          height: 16,
          tintColor: getColor('t2'),
          marginRight: 2
        }
      }), /*#__PURE__*/React.createElement(_Text.SingleLineText, {
        textType: 'small',
        paletteType: 'label',
        style: {
          color: getColor('t2')
        }
      }, tr('video')));
    } else if (msg.body.type === _reactNativeChatSdk.ChatMessageType.VOICE) {
      maxWidth = maxWidth * 0.6;
      const body = msg.body;
      const second = Math.floor(body.duration ?? 0);
      return /*#__PURE__*/React.createElement(_reactNative.View, {
        style: {
          flexDirection: 'row',
          maxWidth: maxWidth
        }
      }, /*#__PURE__*/React.createElement(_Image.Icon, {
        name: '3th_frame_lft_lgt_sdy',
        style: {
          width: 16,
          height: 16,
          tintColor: getColor('t2'),
          marginRight: 2
        }
      }), /*#__PURE__*/React.createElement(_Text.SingleLineText, {
        textType: 'small',
        paletteType: 'label',
        style: {
          color: getColor('t2')
        }
      }, tr('voice')), /*#__PURE__*/React.createElement(_Text.SingleLineText, {
        textType: 'small',
        paletteType: 'body',
        style: {
          color: getColor('t2')
        }
      }, tr(` ${second}"`)));
    } else if (msg.body.type === _reactNativeChatSdk.ChatMessageType.CUSTOM) {
      const body = msg.body;
      const event = body.event;
      if (event === _chat.gCustomMessageCardEventType) {
        const cardParams = body.params;
        maxWidth = maxWidth * 0.8;
        return /*#__PURE__*/React.createElement(_reactNative.View, {
          style: {
            flexDirection: 'row',
            maxWidth: maxWidth
          }
        }, /*#__PURE__*/React.createElement(_Image.Icon, {
          name: 'person_single_fill',
          style: {
            width: 16,
            height: 16,
            tintColor: getColor('t2'),
            marginRight: 2
          }
        }), /*#__PURE__*/React.createElement(_Text.SingleLineText, {
          textType: 'small',
          paletteType: 'label',
          style: {
            color: getColor('t2')
          }
        }, tr('card'), /*#__PURE__*/React.createElement(_Text.SingleLineText, {
          textType: 'small',
          paletteType: 'body',
          style: {
            color: getColor('t2')
          }
        }, cardParams.nickname ?? cardParams.userId)));
      }
    }
    return null;
  };
  const getContentThumb = React.useCallback(async msg => {
    if (msg.body.type === _reactNativeChatSdk.ChatMessageType.IMAGE) {
      const ret = await (0, _MessageListItem2.getImageThumbUrl)(msg);
      setThumbUrl(ret);
    } else if (msg.body.type === _reactNativeChatSdk.ChatMessageType.VIDEO) {
      const ret = await (0, _MessageListItem2.getVideoThumbUrl)(msg);
      setThumbUrl(ret);
    }
  }, []);
  const getUserName = msg => {
    const user = (0, _utils.userInfoFromMessage)(msg);
    return (user === null || user === void 0 ? void 0 : user.userName) ?? (user === null || user === void 0 ? void 0 : user.userId) ?? msg.from;
  };
  React.useEffect(() => {
    if (propsMsg) {
      getContentThumb(propsMsg);
    }
  }, [getContentThumb, propsMsg]);
  if (showQuote !== true || propsMsg === undefined) {
    return null;
  }
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      height: 52,
      backgroundColor: getColor('quote'),
      flexDirection: 'row',
      paddingHorizontal: 12,
      paddingVertical: 8,
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      flexGrow: 1
    }
  }, /*#__PURE__*/React.createElement(_Text.SingleLineText, {
    textType: 'small',
    paletteType: 'label',
    style: {
      color: getColor('t1'),
      fontWeight: '500',
      maxWidth: '60%'
    }
  }, tr('you'), /*#__PURE__*/React.createElement(_Text.SingleLineText, {
    textType: 'small',
    paletteType: 'body',
    style: {
      color: getColor('t1'),
      maxWidth: '70%'
    }
  }, tr('_uikit_chat_input_quote_title_1'), /*#__PURE__*/React.createElement(_Text.SingleLineText, {
    textType: 'small',
    paletteType: 'label',
    style: {
      color: getColor('t1'),
      fontWeight: '500',
      maxWidth: '60%'
    }
  }, getUserName(propsMsg)))), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      height: 4
    }
  }), getContent(propsMsg)), thumbUrl ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_MessageListItem.MessageDefaultImage, {
    url: thumbUrl,
    width: 36,
    height: 36,
    thumbWidth: 24,
    thumbHeight: 24,
    iconName: bodyType === _reactNativeChatSdk.ChatMessageType.IMAGE ? 'img' : 'triangle_in_rectangle'
  }), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      width: 12
    }
  })) : null, /*#__PURE__*/React.createElement(_Button.IconButtonMemo, {
    iconName: 'xmark_in_circle_fill',
    style: {
      width: 20,
      height: 20,
      tintColor: getColor('quote_del')
    },
    onPress: onDel
  }));
};
exports.MessageInputQuoteView = MessageInputQuoteView;
//# sourceMappingURL=MessageInputQuoteView.js.map