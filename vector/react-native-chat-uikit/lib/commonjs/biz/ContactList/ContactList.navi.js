"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContactListNavigationBar = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _hook = require("../../hook");
var _i18n = require("../../i18n");
var _theme = require("../../theme");
var _Button = require("../../ui/Button");
var _Text = require("../../ui/Text");
var _Avatar = require("../Avatar");
var _TopNavigationBar = require("../TopNavigationBar");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const ContactListNavigationBar = props => {
  const {
    contactType,
    avatarUrl,
    onClickedNewContact,
    onBack,
    onClickedCreateGroup,
    selectedCount,
    onClickedAddGroupParticipant,
    selectedMemberCount,
    customNavigationBar
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
      light: colors.primary[5],
      dark: colors.primary[6]
    },
    icon: {
      light: colors.neutral[3],
      dark: colors.neutral[95]
    }
  });
  if (customNavigationBar) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, customNavigationBar);
  }
  if (contactType === 'contact-list') {
    return /*#__PURE__*/React.createElement(_TopNavigationBar.TopNavigationBar, {
      Left: /*#__PURE__*/React.createElement(_reactNative.View, {
        style: {
          flexDirection: 'row'
        }
      }, /*#__PURE__*/React.createElement(_Avatar.Avatar, {
        url: avatarUrl,
        size: 32
      })),
      Right: _TopNavigationBar.TopNavigationBarRight,
      RightProps: {
        onClicked: onClickedNewContact,
        iconName: 'person_add'
      },
      Title: (0, _TopNavigationBar.TopNavigationBarTitle)({
        text: 'Contacts'
      })
    });
  } else if (contactType === 'new-conversation') {
    return /*#__PURE__*/React.createElement(_TopNavigationBar.TopNavigationBar, {
      Left: /*#__PURE__*/React.createElement(_reactNative.Pressable, {
        style: {
          flexDirection: 'row'
        },
        onPress: onBack
      }, /*#__PURE__*/React.createElement(_Text.Text, {
        paletteType: 'label',
        textType: 'medium',
        style: {
          color: getColor('icon')
        }
      }, tr('cancel'))),
      Right: /*#__PURE__*/React.createElement(_reactNative.View, {
        style: {
          width: 32,
          height: 32
        }
      }),
      Title: (0, _TopNavigationBar.TopNavigationBarTitle)({
        text: tr('_uikit_new_conv_title')
      })
    });
  } else if (contactType === 'create-group') {
    return /*#__PURE__*/React.createElement(_TopNavigationBar.TopNavigationBar, {
      Left: /*#__PURE__*/React.createElement(_reactNative.Pressable, {
        style: {
          flexDirection: 'row',
          alignItems: 'center',
          height: 40
        },
        onPress: onBack
      }, /*#__PURE__*/React.createElement(_Button.IconButton, {
        iconName: 'chevron_left',
        style: {
          width: 24,
          height: 24,
          tintColor: getColor('icon')
        }
      }), /*#__PURE__*/React.createElement(_Text.Text, {
        paletteType: 'title',
        textType: 'medium',
        style: {
          color: getColor('text')
        }
      }, tr('_uikit_create_group_title'))),
      Right: /*#__PURE__*/React.createElement(_reactNative.Pressable, {
        onPress: onClickedCreateGroup,
        disabled: selectedCount && selectedCount > 0 ? false : true
      }, /*#__PURE__*/React.createElement(_Text.Text, {
        paletteType: 'label',
        textType: 'medium',
        style: {
          color: getColor(selectedCount === 0 ? 'text_disable' : 'text_enable')
        }
      }, tr('_uikit_create_group_button', selectedCount))),
      Title: (0, _TopNavigationBar.TopNavigationBarTitle)({
        text: ''
      })
    });
  } else if (contactType === 'add-group-member') {
    return /*#__PURE__*/React.createElement(_TopNavigationBar.TopNavigationBar, {
      Left: /*#__PURE__*/React.createElement(_reactNative.Pressable, {
        style: {
          flexDirection: 'row',
          alignItems: 'center',
          height: 40
        },
        onPress: onBack
      }, /*#__PURE__*/React.createElement(_Button.IconButton, {
        iconName: 'chevron_left',
        style: {
          width: 24,
          height: 24,
          tintColor: getColor('icon')
        }
      }), /*#__PURE__*/React.createElement(_Text.Text, {
        paletteType: 'title',
        textType: 'medium',
        style: {
          color: getColor('text')
        }
      }, tr('_uikit_add_group_member_title'))),
      Right: /*#__PURE__*/React.createElement(_reactNative.Pressable, {
        onPress: onClickedAddGroupParticipant,
        disabled: selectedMemberCount && selectedMemberCount > 0 ? false : true
      }, /*#__PURE__*/React.createElement(_Text.Text, {
        paletteType: 'label',
        textType: 'medium',
        style: {
          color: getColor(selectedMemberCount === 0 ? 'text_disable' : 'text_enable')
        }
      }, tr('_uikit_add_group_member_button', selectedMemberCount))),
      Title: (0, _TopNavigationBar.TopNavigationBarTitle)({
        text: ''
      })
    });
  } else if (contactType === 'share-contact') {
    return /*#__PURE__*/React.createElement(_TopNavigationBar.TopNavigationBar, {
      Left: /*#__PURE__*/React.createElement(_reactNative.Pressable, {
        style: {
          flexDirection: 'row'
        },
        onPress: onBack
      }, /*#__PURE__*/React.createElement(_Text.Text, {
        paletteType: 'label',
        textType: 'medium',
        style: {
          color: getColor('icon')
        }
      }, tr('cancel'))),
      Right: /*#__PURE__*/React.createElement(_reactNative.View, {
        style: {
          width: 32,
          height: 32
        }
      }),
      Title: (0, _TopNavigationBar.TopNavigationBarTitle)({
        text: tr('_uikit_share_card_title')
      })
    });
  } else {
    return null;
  }
};
exports.ContactListNavigationBar = ContactListNavigationBar;
//# sourceMappingURL=ContactList.navi.js.map