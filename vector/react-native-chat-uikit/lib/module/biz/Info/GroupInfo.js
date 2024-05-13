import * as React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useColors } from '../../hook';
import { usePaletteContext } from '../../theme';
import { Alert } from '../../ui/Alert';
import { Icon } from '../../ui/Image';
import { CommonSwitch } from '../../ui/Switch';
import { Text } from '../../ui/Text';
import { SimpleToast } from '../../ui/Toast';
import { GroupAvatar } from '../Avatar';
import { BottomSheetNameMenu } from '../BottomSheetMenu';
import { ListItem } from '../ListItem';
import { TopNavigationBar } from '../TopNavigationBar';
import { BlockButtons } from './BlockButtons';
import { useGroupInfo } from './GroupInfo.hooks';
/**
 * Group Info Component.
 *
 * If you are a group administrator, you have more operating rights. If you are an ordinary member, you have no group management rights.
 */
export const GroupInfo = /*#__PURE__*/React.forwardRef(function (props, ref) {
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
  } = useGroupInfo(props, ref);
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
  return /*#__PURE__*/React.createElement(View, {
    style: [{
      flexGrow: 1,
      backgroundColor: getColor('bg')
    }, containerStyle]
  }, navigationBarVisible !== false ? customNavigationBar ? /*#__PURE__*/React.createElement(React.Fragment, null, customNavigationBar) : /*#__PURE__*/React.createElement(TopNavigationBar, {
    Left: /*#__PURE__*/React.createElement(Pressable, {
      style: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        width: 40
      },
      onPress: onBack
    }, /*#__PURE__*/React.createElement(Icon, {
      name: 'chevron_left',
      style: {
        width: 24,
        height: 24,
        tintColor: getColor('icon')
      }
    })),
    Right: /*#__PURE__*/React.createElement(Pressable, {
      style: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center'
      },
      onPress: onMore
    }, /*#__PURE__*/React.createElement(Icon, {
      name: 'ellipsis_vertical',
      style: {
        height: 24,
        width: 24
      }
    }))
  }) : null, /*#__PURE__*/React.createElement(ScrollView, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      alignItems: 'center',
      paddingTop: 20
    }
  }, /*#__PURE__*/React.createElement(GroupAvatar, {
    size: 100,
    url: groupAvatar
  }), /*#__PURE__*/React.createElement(View, {
    style: {
      flexDirection: 'row',
      paddingTop: 12,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Text, {
    textType: 'large',
    paletteType: 'headline',
    style: {
      color: getColor('fg')
    }
  }, groupName ?? groupId), doNotDisturb === true ? /*#__PURE__*/React.createElement(Icon, {
    name: 'bell_slash',
    style: {
      height: 20,
      width: 20,
      tintColor: getColor('t3')
    }
  }) : null), groupDescription ? /*#__PURE__*/React.createElement(Text, {
    textType: 'medium',
    paletteType: 'label',
    style: {
      color: getColor('t2'),
      paddingTop: 4
    }
  }, groupDescription ?? 'test description') : null, /*#__PURE__*/React.createElement(Pressable, {
    style: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 4
    },
    onPress: onCopyId
  }, /*#__PURE__*/React.createElement(Text, {
    textType: 'small',
    paletteType: 'label',
    style: {
      color: getColor('t3')
    }
  }, tr('_uikit_info_item_group_id'), /*#__PURE__*/React.createElement(Text, {
    textType: 'small',
    paletteType: 'label',
    style: {
      color: getColor('t3')
    }
  }, `${groupId}`)), /*#__PURE__*/React.createElement(Icon, {
    name: 'doc_on_doc',
    style: {
      width: 16,
      height: 16,
      tintColor: getColor('t3')
    }
  })), /*#__PURE__*/React.createElement(View, {
    style: {
      height: 20
    }
  }), /*#__PURE__*/React.createElement(BlockButtons, {
    hasAudioCall: hasAudioCall,
    hasSendMessage: hasSendMessage,
    hasVideoCall: hasVideoCall,
    onSendMessage: onSendMessage,
    onAudioCall: onAudioCall,
    onVideoCall: onVideoCall,
    onInitButton: onInitButton
  })), /*#__PURE__*/React.createElement(View, {
    style: {
      height: 20
    }
  }), /*#__PURE__*/React.createElement(ListItem, {
    onClicked: onParticipant,
    containerStyle: {
      paddingHorizontal: 16
    },
    LeftName: /*#__PURE__*/React.createElement(Text, {
      textType: 'medium',
      paletteType: 'title',
      style: {
        color: getColor('fg')
      }
    }, tr('_uikit_info_item_member')),
    RightText: /*#__PURE__*/React.createElement(Text, {
      textType: 'large',
      paletteType: 'label',
      style: {
        color: getColor('t1')
      }
    }, groupMemberCount),
    RightIcon: /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(Icon, {
      name: 'chevron_right',
      style: {
        height: 20,
        width: 20,
        tintColor: getColor('icon')
      }
    }))
  }), /*#__PURE__*/React.createElement(View, {
    style: {
      height: 12,
      width: '100%',
      backgroundColor: getColor('bg2')
    }
  }), /*#__PURE__*/React.createElement(ListItem, {
    containerStyle: {
      paddingHorizontal: 16
    },
    LeftName: /*#__PURE__*/React.createElement(Text, {
      textType: 'medium',
      paletteType: 'title',
      style: {
        color: getColor('fg')
      }
    }, tr('_uikit_info_not_disturb')),
    RightIcon: /*#__PURE__*/React.createElement(View, null, doNotDisturb !== undefined ? /*#__PURE__*/React.createElement(CommonSwitch, {
      height: 31,
      width: 51,
      value: doNotDisturb,
      onValueChange: onDoNotDisturb
    }) : null)
  }), /*#__PURE__*/React.createElement(ListItem, {
    onClicked: onClearChat,
    containerStyle: {
      paddingHorizontal: 16
    },
    LeftName: /*#__PURE__*/React.createElement(Text, {
      textType: 'medium',
      paletteType: 'title',
      style: {
        color: getColor('fg')
      }
    }, tr('_uikit_info_clear_msg'))
  }), isOwner === true ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(View, {
    style: {
      height: 12,
      width: '100%',
      backgroundColor: getColor('bg2')
    }
  }), /*#__PURE__*/React.createElement(ListItem, {
    onClicked: onGroupName,
    containerStyle: {
      paddingHorizontal: 16
    },
    LeftName: /*#__PURE__*/React.createElement(Text, {
      textType: 'medium',
      paletteType: 'title',
      style: {
        color: getColor('fg')
      }
    }, tr('_uikit_info_item_group_name')),
    RightIcon: /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(Icon, {
      name: 'chevron_right',
      style: {
        height: 20,
        width: 20,
        tintColor: getColor('icon')
      }
    }))
  }), /*#__PURE__*/React.createElement(ListItem, {
    onClicked: onGroupDescription,
    containerStyle: {
      paddingHorizontal: 16
    },
    LeftName: /*#__PURE__*/React.createElement(Text, {
      textType: 'medium',
      paletteType: 'title',
      style: {
        color: getColor('fg')
      }
    }, tr('_uikit_info_item_group_desc')),
    RightIcon: /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(Icon, {
      name: 'chevron_right',
      style: {
        height: 20,
        width: 20,
        tintColor: getColor('icon')
      }
    }))
  })) : null), /*#__PURE__*/React.createElement(Alert, {
    ref: alertRef
  }), /*#__PURE__*/React.createElement(BottomSheetNameMenu, {
    onRequestModalClose: onRequestCloseMenu,
    ref: menuRef
  }), /*#__PURE__*/React.createElement(SimpleToast, {
    propsRef: toastRef
  }));
});
//# sourceMappingURL=GroupInfo.js.map