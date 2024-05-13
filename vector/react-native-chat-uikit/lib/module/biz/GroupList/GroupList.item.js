import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useColors } from '../../hook';
import { usePaletteContext } from '../../theme';
import { SingleLineText } from '../../ui/Text';
import { GroupAvatar } from '../Avatar';
/**
 * Group List Item Component.
 */
export function GroupListItem(props) {
  const {
    data,
    onClicked,
    onLongPressed
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
  return /*#__PURE__*/React.createElement(Pressable, {
    style: {
      backgroundColor: getColor('bg')
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
      height: 59.5,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16
    }
  }, /*#__PURE__*/React.createElement(GroupAvatar, {
    url: data.groupAvatar,
    size: 40
  }), /*#__PURE__*/React.createElement(View, {
    style: {
      flexDirection: 'column',
      flexGrow: 1,
      paddingLeft: 12,
      maxWidth: '80%'
    }
  }, /*#__PURE__*/React.createElement(SingleLineText, {
    paletteType: 'title',
    textType: 'medium'
  }, data.groupName === undefined || data.groupName.length === 0 ? data.groupId : data.groupName))), /*#__PURE__*/React.createElement(View, {
    style: {
      width: '100%',
      borderBottomWidth: 0.5,
      borderBottomColor: getColor('divider'),
      marginLeft: 78
    }
  }));
}
export const GroupListItemMemo = /*#__PURE__*/React.memo(GroupListItem);
//# sourceMappingURL=GroupList.item.js.map