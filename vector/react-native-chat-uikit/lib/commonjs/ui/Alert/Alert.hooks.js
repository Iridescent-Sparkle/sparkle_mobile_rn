"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAlert = useAlert;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _hook = require("../../hook");
var _i18n = require("../../i18n");
var _theme = require("../../theme");
var _Button = require("../Button");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function useAlert(props) {
  const {
    containerStyle,
    supportInput = false
  } = props;
  const [value, _onChangeText] = React.useState('');
  const [textCount, setTextCount] = React.useState(0);
  const [_props, setProps] = React.useState(props);
  const {
    tr
  } = (0, _i18n.useI18nContext)();
  const {
    cornerRadius: corner
  } = (0, _theme.useThemeContext)();
  const {
    input
  } = corner;
  const {
    cornerRadius
  } = (0, _theme.usePaletteContext)();
  const {
    getBorderRadius
  } = (0, _hook.useGetStyleProps)();
  const [disabled, setDisabled] = React.useState(supportInput === false ? false : true);
  const onChangeText = React.useCallback(v => {
    _onChangeText(v);
    if (v.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, []);
  const getButton = (buttons, onRequestModalClose) => {
    const count = (buttons === null || buttons === void 0 ? void 0 : buttons.length) ?? 1;
    const _getButton = (Button, v, i) => {
      const lastIndex = count - 1;
      return /*#__PURE__*/React.createElement(Button, {
        key: i,
        disabled: lastIndex === i ? disabled : false,
        sizesType: 'large',
        radiusType: input,
        contentType: 'only-text',
        onPress: () => {
          var _v$onPress;
          return (_v$onPress = v.onPress) === null || _v$onPress === void 0 ? void 0 : _v$onPress.call(v, value);
        },
        text: v.text,
        style: {
          height: 48,
          width: count === 2 ? '48%' : '100%',
          borderRadius: getBorderRadius({
            height: 48,
            crt: corner.input,
            cr: cornerRadius,
            style: containerStyle
          })
        }
      });
    };
    if (buttons) {
      const list = buttons.map((v, i) => {
        const Button = v.isPreferred !== true ? _Button.BorderButton : _Button.CmnButton;
        return _getButton(Button, v, i);
      });
      const ret = [];
      if (count < 3) {
        for (let index = 0; index < list.length; index++) {
          const element = list[index];
          if (element) {
            ret.push(element);
            // if (index < list.length - 1) {
            //   ret.push(<View key={count + index} style={{ width: 16 }} />);
            // }
          }
        }
      } else {
        for (let index = 0; index < list.length; index++) {
          const element = list[index];
          if (element) {
            ret.push(element);
            if (index < list.length - 1) {
              ret.push( /*#__PURE__*/React.createElement(_reactNative.View, {
                key: count + index,
                style: {
                  height: 16
                }
              }));
            }
          }
        }
      }
      return ret;
    }
    return [_getButton(_Button.CmnButton, {
      text: tr('confirm'),
      onPress: onRequestModalClose
    }, 99)];
  };
  const onUpdate = props => {
    setProps({
      ...props
    });
  };
  return {
    getButton,
    onUpdate,
    props: _props,
    value,
    onChangeText,
    textCount,
    setTextCount
  };
}
//# sourceMappingURL=Alert.hooks.js.map