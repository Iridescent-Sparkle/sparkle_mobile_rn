function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import { View } from 'react-native';
import { useColors } from '../../hook';
import { usePaletteContext } from '../../theme';
import { Text } from './Text';
/**
 * Highlight keywords.
 *
 * **Note** Exceeding the width is not considered.
 */
export function HighText(props) {
  const {
    containerStyle
  } = props;
  const {
    getContent
  } = useHighText(props);
  return /*#__PURE__*/React.createElement(View, {
    style: [{
      flexDirection: 'row'
    }, containerStyle]
  }, getContent());
}
export function useHighText(props) {
  const {
    keyword,
    content,
    style,
    highColors,
    textColors,
    ...others
  } = props;
  const list = content.split(keyword);
  const {
    colors
  } = usePaletteContext();
  const {
    getColor
  } = useColors({
    high: {
      light: (highColors === null || highColors === void 0 ? void 0 : highColors[0]) ?? colors.primary[5],
      dark: (highColors === null || highColors === void 0 ? void 0 : highColors[1]) ?? colors.primary[6]
    },
    text: {
      light: (textColors === null || textColors === void 0 ? void 0 : textColors[0]) ?? colors.neutral[1],
      dark: (textColors === null || textColors === void 0 ? void 0 : textColors[1]) ?? colors.primary[98]
    }
  });
  const getContent = () => {
    return list.map((item, index) => {
      if (item.length === 0) {
        if (index !== list.length - 1) {
          return /*#__PURE__*/React.createElement(Text, _extends({
            key: index
          }, others, {
            style: [style, {
              color: getColor('high')
            }]
          }), keyword);
        } else {
          return null;
        }
      } else {
        if (index === list.length - 1) {
          return /*#__PURE__*/React.createElement(Text, _extends({
            key: index * 10 + 1
          }, others, {
            style: [style, {
              color: getColor('text')
            }]
          }), item);
        } else {
          return /*#__PURE__*/React.createElement(View, {
            key: index,
            style: {
              flexDirection: 'row'
            }
          }, /*#__PURE__*/React.createElement(Text, _extends({
            key: index * 10 + 1
          }, others, {
            style: [style, {
              color: getColor('text')
            }]
          }), item), /*#__PURE__*/React.createElement(Text, _extends({
            key: index * 10 + 2
          }, others, {
            style: [style, {
              color: getColor('high')
            }]
          }), keyword));
        }
      }
    });
  };
  return {
    getContent
  };
}
//# sourceMappingURL=HighText.js.map