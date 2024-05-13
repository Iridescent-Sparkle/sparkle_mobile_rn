import * as React from 'react';
import { Pressable, View } from 'react-native';
import { gMessageAttributeMentions, useChatContext } from '../../chat';
import { getMessageSnapshot } from '../../chat/utils';
import { useConfigContext } from '../../config';
import { useColors } from '../../hook';
import { useI18nContext } from '../../i18n';
import { usePaletteContext } from '../../theme';
import { Icon } from '../../ui/Image';
import { SingleLineText } from '../../ui/Text';
import { formatTsForConvList } from '../../utils';
import { Avatar } from '../Avatar';
import { Badges } from '../Badges';
/**
 * Conversation list item component.
 */
export function ConversationListItem(props) {
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
  } = useConfigContext();
  const {
    colors
  } = usePaletteContext();
  const {
    getColor
  } = useColors({
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
  const im = useChatContext();
  const {
    tr
  } = useI18nContext();
  const getMention = React.useCallback(msg => {
    var _msg$attributes;
    if (msg !== null && msg !== void 0 && (_msg$attributes = msg.attributes) !== null && _msg$attributes !== void 0 && _msg$attributes[gMessageAttributeMentions]) {
      var _msg$attributes2;
      const mentions = (_msg$attributes2 = msg.attributes) === null || _msg$attributes2 === void 0 ? void 0 : _msg$attributes2[gMessageAttributeMentions];
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
      return cb ? cb(timestamp) : formatTsForConvList(timestamp);
    } else if (msg) {
      return cb ? cb(msg.localTime) : formatTsForConvList(msg.localTime);
    } else {
      return '';
    }
  }, [formatTime === null || formatTime === void 0 ? void 0 : formatTime.conversationListCallback]);
  const count = data.doNotDisturb === true ? data.unreadMessageCount === 0 ? 0 : undefined : data.unreadMessageCount;
  return /*#__PURE__*/React.createElement(Pressable, {
    style: {
      backgroundColor: data.isPinned === true ? getColor('pin_bg') : getColor('bg')
    },
    onPress: () => {
      onClicked === null || onClicked === void 0 ? void 0 : onClicked(data);
    },
    onLongPress: () => {
      onLongPressed === null || onLongPressed === void 0 ? void 0 : onLongPressed(data);
    }
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      width: '100%',
      height: 75.5,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    url: data.convAvatar,
    size: 50
  }), /*#__PURE__*/React.createElement(View, {
    style: {
      flexDirection: 'column',
      flexGrow: 1,
      paddingLeft: 12,
      maxWidth: '65%'
    }
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      flexDirection: 'row',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(SingleLineText, {
    paletteType: 'title',
    textType: 'medium',
    style: {
      color: getColor('t1')
    }
  }, data.convName ?? data.convId), data.doNotDisturb === true ? /*#__PURE__*/React.createElement(Icon, {
    name: 'bell_slash',
    style: {
      height: 20,
      width: 20,
      tintColor: getColor('t3')
    }
  }) : null), /*#__PURE__*/React.createElement(SingleLineText, {
    paletteType: 'body',
    textType: 'medium',
    style: {
      color: getColor('mention')
    }
  }, getMention(lastMessage), /*#__PURE__*/React.createElement(SingleLineText, {
    paletteType: 'body',
    textType: 'medium',
    style: {
      color: getColor('t2')
    }
  }, tr(getMessageSnapshot(data.lastMessage))))), /*#__PURE__*/React.createElement(View, {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(View, {
    style: {
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement(SingleLineText, {
    paletteType: 'body',
    textType: 'small',
    style: {
      color: getColor('t2')
    }
  }, getMessageFormatTime(data.lastMessage, data.pinnedTime)), /*#__PURE__*/React.createElement(View, {
    style: {
      height: count === undefined ? 10 : 5
    }
  }), /*#__PURE__*/React.createElement(View, {
    style: {
      justifyContent: 'center',
      flexDirection: 'row'
    }
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      flexGrow: 1
    }
  }), /*#__PURE__*/React.createElement(View, {
    style: {
      height: 20,
      // justifyContent: 'center',
      marginRight: count === undefined ? 4 : 0
    }
  }, /*#__PURE__*/React.createElement(Badges, {
    count: count
  }))))), /*#__PURE__*/React.createElement(View, {
    style: {
      width: '100%',
      borderBottomWidth: 0.5,
      borderBottomColor: getColor('divider'),
      marginLeft: 78
    }
  }));
}
export const ConversationListItemMemo = /*#__PURE__*/React.memo(ConversationListItem);
//# sourceMappingURL=ConversationList.item.js.map