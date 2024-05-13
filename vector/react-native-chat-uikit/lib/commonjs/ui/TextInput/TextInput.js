"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextInput = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _hook = require("../../hook");
var _theme = require("../../theme");
var _Image = require("../Image");
var _Text = require("../Text");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
/**
 * Mainly solves the multi-line problem of the native `RNTextInput` android platform.
 */
const TextInput = /*#__PURE__*/React.forwardRef(function (props, ref) {
  const {
    unitHeight,
    multiline,
    numberOfLines,
    style,
    onContentSizeChange,
    containerStyle,
    statistics,
    onChangeText,
    value,
    clearButtonMode: _,
    clearTextOnFocus: __,
    enableClearButton,
    clearButtonStyle,
    onClear,
    ...others
  } = props;
  _;
  __;
  const {
    cornerRadius: corner
  } = (0, _theme.useThemeContext)();
  const {
    cornerRadius,
    colors
  } = (0, _theme.usePaletteContext)();
  const {
    getBorderRadius
  } = (0, _hook.useGetStyleProps)();
  const {
    getColor
  } = (0, _hook.useColors)({
    bg: {
      light: colors.neutral[95],
      dark: colors.neutral[2]
    },
    fg: {
      light: colors.neutral[1],
      dark: colors.neutral[98]
    },
    clear: {
      light: colors.neutral[3],
      dark: colors.neutral[8]
    },
    count: {
      light: colors.neutral[7],
      dark: colors.neutral[8]
    }
  });
  const {
    getStyleProp
  } = (0, _hook.useGetStyleProps)();
  const minHeight = getStyleProp('minHeight', containerStyle);
  const maxHeight = getStyleProp('maxHeight', containerStyle);
  const getMaxHeight = () => {
    if (multiline === true && numberOfLines && unitHeight) {
      return numberOfLines * unitHeight;
    }
    return undefined;
  };
  const maxHeightRef = React.useRef(getMaxHeight());
  let [_maxHeight, setMaxHeight] = React.useState(maxHeightRef.current);
  let [_height, setHeight] = React.useState(minHeight);
  const _onChangeText = React.useCallback(text => {
    onChangeText === null || onChangeText === void 0 ? void 0 : onChangeText(text);
    if (statistics) {
      var _statistics$onCountCh;
      (_statistics$onCountCh = statistics.onCountChange) === null || _statistics$onCountCh === void 0 ? void 0 : _statistics$onCountCh.call(statistics, text.length);
    }
  }, [onChangeText, statistics]);
  const _onClearValue = React.useCallback(() => {
    _onChangeText('');
    onClear === null || onClear === void 0 ? void 0 : onClear();
  }, [_onChangeText, onClear]);
  const getStyle = () => {
    if (multiline !== true) {
      return undefined;
    }
    const maxHeight = getStyleProp('maxHeight', containerStyle);
    const minHeight = getStyleProp('minHeight', containerStyle);
    if (_reactNative.Platform.OS === 'ios') {
      return {
        maxHeight: _maxHeight,
        minHeight: minHeight
      };
    } else if (_reactNative.Platform.OS === 'android') {
      return {
        height: _height,
        minHeight: minHeight
      };
    } else {
      return {
        maxHeight: maxHeight,
        minHeight: minHeight
      };
    }
  };
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [{
      borderRadius: getBorderRadius({
        height: 36,
        crt: corner.avatar,
        cr: cornerRadius,
        style: containerStyle
      }),
      backgroundColor: getColor('bg')
    }, containerStyle, getStyle()]
  }, /*#__PURE__*/React.createElement(_reactNative.TextInput, _extends({
    ref: ref,
    multiline: multiline,
    numberOfLines: numberOfLines,
    style: [{
      color: getColor('fg')
    }, style],
    onContentSizeChange: e => {
      onContentSizeChange === null || onContentSizeChange === void 0 ? void 0 : onContentSizeChange(e);
      // console.log(
      //   'dev:onContentSizeChange',
      //   minHeight,
      //   maxHeight,
      //   maxHeightRef.current,
      //   e.nativeEvent.contentSize.height,
      //   Math.min(
      //     Math.max(minHeight, e.nativeEvent.contentSize.height),
      //     maxHeight ?? maxHeightRef.current
      //   )
      // );
      if (_reactNative.Platform.OS === 'ios') {
        if (maxHeightRef.current && maxHeight) {
          setMaxHeight(Math.min(maxHeight, maxHeightRef.current));
        }
      } else if (_reactNative.Platform.OS === 'android') {
        if (numberOfLines !== undefined) {
          if (maxHeightRef.current) {
            setHeight(Math.min(Math.max(minHeight, e.nativeEvent.contentSize.height), maxHeight ?? maxHeightRef.current));
          }
        } else {
          if (maxHeightRef.current && maxHeight) {
            setHeight(Math.min(maxHeight, maxHeightRef.current));
          }
        }
      }
    },
    onChangeText: _onChangeText,
    autoCapitalize: 'none',
    value: value
  }, others)), statistics ? /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      height: 22,
      width: '100%',
      position: 'absolute',
      bottom: -22
    }
  }, /*#__PURE__*/React.createElement(_Text.Text, {
    textType: 'large',
    paletteType: 'body',
    style: [{
      // height: 22,
      // paddingRight: 12,
      width: '100%',
      textAlign: 'right',
      color: getColor('count')
    }, statistics.textStyles]
  }, `${statistics.count}/${statistics.maxCount}`)) : null, value && (value === null || value === void 0 ? void 0 : value.length) > 0 && enableClearButton === true ? /*#__PURE__*/React.createElement(_reactNative.Pressable, {
    style: [{
      position: 'absolute',
      right: 0,
      padding: 13,
      justifyContent: 'center',
      alignItems: 'center'
    }, clearButtonStyle],
    onPress: _onClearValue
  }, /*#__PURE__*/React.createElement(_Image.Icon, {
    name: 'xmark_in_circle_fill',
    resolution: '3x',
    style: {
      height: 22,
      width: 22,
      tintColor: getColor('clear')
    }
  })) : null);
});
exports.TextInput = TextInput;
//# sourceMappingURL=TextInput.js.map