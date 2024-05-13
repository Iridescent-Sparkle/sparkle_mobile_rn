import * as React from 'react';
import { Platform, useWindowDimensions, View } from 'react-native';
import { useConfigContext } from '../../config';
import { ErrorCode, UIKitError } from '../../error';
import { useColors, useGetStyleProps } from '../../hook';
import { usePaletteContext, useThemeContext } from '../../theme';
import { SlideModal } from '../Modal';
import { Text } from '../Text';
import { TextInput } from '../TextInput';
import { useAlert } from './Alert.hooks';
export const Alert = /*#__PURE__*/React.forwardRef((props, ref) => {
  const {
    containerStyle
  } = props;
  const modalRef = React.useRef({});
  const {
    width: winWidth
  } = useWindowDimensions();
  const {
    style: themeStyle,
    cornerRadius: corner
  } = useThemeContext();
  const {
    colors,
    cornerRadius
  } = usePaletteContext();
  const {
    getBorderRadius
  } = useGetStyleProps();
  const {
    fontFamily
  } = useConfigContext();
  const {
    getColor
  } = useColors({
    bg: {
      light: colors.neutral[98],
      dark: colors.neutral[1]
    },
    bg2: {
      light: colors.neutral[95],
      dark: colors.neutral[2]
    },
    text: {
      light: colors.neutral[1],
      dark: colors.neutral[98]
    },
    text2: {
      light: colors.neutral[7],
      dark: colors.neutral[6]
    }
  });
  const isShow = React.useRef(false);
  const onRequestModalClose = React.useCallback(() => {
    var _modalRef$current, _modalRef$current$sta;
    modalRef === null || modalRef === void 0 ? void 0 : (_modalRef$current = modalRef.current) === null || _modalRef$current === void 0 ? void 0 : (_modalRef$current$sta = _modalRef$current.startHide) === null || _modalRef$current$sta === void 0 ? void 0 : _modalRef$current$sta.call(_modalRef$current);
  }, []);
  const {
    props: updatedProps,
    getButton,
    onUpdate,
    value,
    onChangeText,
    setTextCount,
    textCount
  } = useAlert(props);
  const {
    buttons,
    message,
    title,
    supportInput = false,
    supportInputStatistics,
    inputMaxCount,
    isSaveInput = true,
    enableClearButton = false,
    autoFocus
  } = updatedProps;
  const count = (buttons === null || buttons === void 0 ? void 0 : buttons.length) ?? 1;
  if (count > 3) {
    throw new UIKitError({
      code: ErrorCode.max_count,
      desc: 'Alert buttons count must less than 3'
    });
  }
  React.useImperativeHandle(ref, () => {
    return {
      alert: () => {
        var _modalRef$current2, _modalRef$current2$st;
        isShow.current = true;
        modalRef === null || modalRef === void 0 ? void 0 : (_modalRef$current2 = modalRef.current) === null || _modalRef$current2 === void 0 ? void 0 : (_modalRef$current2$st = _modalRef$current2.startShow) === null || _modalRef$current2$st === void 0 ? void 0 : _modalRef$current2$st.call(_modalRef$current2);
      },
      alertWithInit: props => {
        isShow.current = true;
        onUpdate(props);
      },
      close: onFinished => {
        var _modalRef$current3, _modalRef$current3$st;
        isShow.current = false;
        if (isSaveInput === false) {
          onChangeText === null || onChangeText === void 0 ? void 0 : onChangeText('');
        }
        modalRef === null || modalRef === void 0 ? void 0 : (_modalRef$current3 = modalRef.current) === null || _modalRef$current3 === void 0 ? void 0 : (_modalRef$current3$st = _modalRef$current3.startHide) === null || _modalRef$current3$st === void 0 ? void 0 : _modalRef$current3$st.call(_modalRef$current3, onFinished);
      }
    };
  }, [isSaveInput, onChangeText, onUpdate]);
  React.useEffect(() => {
    if (isShow.current === true) {
      var _modalRef$current4, _modalRef$current4$st;
      modalRef === null || modalRef === void 0 ? void 0 : (_modalRef$current4 = modalRef.current) === null || _modalRef$current4 === void 0 ? void 0 : (_modalRef$current4$st = _modalRef$current4.startShow) === null || _modalRef$current4$st === void 0 ? void 0 : _modalRef$current4$st.call(_modalRef$current4);
    }
  }, [updatedProps]);
  return /*#__PURE__*/React.createElement(SlideModal, {
    propsRef: modalRef,
    modalAnimationType: 'fade',
    onRequestModalClose: onRequestModalClose,
    modalStyle: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    enableSlideComponent: false,
    enabledKeyboardAdjust: true
  }, /*#__PURE__*/React.createElement(View, {
    style: [{
      backgroundColor: getColor('bg'),
      paddingHorizontal: 16,
      paddingTop: 24,
      paddingBottom: 16,
      borderRadius: getBorderRadius({
        height: 32,
        crt: corner.alert,
        cr: cornerRadius,
        style: containerStyle
      }),
      width: winWidth - 50,
      alignItems: 'center'
    }, containerStyle]
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Text, {
    textType: 'large',
    paletteType: 'title',
    style: {
      color: getColor('text')
    }
  }, title)), message ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(View, {
    style: {
      height: 12
    }
  }), /*#__PURE__*/React.createElement(View, {
    style: {
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Text, {
    textType: 'medium',
    paletteType: 'label',
    style: {
      color: getColor('text')
    }
  }, message))) : null, /*#__PURE__*/React.createElement(View, {
    style: {
      height: 24
    }
  }), supportInput === true ? /*#__PURE__*/React.createElement(View, {
    style: {
      width: '100%',
      minHeight: supportInputStatistics === true ? 48 + 22 : 48,
      paddingBottom: supportInputStatistics === true ? 22 : undefined,
      backgroundColor: getColor('bg2'),
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(TextInput, {
    value: value,
    onChangeText: onChangeText,
    keyboardAppearance: themeStyle === 'light' ? 'light' : 'dark',
    containerStyle: {
      backgroundColor: getColor('bg2'),
      justifyContent: 'center',
      // borderRadius: getBorderRadius({
      //   height: 48,
      //   crt: corner.input,
      //   cr: cornerRadius,
      //   style: containerStyle,
      // }),
      // minHeight: 48,
      width: '100%',
      minHeight: 36,
      paddingVertical: 7,
      maxHeight: Platform.OS === 'ios' ? 96 : 96
    },
    style: {
      paddingHorizontal: 20,
      fontSize: 16,
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: 22,
      fontFamily: fontFamily
    },
    numberOfLines: 4,
    multiline: true,
    unitHeight: Platform.OS === 'ios' ? 24 : 22,
    statistics: supportInputStatistics === true ? {
      count: textCount,
      maxCount: inputMaxCount ?? 200,
      onCountChange: setTextCount,
      textStyles: {
        color: getColor('text2'),
        paddingRight: 12
      }
    } : undefined,
    enableClearButton: enableClearButton,
    autoFocus: autoFocus
  })) : null, supportInput === true ? /*#__PURE__*/React.createElement(View, {
    style: {
      height: 24
    }
  }) : null, /*#__PURE__*/React.createElement(View, {
    style: {
      width: '100%',
      minHeight: 1
    }
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      flexDirection: count === 2 ? 'row' : 'column',
      justifyContent: count === 2 ? 'space-between' : 'center',
      alignItems: count === 2 ? undefined : 'center',
      // backgroundColor: 'red',
      flexGrow: count === 2 ? 1 : undefined
    }
  }, getButton(buttons, onRequestModalClose)))));
});
//# sourceMappingURL=Alert.js.map