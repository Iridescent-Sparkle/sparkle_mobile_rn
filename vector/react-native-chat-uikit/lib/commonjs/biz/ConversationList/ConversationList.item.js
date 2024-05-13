"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConversationListItem = ConversationListItem;
exports.ConversationListItemMemo = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
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
var _Badges = require("../Badges");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Conversation list item component.
 */
function ConversationListItem(props) {
  const {
    onClicked,
    onLongPressed,
    data
  } = props;
  const {
    lastMessage
  } = data;
  const {
    formatTime
  } = (0, _config.useConfigContext)();
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
    pin_bg: {
      light: colors.neutral[9],
      dark: colors.neutral[2]
    },
    t1: {
      light: colors.neutral[1],
      dark: colors.neutral[98]
    },
    t2: {
      light: colors.neutral[5],
      dark: colors.neutral[6]
    },
    t3: {
      light: colors.neutral[7],
      dark: colors.neutral[5]
    },
    divider: {
      light: colors.neutral[9],
      dark: colors.neutral[2]
    },
    mention: {
      light: colors.primary[5],
      dark: colors.primary[6]
    }
  });
  const im = (0, _chat.useChatContext)();
  const {
    tr
  } = (0, _i18n.useI18nContext)();
  const getMention = React.useCallback(msg => {
    var _msg$attributes;
    if (msg !== null && msg !== void 0 && (_msg$attributes = msg.attributes) !== null && _msg$attributes !== void 0 && _msg$attributes[_chat.gMessageAttributeMentions]) {
      var _msg$attributes2;
      const mentions = (_msg$attributes2 = msg.attributes) === null || _msg$attributes2 === void 0 ? void 0 : _msg$attributes2[_chat.gMessageAttributeMentions];
      if (typeof mentions === 'string') {
        if (mentions === 'ALL') {
          return tr('@all');
        }
      } else if (Array.isArray(mentions)) {
        const ret = mentions.find(item => {
          if (item === im.userId) {
            return true;
          }
          return false;
        });
        return ret ? tr('@me') : null;
      }
    }
    return null;
  }, [im.userId, tr]);
  const getMessageFormatTime = React.useCallback((msg, timestamp) => {
    const cb = formatTime === null || formatTime === void 0 ? void 0 : formatTime.conversationListCallback;
    if (msg === undefined && timestamp) {
      return cb ? cb(timestamp) : (0, _utils2.formatTsForConvList)(timestamp);
    } else if (msg) {
      return cb ? cb(msg.localTime) : (0, _utils2.formatTsForConvList)(msg.localTime);
    } else {
      return '';
    }
  }, [formatTime === null || formatTime === void 0 ? void 0 : formatTime.conversationListCallback]);
  const count = data.doNotDisturb === true ? data.unreadMessageCount === 0 ? 0 : undefined : data.unreadMessageCount;
  return /*#__PURE__*/React.createElement(_reactNative.Pressable, {
    style: {
      backgroundColor: data.isPinned === true ? getColor('pin_bg') : getColor('bg')
    },
    onPress: () => {
      onClicked === null || onClicked === void 0 ? void 0 : onClicked(data);
    },
    onLongPress: () => {
      onLongPressed === null || onLongPressed === void 0 ? void 0 : onLongPressed(data);
    }
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      width: '100%',
      height: 75.5,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16
    }
  }, /*#__PURE__*/React.createElement(_Avatar.Avatar, {
    url: data.convAvatar,
    size: 50
  }), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      flexDirection: 'column',
      flexGrow: 1,
      paddingLeft: 12,
      maxWidth: '65%'
    }
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      flexDirection: 'row',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(_Text.SingleLineText, {
    paletteType: 'title',
    textType: 'medium',
    style: {
      color: getColor('t1')
    }
  }, data.convName ?? data.convId), data.doNotDisturb === true ? /*#__PURE__*/React.createElement(_Image.Icon, {
    name: 'bell_slash',
    style: {
      height: 20,
      width: 20,
      tintColor: getColor('t3')
    }
  }) : null), /*#__PURE__*/React.createElement(_Text.SingleLineText, {
    paletteType: 'body',
    textType: 'medium',
    style: {
      color: getColor('mention')
    }
  }, getMention(lastMessage), /*#__PURE__*/React.createElement(_Text.SingleLineText, {
    paletteType: 'body',
    textType: 'medium',
    style: {
      color: getColor('t2')
    }
  }, tr((0, _utils.getMessageSnapshot)(data.lastMessage))))), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement(_Text.SingleLineText, {
    paletteType: 'body',
    textType: 'small',
    style: {
      color: getColor('t2')
    }
  }, getMessageFormatTime(data.lastMessage, data.pinnedTime)), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      height: count === undefined ? 10 : 5
    }
  }), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      justifyContent: 'center',
      flexDirection: 'row'
    }
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      flexGrow: 1
    }
  }), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      height: 20,
      // justifyContent: 'center',
      marginRight: count === undefined ? 4 : 0
    }
  }, /*#__PURE__*/React.createElement(_Badges.Badges, {
    count: count
  }))))), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      width: '100%',
      borderBottomWidth: 0.5,
      borderBottomColor: getColor('divider'),
      marginLeft: 78
    }
  }));
}
const ConversationListItemMemo = /*#__PURE__*/React.memo(ConversationListItem);
exports.ConversationListItemMemo = ConversationListItemMemo;
//# sourceMappingURL=ConversationList.item.js.map