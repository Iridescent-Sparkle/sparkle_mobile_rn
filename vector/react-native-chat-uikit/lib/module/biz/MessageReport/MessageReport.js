function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import { FlatList, Platform, StatusBar, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useI18nContext } from '../../i18n';
import { useThemeContext } from '../../theme';
import { BorderButton, CmnButton } from '../../ui/Button';
import { gBottomSheetHeaderHeight } from '../const';
import { gTabHeaderHeight } from './MessageReport.const';
import { useMessageReportApi, useScrollGesture } from './MessageReport.hooks';
import { MessageReportItemMemo } from './MessageReport.item';

/**
 * Properties of the `MessageReport` component.
 */

/**
 * Component for reporting messages.
 *
 * This component is mainly used for reporting illegal messages.
 *
 * @param props {@link MessageReportProps}
 * @returns JSX.Element
 *
 */
export function MessageReport(props) {
  const {
    requestUseScrollGesture,
    onCancel,
    data: propData,
    onReport,
    height: propsHeight
  } = props;
  const {
    data,
    onUpdate
  } = useMessageReportApi(propData);
  const {
    isScrollingRef,
    handles
  } = useScrollGesture(requestUseScrollGesture);
  const ref = React.useRef({});
  const {
    height: winHeight
  } = useWindowDimensions();
  const {
    cornerRadius
  } = useThemeContext();
  const {
    input
  } = cornerRadius;
  const {
    bottom
  } = useSafeAreaInsets();
  const {
    tr
  } = useI18nContext();
  let height = propsHeight ?? winHeight * 3 / 5 - gBottomSheetHeaderHeight - gTabHeaderHeight - bottom - (StatusBar.currentHeight ?? 0);
  return /*#__PURE__*/React.createElement(View, _extends({
    style: {
      height: height
    }
  }, handles), /*#__PURE__*/React.createElement(FlatList, {
    ref: ref,
    data: data,
    renderItem: info => {
      const {
        item
      } = info;
      return /*#__PURE__*/React.createElement(MessageReportItemMemo, {
        data: item.data,
        onChecked: () => {
          onUpdate(item);
        }
      });
    },
    keyExtractor: item => {
      return item.data.id;
    },
    onMomentumScrollEnd: () => {
      if (Platform.OS !== 'ios') {
        isScrollingRef.current = false;
        requestUseScrollGesture === null || requestUseScrollGesture === void 0 ? void 0 : requestUseScrollGesture(true);
      }
    },
    onResponderEnd: () => {
      if (Platform.OS === 'ios') {
        isScrollingRef.current = false;
        requestUseScrollGesture === null || requestUseScrollGesture === void 0 ? void 0 : requestUseScrollGesture(true);
      }
    }
  }), /*#__PURE__*/React.createElement(View, {
    style: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      paddingVertical: 8
    }
  }, /*#__PURE__*/React.createElement(BorderButton, {
    sizesType: 'large',
    radiusType: input,
    contentType: 'only-text',
    text: tr('cancel'),
    style: {
      width: '42%',
      height: 40
    },
    onPress: onCancel
  }), /*#__PURE__*/React.createElement(CmnButton, {
    sizesType: 'large',
    radiusType: input,
    contentType: 'only-text',
    text: tr('report'),
    style: {
      width: '42%',
      height: 40
    },
    onPress: () => {
      onReport === null || onReport === void 0 ? void 0 : onReport(data.map(v => v.data).filter(v => v.checked === true)[0]);
    }
  })));
}
//# sourceMappingURL=MessageReport.js.map