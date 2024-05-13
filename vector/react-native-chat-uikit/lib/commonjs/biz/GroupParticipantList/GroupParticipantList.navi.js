"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupParticipantListNavigationBar = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _chat = require("../../chat");
var _hook = require("../../hook");
var _i18n = require("../../i18n");
var _theme = require("../../theme");
var _Button = require("../../ui/Button");
var _Image = require("../../ui/Image");
var _Text = require("../../ui/Text");
var _TopNavigationBar = require("../TopNavigationBar");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const GroupParticipantListNavigationBar = props => {
  const {
    participantType,
    onBack,
    onDelParticipant,
    deleteCount,
    participantCount,
    onClickedAddParticipant,
    onClickedDelParticipant,
    customNavigationBar,
    ownerId
  } = props;
  const {
    tr
  } = (0, _i18n.useI18nContext)();
  const im = (0, _chat.useChatContext)();
  const isOwner = ownerId === im.userId;
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
    text: {
      light: colors.neutral[1],
      dark: colors.neutral[98]
    },
    text_disable: {
      light: colors.neutral[7],
      dark: colors.neutral[3]
    },
    text_enable: {
      light: colors.error[5],
      dark: colors.error[6]
    },
    icon: {
      light: colors.neutral[3],
      dark: colors.neutral[95]
    }
  });
  if (customNavigationBar) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, customNavigationBar);
  }
  if (participantType === 'delete') {
    return /*#__PURE__*/React.createElement(_TopNavigationBar.TopNavigationBar, {
      Left: /*#__PURE__*/React.createElement(_reactNative.Pressable, {
        style: {
          flexDirection: 'row',
          alignItems: 'center',
          height: 40
        },
        onPress: onBack
      }, /*#__PURE__*/React.createElement(_Image.Icon, {
        name: 'chevron_left',
        style: {
          width: 24,
          height: 24,
          tintColor: getColor('icon')
        }
      }), /*#__PURE__*/React.createElement(_Text.Text, {
        textType: 'medium',
        paletteType: 'label',
        style: {
          color: getColor('text')
        }
      }, tr('_uikit_group_del_member_title'))),
      Right: isOwner === true ? /*#__PURE__*/React.createElement(_reactNative.Pressable, {
        style: {
          flexDirection: 'row'
        },
        onPress: onDelParticipant
      }, /*#__PURE__*/React.createElement(_Text.Text, {
        textType: 'medium',
        paletteType: 'label',
        style: {
          color: getColor(deleteCount === 0 ? 'text_disable' : 'text_enable')
        }
      }, tr('_uikit_group_del_member_button', deleteCount))) : null
    });
  } else if (participantType === 'change-owner') {
    return /*#__PURE__*/React.createElement(_TopNavigationBar.TopNavigationBar, {
      Left: isOwner === true ? /*#__PURE__*/React.createElement(_reactNative.Pressable, {
        style: {
          flexDirection: 'row',
          alignItems: 'center',
          height: 40
        },
        onPress: onBack
      }, /*#__PURE__*/React.createElement(_Image.Icon, {
        name: 'chevron_left',
        style: {
          width: 24,
          height: 24,
          tintColor: getColor('icon')
        }
      }), /*#__PURE__*/React.createElement(_Text.Text, {
        textType: 'medium',
        paletteType: 'label',
        style: {
          color: getColor('text')
        }
      }, tr('_uikit_group_change_owner_title'))) : null,
      Right: /*#__PURE__*/React.createElement(_reactNative.View, {
        style: {
          width: 1,
          height: 1
        }
      })
    });
  } else if (participantType === 'mention') {
    return /*#__PURE__*/React.createElement(_TopNavigationBar.TopNavigationBar, {
      Left: /*#__PURE__*/React.createElement(_reactNative.Pressable, {
        style: {
          flexDirection: 'row',
          alignItems: 'center',
          height: 40
        },
        onPress: onBack
      }, /*#__PURE__*/React.createElement(_Image.Icon, {
        name: 'chevron_left',
        style: {
          width: 24,
          height: 24,
          tintColor: getColor('icon')
        }
      }), /*#__PURE__*/React.createElement(_Text.Text, {
        textType: 'medium',
        paletteType: 'label',
        style: {
          color: getColor('text')
        }
      }, `@ mention`)),
      Right: /*#__PURE__*/React.createElement(_reactNative.View, {
        style: {
          width: 1,
          height: 1
        }
      })
    });
  } else {
    return /*#__PURE__*/React.createElement(_TopNavigationBar.TopNavigationBar, {
      Left: /*#__PURE__*/React.createElement(_reactNative.Pressable, {
        style: {
          flexDirection: 'row',
          alignItems: 'center',
          height: 40
        },
        onPress: onBack
      }, /*#__PURE__*/React.createElement(_Image.Icon, {
        name: 'chevron_left',
        style: {
          width: 24,
          height: 24,
          tintColor: getColor('icon')
        }
      }), /*#__PURE__*/React.createElement(_Text.Text, null, tr('_uikit_group_member_list_title', participantCount))),
      Right: isOwner === true ? /*#__PURE__*/React.createElement(_reactNative.View, {
        style: {
          flexDirection: 'row'
        }
      }, /*#__PURE__*/React.createElement(_reactNative.Pressable, {
        style: {
          padding: 6
        }
      }, /*#__PURE__*/React.createElement(_Button.IconButton, {
        iconName: 'person_add',
        style: {
          width: 24,
          height: 24
        },
        onPress: onClickedAddParticipant
      })), /*#__PURE__*/React.createElement(_reactNative.View, {
        style: {
          width: 4
        }
      }), /*#__PURE__*/React.createElement(_reactNative.Pressable, {
        style: {
          padding: 6
        }
      }, /*#__PURE__*/React.createElement(_Button.IconButton, {
        iconName: 'person_minus',
        style: {
          width: 24,
          height: 24,
          padding: 6
        },
        onPress: onClickedDelParticipant
      }))) : null
    });
  }
};
exports.GroupParticipantListNavigationBar = GroupParticipantListNavigationBar;
//# sourceMappingURL=GroupParticipantList.navi.js.map