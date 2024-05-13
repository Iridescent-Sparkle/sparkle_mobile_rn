import * as React from 'react';
import { KeyboardAvoidingView, Platform, Pressable, View } from 'react-native';
import { useColors } from '../../hook';
import { useI18nContext } from '../../i18n';
import { usePaletteContext, useThemeContext } from '../../theme';
import { IconButton } from '../../ui/Button';
import { Text } from '../../ui/Text';
import { TextInput } from '../../ui/TextInput';
import { TopNavigationBar } from '../TopNavigationBar';
/**
 * Edit Info Component.
 */
export function EditInfo(props) {
  const {
    containerStyle,
    onBack,
    backName,
    saveName,
    maxLength = 128,
    initialData,
    onSave,
    navigationBarVisible,
    customNavigationBar
  } = props;
  const {} = useI18nContext();
  const inputRef = React.useRef(null);
  const [value, setValue] = React.useState(initialData);
  const [count, setCount] = React.useState((initialData === null || initialData === void 0 ? void 0 : initialData.length) ?? 0);
  const [disable, setDisable] = React.useState(false);
  const {
    style
  } = useThemeContext();
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
    bg2: {
      light: colors.neutral[95],
      dark: colors.neutral[2]
    },
    t1: {
      light: colors.primary[1],
      dark: colors.neutral[98]
    },
    t2: {
      light: colors.neutral[7],
      dark: colors.neutral[6]
    },
    icon: {
      light: colors.neutral[3],
      dark: colors.neutral[95]
    },
    save: {
      light: colors.primary[5],
      dark: colors.primary[6]
    }
  });
  const onValue = React.useCallback(t => {
    if (initialData === t) {
      setDisable(true);
    } else {
      setDisable(false);
    }
    setCount(t.length);
    setValue(t);
  }, [initialData]);
  React.useEffect(() => {
    setValue(initialData);
    setDisable(true);
    setCount((initialData === null || initialData === void 0 ? void 0 : initialData.length) ?? 0);
  }, [initialData]);
  return /*#__PURE__*/React.createElement(View, {
    style: [{
      flexGrow: 1,
      // paddingHorizontal: 12,
      backgroundColor: getColor('bg')
    }, containerStyle]
  }, navigationBarVisible !== false ? customNavigationBar ? /*#__PURE__*/React.createElement(React.Fragment, null, customNavigationBar) : /*#__PURE__*/React.createElement(TopNavigationBar, {
    Left: /*#__PURE__*/React.createElement(View, {
      style: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40
      }
    }, /*#__PURE__*/React.createElement(IconButton, {
      iconName: 'chevron_left',
      style: {
        width: 24,
        height: 24,
        tintColor: getColor('icon')
      },
      onPress: onBack
    }), /*#__PURE__*/React.createElement(Text, {
      textType: 'medium',
      paletteType: 'title',
      style: {
        color: getColor('t1')
      }
    }, backName)),
    Right: /*#__PURE__*/React.createElement(Pressable, {
      disabled: disable,
      style: {},
      onPress: () => {
        onSave === null || onSave === void 0 ? void 0 : onSave(value);
      }
    }, /*#__PURE__*/React.createElement(Text, {
      textType: 'medium',
      paletteType: 'label',
      style: {
        color: getColor(disable !== true ? 'save' : 't2')
      }
    }, saveName))
  }) : null, /*#__PURE__*/React.createElement(KeyboardAvoidingView, {
    style: {
      paddingHorizontal: 12
    }
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      paddingBottom: 22,
      backgroundColor: getColor('bg2')
    }
  }, /*#__PURE__*/React.createElement(TextInput, {
    ref: inputRef,
    numberOfLines: 10,
    multiline: true,
    unitHeight: Platform.OS === 'ios' ? 20 : 20,
    autoFocus: true,
    style: {
      fontSize: 16,
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: 22,
      // fontFamily: fontFamily,
      color: getColor('t1')
      // backgroundColor: 'green',
    },

    containerStyle: {
      marginBottom: 13,
      marginLeft: 16,
      marginRight: 16,
      marginTop: 13,
      // width: '100%',
      minHeight: 36,
      maxHeight: 200
    }
    // onFocus={onFocus}
    // onBlur={onBlur}
    ,
    onChangeText: onValue,
    value: value,
    keyboardAppearance: style === 'light' ? 'light' : 'dark'
    // maxLength={maxLength}
    ,
    statistics: {
      maxCount: maxLength,
      count: count
    }
  }))), /*#__PURE__*/React.createElement(View, {
    style: {
      flexGrow: 1,
      backgroundColor: getColor('bg')
    },
    onTouchEnd: () => {
      var _inputRef$current;
      (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.blur();
    }
  }));
}
//# sourceMappingURL=EditInfo.js.map