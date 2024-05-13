import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useColors } from '../../hook';
import { usePaletteContext } from '../../theme';
import { IconButton } from '../../ui/Button';
import { Icon } from '../../ui/Image';
import { SingleLineText } from '../../ui/Text';
import { Avatar } from '../Avatar';
import { ListItem } from '../ListItem';
/**
 * Contact list item component.
 */
export function ContactListItem(props) {
  const {
    section,
    onClicked,
    onCheckClicked,
    onLongPressed
  } = props;
  const {
    checked,
    disable
  } = section;
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
    t1: {
      light: colors.neutral[1],
      dark: colors.neutral[98]
    },
    t2: {
      light: colors.neutral[5],
      dark: colors.neutral[6]
    },
    divider: {
      light: colors.neutral[9],
      dark: colors.neutral[2]
    },
    disable: {
      light: colors.neutral[7],
      dark: colors.neutral[4]
    },
    enable: {
      light: colors.primary[5],
      dark: colors.primary[6]
    }
  });
  return /*#__PURE__*/React.createElement(View, {
    style: {
      backgroundColor: getColor('bg')
    }
  }, /*#__PURE__*/React.createElement(Pressable, {
    style: {
      width: '100%',
      height: 59.5,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16
    },
    onPress: () => {
      if (checked !== undefined) {
        if (disable !== true) {
          onCheckClicked === null || onCheckClicked === void 0 ? void 0 : onCheckClicked(section);
        }
      } else {
        onClicked === null || onClicked === void 0 ? void 0 : onClicked(section);
      }
    },
    onLongPress: () => {
      onLongPressed === null || onLongPressed === void 0 ? void 0 : onLongPressed(section);
    }
  }, checked !== undefined ? /*#__PURE__*/React.createElement(View, {
    style: {
      marginRight: 12
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    iconName: checked !== false ? 'checked_rectangle' : 'unchecked_rectangle',
    style: {
      height: 28,
      width: 28,
      tintColor: getColor(checked !== false && disable !== true ? 'enable' : 'disable')
    },
    onPress: () => {
      if (disable !== true) {
        onCheckClicked === null || onCheckClicked === void 0 ? void 0 : onCheckClicked(section);
      }
    }
  })) : null, /*#__PURE__*/React.createElement(Avatar, {
    url: section.userAvatar,
    size: 40
  }), /*#__PURE__*/React.createElement(View, {
    style: {
      flexGrow: 1,
      paddingLeft: 12,
      maxWidth: checked !== undefined ? '70%' : '80%'
    }
  }, /*#__PURE__*/React.createElement(SingleLineText, {
    paletteType: 'title',
    textType: 'medium',
    style: {
      color: getColor('t1')
    }
  }, section.userName ?? section.userId))), /*#__PURE__*/React.createElement(View, {
    style: {
      width: '100%',
      borderBottomWidth: 0.5,
      borderBottomColor: getColor('divider'),
      marginLeft: 68
    }
  }));
}
export const ContactListItemMemo = /*#__PURE__*/React.memo(ContactListItem);

/**
 * Contact list item header component.
 */
export function ContactListItemHeader(props) {
  const {
    indexTitle
  } = props;
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
    t1: {
      light: colors.neutral[1],
      dark: colors.neutral[98]
    },
    t2: {
      light: colors.neutral[5],
      dark: colors.neutral[6]
    },
    divider: {
      light: colors.neutral[9],
      dark: colors.neutral[2]
    }
  });
  return /*#__PURE__*/React.createElement(View, {
    style: [{
      backgroundColor: getColor('bg')
    }]
  }, /*#__PURE__*/React.createElement(View, {
    style: [{
      height: 32,
      justifyContent: 'center',
      paddingLeft: 16
    }]
  }, /*#__PURE__*/React.createElement(SingleLineText, {
    paletteType: 'title',
    textType: 'small',
    style: {
      color: getColor('t2')
    }
  }, indexTitle)));
}
export const ContactListItemHeaderMemo = /*#__PURE__*/React.memo(ContactListItemHeader);

/**
 * Contact list item header component.
 */
export function ContactItem(props) {
  const {
    icon,
    name,
    count,
    hasArrow,
    onClicked
  } = props;
  const {
    colors
  } = usePaletteContext();
  const {
    getColor
  } = useColors({
    bg: {
      light: colors.neutral[1],
      dark: colors.neutral[98]
    },
    icon: {
      light: colors.neutral[6],
      dark: colors.neutral[5]
    }
  });
  return /*#__PURE__*/React.createElement(ListItem, {
    LeftName: /*#__PURE__*/React.createElement(View, {
      style: {
        flexDirection: 'row',
        alignItems: 'center'
      }
    }, icon ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
      name: icon,
      style: {
        height: 18,
        width: 18
      }
    }), /*#__PURE__*/React.createElement(View, {
      style: {
        width: 13
      }
    })) : null, /*#__PURE__*/React.createElement(SingleLineText, {
      paletteType: 'title',
      textType: 'medium',
      style: {
        color: getColor('bg')
      }
    }, name)),
    RightText: count,
    RightIcon: hasArrow ? /*#__PURE__*/React.createElement(Icon, {
      name: 'chevron_right',
      style: {
        height: 20,
        width: 20,
        tintColor: getColor('icon')
      }
    }) : undefined,
    onClicked: onClicked,
    containerStyle: {
      marginHorizontal: 16
    }
  });
}
//# sourceMappingURL=ContactList.item.js.map