import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColors } from '../../hook';
import { usePaletteContext } from '../../theme';
import { SlideModal } from '../../ui/Modal';
import { VoiceBar } from './VoiceBar';
export const BottomVoiceBar = /*#__PURE__*/React.forwardRef(function (props, ref) {
  const {
    onRequestModalClose,
    ...others
  } = props;
  const modalRef = React.useRef({});
  const {
    colors
  } = usePaletteContext();
  const {
    getColor
  } = useColors({
    bg: {
      light: colors.neutral[98],
      dark: colors.neutral[1]
    }
  });
  React.useImperativeHandle(ref, () => {
    return {
      startHide: onFinished => {
        var _modalRef$current, _modalRef$current$sta;
        modalRef === null || modalRef === void 0 ? void 0 : (_modalRef$current = modalRef.current) === null || _modalRef$current === void 0 ? void 0 : (_modalRef$current$sta = _modalRef$current.startHide) === null || _modalRef$current$sta === void 0 ? void 0 : _modalRef$current$sta.call(_modalRef$current, onFinished);
      },
      startShow: () => {
        var _modalRef$current2, _modalRef$current2$st;
        modalRef === null || modalRef === void 0 ? void 0 : (_modalRef$current2 = modalRef.current) === null || _modalRef$current2 === void 0 ? void 0 : (_modalRef$current2$st = _modalRef$current2.startShow) === null || _modalRef$current2$st === void 0 ? void 0 : _modalRef$current2$st.call(_modalRef$current2);
      }
    };
  }, []);
  return /*#__PURE__*/React.createElement(SlideModal, {
    propsRef: modalRef,
    modalAnimationType: 'slide',
    onRequestModalClose: onRequestModalClose,
    enableSlideComponent: false
  }, /*#__PURE__*/React.createElement(SafeAreaView, {
    style: {
      backgroundColor: getColor('bg'),
      alignItems: 'center',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement(VoiceBar, others)));
});
//# sourceMappingURL=BottomVoiceBar.js.map