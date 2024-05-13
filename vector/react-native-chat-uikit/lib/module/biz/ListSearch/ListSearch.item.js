import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useColors } from '../../hook';
import { usePaletteContext } from '../../theme';
import { IconButton } from '../../ui/Button';
import { HighText } from '../../ui/Text';
import { Avatar } from '../Avatar';
export function ListSearchItem(props) {
  const {
    searchType
  } = props;
  if (searchType === 'create-group' || searchType === 'add-group-member') {
    const p = props;
    return /*#__PURE__*/React.createElement(StateListSearchItem, p);
  }
  return /*#__PURE__*/React.createElement(DefaultListSearchItem, props);
}
export function DefaultListSearchItem(props) {
  const {
    data,
    keyword,
    onClicked
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
    }
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      width: '100%',
      height: 75.5,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    url: data.avatar,
    size: 50
  }), /*#__PURE__*/React.createElement(HighText, {
    paletteType: 'title',
    textType: 'medium',
    containerStyle: {
      flexDirection: 'row',
      flexGrow: 1,
      paddingLeft: 12
    },
    keyword: keyword,
    content: data.name ?? data.id
  })), /*#__PURE__*/React.createElement(View, {
    style: {
      width: '100%',
      borderBottomWidth: 0.5,
      borderBottomColor: getColor('divider'),
      marginLeft: 78
    }
  }));
}
export function StateListSearchItem(props) {
  const {
    data,
    keyword,
    onClicked
  } = props;
  const {
    checked,
    onCheckClicked,
    disable
  } = data;
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
  return /*#__PURE__*/React.createElement(Pressable, {
    style: {
      backgroundColor: getColor('bg')
    },
    onPress: () => {
      if (checked !== undefined) {
        if (disable !== true) {
          onCheckClicked === null || onCheckClicked === void 0 ? void 0 : onCheckClicked(data);
        }
      } else {
        onClicked === null || onClicked === void 0 ? void 0 : onClicked(data);
      }
    }
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      width: '100%',
      height: 75.5,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16
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
      tintColor: getColor(checked === true && disable !== true ? 'enable' : 'disable')
    },
    onPress: () => {
      if (disable !== true) {
        onCheckClicked === null || onCheckClicked === void 0 ? void 0 : onCheckClicked(data);
      }
    }
  })) : null, /*#__PURE__*/React.createElement(Avatar, {
    url: data.avatar,
    size: 50
  }), /*#__PURE__*/React.createElement(HighText, {
    paletteType: 'title',
    textType: 'medium',
    containerStyle: {
      flexDirection: 'row',
      flexGrow: 1,
      paddingLeft: 12
    },
    keyword: keyword,
    content: data.name ?? data.userId
  })), /*#__PURE__*/React.createElement(View, {
    style: {
      width: '100%',
      borderBottomWidth: 0.5,
      borderBottomColor: getColor('divider'),
      marginLeft: 78
    }
  }));
}
//# sourceMappingURL=ListSearch.item.js.map