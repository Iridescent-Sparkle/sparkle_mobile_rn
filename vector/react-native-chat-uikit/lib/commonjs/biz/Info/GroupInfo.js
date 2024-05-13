"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupInfo = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _hook = require("../../hook");
var _theme = require("../../theme");
var _Alert = require("../../ui/Alert");
var _Image = require("../../ui/Image");
var _Switch = require("../../ui/Switch");
var _Text = require("../../ui/Text");
var _Toast = require("../../ui/Toast");
var _Avatar = require("../Avatar");
var _BottomSheetMenu = require("../BottomSheetMenu");
var _ListItem = require("../ListItem");
var _TopNavigationBar = require("../TopNavigationBar");
var _BlockButtons = require("./BlockButtons");
var _GroupInfo = require("./GroupInfo.hooks");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Group Info Component.
 *
 * If you are a group administrator, you have more operating rights. If you are an ordinary member, you have no group management rights.
 */
const GroupInfo = /*#__PURE__*/React.forwardRef(function (props, ref) {
  const {
    groupId,
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
    groupName,
    groupAvatar,
    groupDescription,
    alertRef,
    toastRef,
    onClearChat,
    doNotDisturb,
    onDoNotDisturb,
    onGroupName,
    onGroupDescription,
    // onGroupMyRemark,
    onCopyId,
    onParticipant,
    menuRef,
    onRequestCloseMenu,
    onMore,
    groupMemberCount,
    onSendMessage,
    onVideoCall,
    onAudioCall,
    isOwner,
    tr
  } = (0, _GroupInfo.useGroupInfo)(props, ref);
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
    t1: {
      light: colors.neutral[5],
      dark: colors.neutral[6]
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
  }) : null, /*#__PURE__*/React.createElement(_reactNative.ScrollView, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      alignItems: 'center',
      paddingTop: 20
    }
  }, /*#__PURE__*/React.createElement(_Avatar.GroupAvatar, {
    size: 100,
    url: groupAvatar
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
  }, groupName ?? groupId), doNotDisturb === true ? /*#__PURE__*/React.createElement(_Image.Icon, {
    name: 'bell_slash',
    style: {
      height: 20,
      width: 20,
      tintColor: getColor('t3')
    }
  }) : null), groupDescription ? /*#__PURE__*/React.createElement(_Text.Text, {
    textType: 'medium',
    paletteType: 'label',
    style: {
      color: getColor('t2'),
      paddingTop: 4
    }
  }, groupDescription ?? 'test description') : null, /*#__PURE__*/React.createElement(_reactNative.Pressable, {
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
  }, tr('_uikit_info_item_group_id'), /*#__PURE__*/React.createElement(_Text.Text, {
    textType: 'small',
    paletteType: 'label',
    style: {
      color: getColor('t3')
    }
  }, `${groupId}`)), /*#__PURE__*/React.createElement(_Image.Icon, {
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
  }), /*#__PURE__*/React.createElement(_BlockButtons.BlockButtons, {
    hasAudioCall: hasAudioCall,
    hasSendMessage: hasSendMessage,
    hasVideoCall: hasVideoCall,
    onSendMessage: onSendMessage,
    onAudioCall: onAudioCall,
    onVideoCall: onVideoCall,
    onInitButton: onInitButton
  })), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      height: 20
    }
  }), /*#__PURE__*/React.createElement(_ListItem.ListItem, {
    onClicked: onParticipant,
    containerStyle: {
      paddingHorizontal: 16
    },
    LeftName: /*#__PURE__*/React.createElement(_Text.Text, {
      textType: 'medium',
      paletteType: 'title',
      style: {
        color: getColor('fg')
      }
    }, tr('_uikit_info_item_member')),
    RightText: /*#__PURE__*/React.createElement(_Text.Text, {
      textType: 'large',
      paletteType: 'label',
      style: {
        color: getColor('t1')
      }
    }, groupMemberCount),
    RightIcon: /*#__PURE__*/React.createElement(_reactNative.View, null, /*#__PURE__*/React.createElement(_Image.Icon, {
      name: 'chevron_right',
      style: {
        height: 20,
        width: 20,
        tintColor: getColor('icon')
      }
    }))
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
  }), isOwner === true ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      height: 12,
      width: '100%',
      backgroundColor: getColor('bg2')
    }
  }), /*#__PURE__*/React.createElement(_ListItem.ListItem, {
    onClicked: onGroupName,
    containerStyle: {
      paddingHorizontal: 16
    },
    LeftName: /*#__PURE__*/React.createElement(_Text.Text, {
      textType: 'medium',
      paletteType: 'title',
      style: {
        color: getColor('fg')
      }
    }, tr('_uikit_info_item_group_name')),
    RightIcon: /*#__PURE__*/React.createElement(_reactNative.View, null, /*#__PURE__*/React.createElement(_Image.Icon, {
      name: 'chevron_right',
      style: {
        height: 20,
        width: 20,
        tintColor: getColor('icon')
      }
    }))
  }), /*#__PURE__*/React.createElement(_ListItem.ListItem, {
    onClicked: onGroupDescription,
    containerStyle: {
      paddingHorizontal: 16
    },
    LeftName: /*#__PURE__*/React.createElement(_Text.Text, {
      textType: 'medium',
      paletteType: 'title',
      style: {
        color: getColor('fg')
      }
    }, tr('_uikit_info_item_group_desc')),
    RightIcon: /*#__PURE__*/React.createElement(_reactNative.View, null, /*#__PURE__*/React.createElement(_Image.Icon, {
      name: 'chevron_right',
      style: {
        height: 20,
        width: 20,
        tintColor: getColor('icon')
      }
    }))
  })) : null), /*#__PURE__*/React.createElement(_Alert.Alert, {
    ref: alertRef
  }), /*#__PURE__*/React.createElement(_BottomSheetMenu.BottomSheetNameMenu, {
    onRequestModalClose: onRequestCloseMenu,
    ref: menuRef
  }), /*#__PURE__*/React.createElement(_Toast.SimpleToast, {
    propsRef: toastRef
  }));
});
exports.GroupInfo = GroupInfo;
//# sourceMappingURL=GroupInfo.js.map