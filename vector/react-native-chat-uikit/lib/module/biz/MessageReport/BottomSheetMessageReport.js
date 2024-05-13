import * as React from 'react';
import { useWindowDimensions, View } from 'react-native';
import { g_mask_color } from '../../const';
import { useColors } from '../../hook';
import { useI18nContext } from '../../i18n';
import { usePaletteContext } from '../../theme';
import { SlideModal } from '../../ui/Modal';
import { TabPage } from '../../ui/TabPage';
import { MessageReport } from './MessageReport';

/**
 * Referencing value of the `MessageReport` component.
 */

/**
 * Properties of the `MessageReport` component.
 */

/**
 * Component for reporting messages.
 *
 * It is composed of `SlideModal` and `MessageReport`.
 */
export const BottomSheetMessageReport = /*#__PURE__*/React.forwardRef(function (props, ref) {
  const {
    data,
    containerStyle,
    onReport
  } = props;
  const modalRef = React.useRef({});
  const {
    height: winHeight
  } = useWindowDimensions();
  const height = winHeight * 3 / 5;
  const isUsePanResponder = React.useRef(true);
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
    backgroundColor2: {
      light: colors.neutral[8],
      dark: colors.neutral[3]
    }
  });
  React.useImperativeHandle(ref, () => {
    return {
      startHide: onFinished => {
        var _modalRef$current, _modalRef$current$sta;
        (_modalRef$current = modalRef.current) === null || _modalRef$current === void 0 ? void 0 : (_modalRef$current$sta = _modalRef$current.startHide) === null || _modalRef$current$sta === void 0 ? void 0 : _modalRef$current$sta.call(_modalRef$current, onFinished);
      },
      startShow: () => {
        var _modalRef$current2, _modalRef$current2$st;
        (_modalRef$current2 = modalRef.current) === null || _modalRef$current2 === void 0 ? void 0 : (_modalRef$current2$st = _modalRef$current2.startShow) === null || _modalRef$current2$st === void 0 ? void 0 : _modalRef$current2$st.call(_modalRef$current2);
      }
    };
  }, []);
  return /*#__PURE__*/React.createElement(SlideModal, {
    propsRef: modalRef,
    modalAnimationType: "slide",
    backgroundColor: g_mask_color,
    backgroundTransparent: false,
    onRequestModalClose: () => {
      var _modalRef$current3, _modalRef$current3$st;
      modalRef === null || modalRef === void 0 ? void 0 : (_modalRef$current3 = modalRef.current) === null || _modalRef$current3 === void 0 ? void 0 : (_modalRef$current3$st = _modalRef$current3.startHide) === null || _modalRef$current3$st === void 0 ? void 0 : _modalRef$current3$st.call(_modalRef$current3);
    }
    // onStartShouldSetPanResponder={() => {
    //   return isUsePanResponder.current;
    // }}
    // onMoveShouldSetPanResponder={() => {
    //   return isUsePanResponder.current;
    // }}
    // onRequestModalClose={() => {
    //   ref.current.startHide();
    // }}
  }, /*#__PURE__*/React.createElement(View, {
    style: [{
      height: height,
      backgroundColor: getColor('backgroundColor'),
      alignItems: 'center',
      width: '100%'
    }, containerStyle]
  }, /*#__PURE__*/React.createElement(TabPage, {
    header: {
      HeaderProps: {
        titles: [{
          title: tr('_uikit_report_title')
        }]
      }
    },
    body: {
      type: 'TabPageBody',
      BodyProps: {
        children: [/*#__PURE__*/React.createElement(MessageReport, {
          key: '1',
          requestUseScrollGesture: finished => {
            isUsePanResponder.current = finished;
          },
          onCancel: () => {
            var _modalRef$current4, _modalRef$current4$st;
            (_modalRef$current4 = modalRef.current) === null || _modalRef$current4 === void 0 ? void 0 : (_modalRef$current4$st = _modalRef$current4.startHide) === null || _modalRef$current4$st === void 0 ? void 0 : _modalRef$current4$st.call(_modalRef$current4);
          },
          onReport: onReport,
          data: data
        })]
      }
    },
    headerPosition: "up"
  })));
});
//# sourceMappingURL=BottomSheetMessageReport.js.map