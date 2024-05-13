import * as React from 'react';
import { View } from 'react-native';
import { useGetStyleProps } from '../../hook';
import { useI18nContext } from '../../i18n';
import { usePaletteContext, useThemeContext } from '../../theme';
import { BorderButton, CmnButton } from '../Button';
export function useAlert(props) {
  const {
    containerStyle,
    supportInput = false
  } = props;
  const [value, _onChangeText] = React.useState('');
  const [textCount, setTextCount] = React.useState(0);
  const [_props, setProps] = React.useState(props);
  const {
    tr
  } = useI18nContext();
  const {
    cornerRadius: corner
  } = useThemeContext();
  const {
    input
  } = corner;
  const {
    cornerRadius
  } = usePaletteContext();
  const {
    getBorderRadius
  } = useGetStyleProps();
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
        const Button = v.isPreferred !== true ? BorderButton : CmnButton;
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
              ret.push( /*#__PURE__*/React.createElement(View, {
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
    return [_getButton(CmnButton, {
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