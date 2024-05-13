"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupParticipantInfo = GroupParticipantInfo;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _hook = require("../../hook");
var _theme = require("../../theme");
var _Alert = require("../../ui/Alert");
var _Button = require("../../ui/Button");
var _Image = require("../../ui/Image");
var _Switch = require("../../ui/Switch");
var _Text = require("../../ui/Text");
var _Toast = require("../../ui/Toast");
var _Avatar = require("../Avatar");
var _BottomSheetMenu = require("../BottomSheetMenu");
var _ListItem = require("../ListItem");
var _TopNavigationBar = require("../TopNavigationBar");
var _BlockButtons = require("./BlockButtons");
var _GroupParticipantInfo = require("./GroupParticipantInfo.hooks");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Group Participant Info Component.
 *
 * If it is a contact, the send message button is displayed, otherwise the add contact button is displayed.
 */
function GroupParticipantInfo(props) {
  const {
    onBack,
    onClickedNavigationBarButton: onMore,
    hasAudioCall = false,
    hasSendMessage = true,
    hasVideoCall = false,
    onClearChat,
    containerStyle,
    navigationBarVisible,
    customNavigationBar
  } = props;
  const {
    doNotDisturb,
    onDoNotDisturb,
    userId,
    userName,
    userAvatar,
    onCopyId,
    toastRef,
    tr,
    onSendMessage,
    onAddContact,
    onAudioCall,
    onVideoCall,
    isContact,
    onInitButton,
    isSelf,
    onRequestCloseMenu,
    menuRef,
    alertRef
  } = (0, _GroupParticipantInfo.useGroupParticipantInfo)(props);
  const {
    cornerRadius
  } = (0, _theme.useThemeContext)();
  const {
    input
  } = cornerRadius;
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
    bg2: {
      light: colors.neutral[95],
      dark: colors.neutral[2]
    },
    fg: {
      light: colors.neutral[1],
      dark: colors.neutral[98]
    },
    t2: {
      light: colors.neutral[3],
      dark: colors.neutral[95]
    },
    t3: {
      light: colors.neutral[7],
      dark: colors.neutral[6]
    },
    icon: {
      light: colors.neutral[3],
      dark: colors.neutral[95]
    }
  });
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [{
      flexGrow: 1,
      backgroundColor: getColor('bg')
    }, containerStyle]
  }, navigationBarVisible !== false ? customNavigationBar ? /*#__PURE__*/React.createElement(React.Fragment, null, customNavigationBar) : /*#__PURE__*/React.createElement(_TopNavigationBar.TopNavigationBar, {
    Left: /*#__PURE__*/React.createElement(_reactNative.Pressable, {
      style: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        width: 40
      },
      onPress: onBack
    }, /*#__PURE__*/React.createElement(_Image.Icon, {
      name: 'chevron_left',
      style: {
        width: 24,
        height: 24,
        tintColor: getColor('icon')
      }
    })),
    Right: /*#__PURE__*/React.createElement(_reactNative.Pressable, {
      style: {
        display: isSelf === true || isContact === false ? 'none' : 'flex',
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center'
      },
      onPress: onMore
    }, /*#__PURE__*/React.createElement(_Image.Icon, {
      name: 'ellipsis_vertical',
      style: {
        height: 24,
        width: 24
      }
    }))
  }) : null, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      alignItems: 'center',
      paddingTop: 20
    }
  }, /*#__PURE__*/React.createElement(_Avatar.Avatar, {
    size: 100,
    url: userAvatar
  }), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      height: 12
    }
  }), /*#__PURE__*/React.createElement(_Text.Text, {
    textType: 'large',
    paletteType: 'headline',
    style: {
      color: getColor('fg')
    }
  }, userName ?? userId), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      height: 4
    }
  }), /*#__PURE__*/React.createElement(_reactNative.Pressable, {
    style: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    onPress: onCopyId
  }, /*#__PURE__*/React.createElement(_Text.Text, {
    textType: 'small',
    paletteType: 'label',
    style: {
      color: getColor('t3')
    }
  }, userId), /*#__PURE__*/React.createElement(_Image.Icon, {
    name: 'doc_on_doc',
    style: {
      width: 16,
      height: 16,
      tintColor: getColor('t3')
    }
  })), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      height: 20
    }
  }), isContact === true ? /*#__PURE__*/React.createElement(_BlockButtons.BlockButtons, {
    hasAudioCall: hasAudioCall,
    hasSendMessage: hasSendMessage,
    hasVideoCall: hasVideoCall,
    onSendMessage: onSendMessage,
    onAudioCall: onAudioCall,
    onVideoCall: onVideoCall,
    onInitButton: onInitButton
  }) : isSelf === true ? null : /*#__PURE__*/React.createElement(_Button.CmnButton, {
    sizesType: 'large',
    radiusType: input,
    contentType: 'only-text',
    text: tr('_uikit_info_button_add_contact'),
    onPress: onAddContact
  })), isContact === true ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_ListItem.ListItem, {
    containerStyle: {
      paddingHorizontal: 16
    },
    LeftName: /*#__PURE__*/React.createElement(_Text.Text, {
      textType: 'medium',
      paletteType: 'title',
      style: {
        color: getColor('fg')
      }
    }, tr('_uikit_info_not_disturb')),
    RightIcon: /*#__PURE__*/React.createElement(_reactNative.View, null, doNotDisturb !== undefined ? /*#__PURE__*/React.createElement(_Switch.CommonSwitch, {
      height: 31,
      width: 51,
      value: doNotDisturb,
      onValueChange: onDoNotDisturb
    }) : null)
  }), /*#__PURE__*/React.createElement(_ListItem.ListItem, {
    onClicked: onClearChat,
    containerStyle: {
      paddingHorizontal: 16
    },
    LeftName: /*#__PURE__*/React.createElement(_Text.Text, {
      textType: 'medium',
      paletteType: 'title',
      style: {
        color: getColor('fg')
      }
    }, tr('_uikit_info_clear_msg'))
  })) : null, /*#__PURE__*/React.createElement(_Alert.Alert, {
    ref: alertRef
  }), /*#__PURE__*/React.createElement(_BottomSheetMenu.BottomSheetNameMenu, {
    onRequestModalClose: onRequestCloseMenu,
    ref: menuRef
  }), /*#__PURE__*/React.createElement(_Toast.SimpleToast, {
    propsRef: toastRef
  }));
}
//# sourceMappingURL=GroupParticipantInfo.js.map