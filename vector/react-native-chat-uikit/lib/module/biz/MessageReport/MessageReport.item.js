import * as React from 'react';
import { View } from 'react-native';
import { useColors } from '../../hook';
import { useI18nContext } from '../../i18n';
import { usePaletteContext } from '../../theme';
import { IconButton } from '../../ui/Button';
import { SingleLineText } from '../../ui/Text';
import { gMessageReportItemHeight } from './MessageReport.const';
export function MessageReportItem(props) {
  const {
    colors
  } = usePaletteContext();
  const {
    tr
  } = useI18nContext();
  const {
    getColor
  } = useColors({
    backgroundColor: {
      light: colors.neutral[98],
      dark: colors.neutral[1]
    },
    color: {
      light: colors.neutral[1],
      dark: colors.neutral[98]
    },
    checked: {
      light: colors.primary[5],
      dark: colors.primary[6]
    },
    unchecked: {
      light: colors.neutral[5],
      dark: colors.neutral[6]
    }
  });
  const {
    data,
    onChecked
  } = props;
  const {
    id,
    title,
    checked
  } = data;
  return /*#__PURE__*/React.createElement(View, {
    key: id,
    style: {
      backgroundColor: getColor('backgroundColor'),
      paddingHorizontal: 16,
      width: '100%',
      height: gMessageReportItemHeight,
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      flexDirection: 'row',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      marginVertical: 10,
      maxWidth: '90%'
    }
  }, /*#__PURE__*/React.createElement(SingleLineText, {
    textType: 'medium',
    paletteType: 'title',
    style: {
      color: getColor('color')
    }
  }, tr(title))), /*#__PURE__*/React.createElement(View, {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(IconButton, {
    iconName: checked === true ? 'radio_ellipse' : 'unchecked_ellipse',
    style: {
      tintColor: checked === true ? getColor('checked') : getColor('unchecked'),
      width: 24,
      height: 24,
      margin: 4
    },
    onPress: () => {
      onChecked === null || onChecked === void 0 ? void 0 : onChecked(checked);
    }
  })));
}
export const MessageReportItemMemo = /*#__PURE__*/React.memo(MessageReportItem);
//# sourceMappingURL=MessageReport.item.js.map