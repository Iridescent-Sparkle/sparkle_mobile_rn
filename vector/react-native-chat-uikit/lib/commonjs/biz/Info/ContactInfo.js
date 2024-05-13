"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContactInfo = ContactInfo;
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
var _ContactInfo = require("./ContactInfo.hooks");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Contact Info Component.
 *
 * If it is a contact, the send button is displayed, if it is not a contact, the add contact button is displayed. If it is the current user, there are no operation options.
 */
function ContactInfo(props) {
  const {
    onBack,
    hasAudioCall = false,
    hasSendMessage = true,
    hasVideoCall = false,
    containerStyle,
    navigationBarVisible,
    customNavigationBar,
    onInitButton
  } = props;
  const {
    doNotDisturb,
    onDoNotDisturb,
    onClearChat,
    userId,
    userName,
    userAvatar,
    isContact,
    onSendMessage,
    onAudioCall,
    onVideoCall,
    alertRef,
    menuRef,
    toastRef,
    onRequestCloseMenu,
    onMore,
    tr,
    isSelf,
    onAddContact,
    onCopyId
  } = (0, _ContactInfo.useContactInfo)(props);
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
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        display: isSelf === true || isContact === false ? 'none' : 'flex'
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
      flexDirection: 'row',
      paddingTop: 12,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(_Text.Text, {
    textType: 'large',
    paletteType: 'headline',
    style: {
      color: getColor('fg')
    }
  }, userName ?? userId), doNotDisturb === true ? /*#__PURE__*/React.createElement(_Image.Icon, {
    name: 'bell_slash',
    style: {
      height: 20,
      width: 20,
      tintColor: getColor('t3')
    }
  }) : null), /*#__PURE__*/React.createElement(_reactNative.Pressable, {
    style: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 4
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
  })), isContact === true ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      height: 20
    }
  }), /*#__PURE__*/React.createElement(_BlockButtons.BlockButtons, {
    hasAudioCall: hasAudioCall,
    hasSendMessage: hasSendMessage,
    hasVideoCall: hasVideoCall,
    onSendMessage: onSendMessage,
    onAudioCall: onAudioCall,
    onVideoCall: onVideoCall,
    onInitButton: onInitButton
  })) : null), isContact === true ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      height: 20
    }
  }), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      height: 12,
      width: '100%',
      backgroundColor: getColor('bg2')
    }
  }), /*#__PURE__*/React.createElement(_ListItem.ListItem, {
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
  })) : isSelf !== true ? /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      alignItems: 'center',
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement(_Button.CmnButton, {
    sizesType: 'large',
    radiusType: input,
    contentType: 'only-text',
    text: tr('_uikit_info_button_add_contact'),
    style: {
      width: 180,
      height: 50
    },
    onPress: onAddContact
  })) : null, /*#__PURE__*/React.createElement(_Alert.Alert, {
    ref: alertRef
  }), /*#__PURE__*/React.createElement(_BottomSheetMenu.BottomSheetNameMenu, {
    onRequestModalClose: onRequestCloseMenu,
    ref: menuRef
  }), /*#__PURE__*/React.createElement(_Toast.SimpleToast, {
    propsRef: toastRef
  }));
}
//# sourceMappingURL=ContactInfo.js.map