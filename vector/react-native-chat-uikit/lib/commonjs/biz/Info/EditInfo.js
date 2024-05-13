"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditInfo = EditInfo;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _hook = require("../../hook");
var _i18n = require("../../i18n");
var _theme = require("../../theme");
var _Button = require("../../ui/Button");
var _Text = require("../../ui/Text");
var _TextInput = require("../../ui/TextInput");
var _TopNavigationBar = require("../TopNavigationBar");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Edit Info Component.
 */
function EditInfo(props) {
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
  const {} = (0, _i18n.useI18nContext)();
  const inputRef = React.useRef(null);
  const [value, setValue] = React.useState(initialData);
  const [count, setCount] = React.useState((initialData === null || initialData === void 0 ? void 0 : initialData.length) ?? 0);
  const [disable, setDisable] = React.useState(false);
  const {
    style
  } = (0, _theme.useThemeContext)();
  const {
    colors
  } = (0, _theme.usePaletteContext)();
  const {
    getColor
  } = (0, _hook.useColors)({
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
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [{
      flexGrow: 1,
      // paddingHorizontal: 12,
      backgroundColor: getColor('bg')
    }, containerStyle]
  }, navigationBarVisible !== false ? customNavigationBar ? /*#__PURE__*/React.createElement(React.Fragment, null, customNavigationBar) : /*#__PURE__*/React.createElement(_TopNavigationBar.TopNavigationBar, {
    Left: /*#__PURE__*/React.createElement(_reactNative.View, {
      style: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40
      }
    }, /*#__PURE__*/React.createElement(_Button.IconButton, {
      iconName: 'chevron_left',
      style: {
        width: 24,
        height: 24,
        tintColor: getColor('icon')
      },
      onPress: onBack
    }), /*#__PURE__*/React.createElement(_Text.Text, {
      textType: 'medium',
      paletteType: 'title',
      style: {
        color: getColor('t1')
      }
    }, backName)),
    Right: /*#__PURE__*/React.createElement(_reactNative.Pressable, {
      disabled: disable,
      style: {},
      onPress: () => {
        onSave === null || onSave === void 0 ? void 0 : onSave(value);
      }
    }, /*#__PURE__*/React.createElement(_Text.Text, {
      textType: 'medium',
      paletteType: 'label',
      style: {
        color: getColor(disable !== true ? 'save' : 't2')
      }
    }, saveName))
  }) : null, /*#__PURE__*/React.createElement(_reactNative.KeyboardAvoidingView, {
    style: {
      paddingHorizontal: 12
    }
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      paddingBottom: 22,
      backgroundColor: getColor('bg2')
    }
  }, /*#__PURE__*/React.createElement(_TextInput.TextInput, {
    ref: inputRef,
    numberOfLines: 10,
    multiline: true,
    unitHeight: _reactNative.Platform.OS === 'ios' ? 20 : 20,
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
  }))), /*#__PURE__*/React.createElement(_reactNative.View, {
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