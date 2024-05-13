import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useColors } from '../../hook';
import { useI18nContext } from '../../i18n';
import { usePaletteContext } from '../../theme';
import { IconButton } from '../../ui/Button';
import { Text } from '../../ui/Text';
import { Avatar } from '../Avatar';
import { TopNavigationBar, TopNavigationBarRight, TopNavigationBarTitle } from '../TopNavigationBar';
export const ContactListNavigationBar = props => {
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
  } = useI18nContext();
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
    return /*#__PURE__*/React.createElement(TopNavigationBar, {
      Left: /*#__PURE__*/React.createElement(View, {
        style: {
          flexDirection: 'row'
        }
      }, /*#__PURE__*/React.createElement(Avatar, {
        url: avatarUrl,
        size: 32
      })),
      Right: TopNavigationBarRight,
      RightProps: {
        onClicked: onClickedNewContact,
        iconName: 'person_add'
      },
      Title: TopNavigationBarTitle({
        text: 'Contacts'
      })
    });
  } else if (contactType === 'new-conversation') {
    return /*#__PURE__*/React.createElement(TopNavigationBar, {
      Left: /*#__PURE__*/React.createElement(Pressable, {
        style: {
          flexDirection: 'row'
        },
        onPress: onBack
      }, /*#__PURE__*/React.createElement(Text, {
        paletteType: 'label',
        textType: 'medium',
        style: {
          color: getColor('icon')
        }
      }, tr('cancel'))),
      Right: /*#__PURE__*/React.createElement(View, {
        style: {
          width: 32,
          height: 32
        }
      }),
      Title: TopNavigationBarTitle({
        text: tr('_uikit_new_conv_title')
      })
    });
  } else if (contactType === 'create-group') {
    return /*#__PURE__*/React.createElement(TopNavigationBar, {
      Left: /*#__PURE__*/React.createElement(Pressable, {
        style: {
          flexDirection: 'row',
          alignItems: 'center',
          height: 40
        },
        onPress: onBack
      }, /*#__PURE__*/React.createElement(IconButton, {
        iconName: 'chevron_left',
        style: {
          width: 24,
          height: 24,
          tintColor: getColor('icon')
        }
      }), /*#__PURE__*/React.createElement(Text, {
        paletteType: 'title',
        textType: 'medium',
        style: {
          color: getColor('text')
        }
      }, tr('_uikit_create_group_title'))),
      Right: /*#__PURE__*/React.createElement(Pressable, {
        onPress: onClickedCreateGroup,
        disabled: selectedCount && selectedCount > 0 ? false : true
      }, /*#__PURE__*/React.createElement(Text, {
        paletteType: 'label',
        textType: 'medium',
        style: {
          color: getColor(selectedCount === 0 ? 'text_disable' : 'text_enable')
        }
      }, tr('_uikit_create_group_button', selectedCount))),
      Title: TopNavigationBarTitle({
        text: ''
      })
    });
  } else if (contactType === 'add-group-member') {
    return /*#__PURE__*/React.createElement(TopNavigationBar, {
      Left: /*#__PURE__*/React.createElement(Pressable, {
        style: {
          flexDirection: 'row',
          alignItems: 'center',
          height: 40
        },
        onPress: onBack
      }, /*#__PURE__*/React.createElement(IconButton, {
        iconName: 'chevron_left',
        style: {
          width: 24,
          height: 24,
          tintColor: getColor('icon')
        }
      }), /*#__PURE__*/React.createElement(Text, {
        paletteType: 'title',
        textType: 'medium',
        style: {
          color: getColor('text')
        }
      }, tr('_uikit_add_group_member_title'))),
      Right: /*#__PURE__*/React.createElement(Pressable, {
        onPress: onClickedAddGroupParticipant,
        disabled: selectedMemberCount && selectedMemberCount > 0 ? false : true
      }, /*#__PURE__*/React.createElement(Text, {
        paletteType: 'label',
        textType: 'medium',
        style: {
          color: getColor(selectedMemberCount === 0 ? 'text_disable' : 'text_enable')
        }
      }, tr('_uikit_add_group_member_button', selectedMemberCount))),
      Title: TopNavigationBarTitle({
        text: ''
      })
    });
  } else if (contactType === 'share-contact') {
    return /*#__PURE__*/React.createElement(TopNavigationBar, {
      Left: /*#__PURE__*/React.createElement(Pressable, {
        style: {
          flexDirection: 'row'
        },
        onPress: onBack
      }, /*#__PURE__*/React.createElement(Text, {
        paletteType: 'label',
        textType: 'medium',
        style: {
          color: getColor('icon')
        }
      }, tr('cancel'))),
      Right: /*#__PURE__*/React.createElement(View, {
        style: {
          width: 32,
          height: 32
        }
      }),
      Title: TopNavigationBarTitle({
        text: tr('_uikit_share_card_title')
      })
    });
  } else {
    return null;
  }
};
//# sourceMappingURL=ContactList.navi.js.map