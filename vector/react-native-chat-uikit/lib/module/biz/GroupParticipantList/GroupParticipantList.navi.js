import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useChatContext } from '../../chat';
import { useColors } from '../../hook';
import { useI18nContext } from '../../i18n';
import { usePaletteContext } from '../../theme';
import { IconButton } from '../../ui/Button';
import { Icon } from '../../ui/Image';
import { Text } from '../../ui/Text';
import { TopNavigationBar } from '../TopNavigationBar';
export const GroupParticipantListNavigationBar = props => {
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
  } = useI18nContext();
  const im = useChatContext();
  const isOwner = ownerId === im.userId;
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
    return /*#__PURE__*/React.createElement(TopNavigationBar, {
      Left: /*#__PURE__*/React.createElement(Pressable, {
        style: {
          flexDirection: 'row',
          alignItems: 'center',
          height: 40
        },
        onPress: onBack
      }, /*#__PURE__*/React.createElement(Icon, {
        name: 'chevron_left',
        style: {
          width: 24,
          height: 24,
          tintColor: getColor('icon')
        }
      }), /*#__PURE__*/React.createElement(Text, {
        textType: 'medium',
        paletteType: 'label',
        style: {
          color: getColor('text')
        }
      }, tr('_uikit_group_del_member_title'))),
      Right: isOwner === true ? /*#__PURE__*/React.createElement(Pressable, {
        style: {
          flexDirection: 'row'
        },
        onPress: onDelParticipant
      }, /*#__PURE__*/React.createElement(Text, {
        textType: 'medium',
        paletteType: 'label',
        style: {
          color: getColor(deleteCount === 0 ? 'text_disable' : 'text_enable')
        }
      }, tr('_uikit_group_del_member_button', deleteCount))) : null
    });
  } else if (participantType === 'change-owner') {
    return /*#__PURE__*/React.createElement(TopNavigationBar, {
      Left: isOwner === true ? /*#__PURE__*/React.createElement(Pressable, {
        style: {
          flexDirection: 'row',
          alignItems: 'center',
          height: 40
        },
        onPress: onBack
      }, /*#__PURE__*/React.createElement(Icon, {
        name: 'chevron_left',
        style: {
          width: 24,
          height: 24,
          tintColor: getColor('icon')
        }
      }), /*#__PURE__*/React.createElement(Text, {
        textType: 'medium',
        paletteType: 'label',
        style: {
          color: getColor('text')
        }
      }, tr('_uikit_group_change_owner_title'))) : null,
      Right: /*#__PURE__*/React.createElement(View, {
        style: {
          width: 1,
          height: 1
        }
      })
    });
  } else if (participantType === 'mention') {
    return /*#__PURE__*/React.createElement(TopNavigationBar, {
      Left: /*#__PURE__*/React.createElement(Pressable, {
        style: {
          flexDirection: 'row',
          alignItems: 'center',
          height: 40
        },
        onPress: onBack
      }, /*#__PURE__*/React.createElement(Icon, {
        name: 'chevron_left',
        style: {
          width: 24,
          height: 24,
          tintColor: getColor('icon')
        }
      }), /*#__PURE__*/React.createElement(Text, {
        textType: 'medium',
        paletteType: 'label',
        style: {
          color: getColor('text')
        }
      }, `@ mention`)),
      Right: /*#__PURE__*/React.createElement(View, {
        style: {
          width: 1,
          height: 1
        }
      })
    });
  } else {
    return /*#__PURE__*/React.createElement(TopNavigationBar, {
      Left: /*#__PURE__*/React.createElement(Pressable, {
        style: {
          flexDirection: 'row',
          alignItems: 'center',
          height: 40
        },
        onPress: onBack
      }, /*#__PURE__*/React.createElement(Icon, {
        name: 'chevron_left',
        style: {
          width: 24,
          height: 24,
          tintColor: getColor('icon')
        }
      }), /*#__PURE__*/React.createElement(Text, null, tr('_uikit_group_member_list_title', participantCount))),
      Right: isOwner === true ? /*#__PURE__*/React.createElement(View, {
        style: {
          flexDirection: 'row'
        }
      }, /*#__PURE__*/React.createElement(Pressable, {
        style: {
          padding: 6
        }
      }, /*#__PURE__*/React.createElement(IconButton, {
        iconName: 'person_add',
        style: {
          width: 24,
          height: 24
        },
        onPress: onClickedAddParticipant
      })), /*#__PURE__*/React.createElement(View, {
        style: {
          width: 4
        }
      }), /*#__PURE__*/React.createElement(Pressable, {
        style: {
          padding: 6
        }
      }, /*#__PURE__*/React.createElement(IconButton, {
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
//# sourceMappingURL=GroupParticipantList.navi.js.map