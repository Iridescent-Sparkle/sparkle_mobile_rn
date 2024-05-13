import * as React from 'react';
import { Pressable, View } from 'react-native';
import { getNewRequest } from '../../chat/utils';
import { useColors } from '../../hook';
import { useI18nContext } from '../../i18n';
import { usePaletteContext, useThemeContext } from '../../theme';
import { CmnButton } from '../../ui/Button';
import { SingleLineText } from '../../ui/Text';
import { Avatar } from '../Avatar';
/**
 * New Requests Item Component.
 */
export function NewRequestsItem(props) {
  var _getNewRequest;
  const {
    onClicked,
    onLongPressed,
    onButtonClicked,
    data
  } = props;
  const {
    cornerRadius
  } = useThemeContext();
  const {
    input
  } = cornerRadius;
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
    pin_bg: {
      light: colors.neutral[9],
      dark: colors.neutral[6]
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
  }, /*#__PURE__*/React.createElement(Avatar, {
    url: data.avatar,
    size: 40
  }), /*#__PURE__*/React.createElement(View, {
    style: {
      flexDirection: 'column',
      flexGrow: 1,
      paddingLeft: 12,
      maxWidth: '65%'
    }
  }, /*#__PURE__*/React.createElement(SingleLineText, {
    paletteType: 'title',
    textType: 'medium',
    style: {
      color: getColor('t1')
    }
  }, data.name ?? data.requestId), /*#__PURE__*/React.createElement(SingleLineText, {
    paletteType: 'title',
    textType: 'small',
    style: {
      color: getColor('t2')
    }
  }, tr(((_getNewRequest = getNewRequest(data.msg)) === null || _getNewRequest === void 0 ? void 0 : _getNewRequest.tip) ?? ''))), /*#__PURE__*/React.createElement(View, {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(View, {
    style: {
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement(CmnButton, {
    sizesType: 'small',
    radiusType: input,
    contentType: 'only-text',
    style: {
      height: 28,
      width: 74
    },
    text: tr('add'),
    onPress: () => {
      onButtonClicked === null || onButtonClicked === void 0 ? void 0 : onButtonClicked(data);
    }
  }))), /*#__PURE__*/React.createElement(View, {
    style: {
      width: '100%',
      borderBottomWidth: 0.5,
      borderBottomColor: getColor('divider'),
      marginLeft: 68
    }
  }));
}
export const NewRequestsItemMemo = /*#__PURE__*/React.memo(NewRequestsItem);
//# sourceMappingURL=NewRequests.item.js.map