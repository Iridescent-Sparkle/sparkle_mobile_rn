"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BottomSheetMenuItem = BottomSheetMenuItem;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _const = require("../../const");
var _dispatch = require("../../dispatch");
var _hook = require("../../hook");
var _theme = require("../../theme");
var _Image = require("../../ui/Image");
var _Text = require("../../ui/Text");
var _BottomSheetMenu = require("./BottomSheetMenu.const");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function BottomSheetMenuItem(props) {
  const {
    id,
    initState,
    iconName,
    onPress,
    preventHighFrequencyClicks,
    frequencyInterval,
    containerStyle
  } = props;
  const clicked = React.useRef(false);
  const {
    colors
  } = (0, _theme.usePaletteContext)();
  const {
    emit
  } = (0, _dispatch.useDispatchContext)();
  const {
    getColor
  } = (0, _hook.useColors)({
    disabled: {
      light: colors.neutral[98],
      dark: colors.neutral[1]
    },
    enabled: {
      light: colors.neutral[98],
      dark: colors.neutral[1]
    },
    pressed: {
      light: colors.neutral[95],
      dark: colors.neutral[0]
    }
  });
  const disabled = initState === 'disabled' ? true : false;
  const onPressInternal = () => {
    if (preventHighFrequencyClicks === true) {
      if (onPress) {
        if (clicked.current === false) {
          setTimeout(() => {
            clicked.current = false;
          }, frequencyInterval);
          clicked.current = true;
          onPress === null || onPress === void 0 ? void 0 : onPress();
        }
      }
    } else {
      onPress === null || onPress === void 0 ? void 0 : onPress();
    }
  };
  const onChangeStateColor = state => {
    let buttonColors;
    if (state.pressed === true) {
      buttonColors = getColor('pressed');
      emit(`_$${ItemContent.name}`, initState === 'warned' ? 'warned' : 'pressed', id);
    } else {
      if (disabled === true) {
        buttonColors = getColor('disabled');
        emit(`_$${ItemContent.name}`, 'disabled', id);
      } else {
        buttonColors = getColor('enabled');
        emit(`_$${ItemContent.name}`, initState === 'warned' ? 'warned' : 'enabled', id);
      }
    }
    return [{
      backgroundColor: buttonColors,
      justifyContent: iconName ? 'flex-start' : 'center',
      alignItems: 'center',
      height: _BottomSheetMenu.gItemHeight,
      width: '100%'
    }, containerStyle];
  };
  return /*#__PURE__*/React.createElement(_reactNative.Pressable, {
    key: id,
    disabled: disabled,
    onPress: onPressInternal,
    style: state => {
      return onChangeStateColor(state);
    }
  }, /*#__PURE__*/React.createElement(ItemContent, props), /*#__PURE__*/React.createElement(ItemDivider, null));
}
const ItemDivider = () => {
  const {
    colors
  } = (0, _theme.usePaletteContext)();
  const {
    getColor
  } = (0, _hook.useColors)({
    borderBottomColor: {
      light: colors.neutral[95],
      dark: colors.neutral[2]
    }
  });
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      width: '80%',
      borderBottomColor: getColor('borderBottomColor'),
      borderBottomWidth: _const.g_border_bottom_width,
      justifyContent: 'flex-end'
    }
  });
};
const ItemContent = props => {
  const {
    initState,
    text,
    iconName,
    iconResolution,
    id: pid,
    textStyle
  } = props;
  const {
    colors
  } = (0, _theme.usePaletteContext)();
  const {
    addListener,
    removeListener
  } = (0, _dispatch.useDispatchContext)();
  const {
    getColor
  } = (0, _hook.useColors)({
    disabled: {
      light: colors.neutral[7],
      dark: colors.neutral[3]
    },
    enabled: {
      light: colors.primary[5],
      dark: colors.primary[6]
    },
    pressed: {
      light: colors.primary[4],
      dark: colors.primary[6]
    },
    warned: {
      light: colors.error[5],
      dark: colors.error[6]
    }
  });
  const disabled = initState === 'disabled' ? true : false;
  const warned = initState === 'warned' ? true : false;
  const [buttonState, setButtonState] = React.useState(disabled === true ? 'disabled' : warned === true ? 'warned' : 'enabled');
  React.useEffect(() => {
    const listener = (state, id) => {
      if (id === pid) {
        setButtonState(state);
      }
    };
    addListener(`_$${ItemContent.name}`, listener);
    return () => {
      removeListener(`_$${ItemContent.name}`, listener);
    };
  }, [addListener, removeListener, pid]);
  const getContentText = () => {
    return /*#__PURE__*/React.createElement(_Text.Text, {
      paletteType: 'body',
      textType: 'large',
      style: [{
        color: getColor(buttonState)
      }, textStyle]
    }, text);
  };
  if (iconName) {
    return /*#__PURE__*/React.createElement(_reactNative.View, {
      style: {
        flex: 1,
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement(_reactNative.View, {
      style: {
        flexDirection: 'row',
        flex: 1,
        width: '100%',
        alignItems: 'center',
        paddingLeft: 16
      }
    }, /*#__PURE__*/React.createElement(_Image.Icon, {
      name: iconName,
      style: [{
        tintColor: getColor(buttonState),
        height: 22,
        width: 22
      }],
      resolution: iconResolution
    }), /*#__PURE__*/React.createElement(_reactNative.View, {
      style: {
        width: 2
      }
    }), getContentText()));
  } else {
    return /*#__PURE__*/React.createElement(_reactNative.View, {
      style: {
        flex: 1,
        justifyContent: 'center'
      }
    }, getContentText());
  }
};
//# sourceMappingURL=BottomSheetMenu.item.js.map