function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import { useColors } from '../../hook';
import { usePaletteContext } from '../../theme';
import { Switch } from './Switch';
export function CommonSwitch(props) {
  const {
    colors
  } = usePaletteContext();
  const {
    getColor
  } = useColors({
    switch_fg: {
      light: colors.neutral[100],
      dark: colors.neutral[100]
    },
    switch_track_disable: {
      light: colors.neutral[9],
      dark: colors.neutral[3]
    },
    switch_track_enable: {
      light: colors.primary[5],
      dark: colors.primary[6]
    }
  });
  return /*#__PURE__*/React.createElement(Switch, _extends({
    thumbColor: getColor('switch_fg'),
    thumbBackgroundColor: getColor('switch_fg'),
    trackColor: {
      false: getColor('switch_track_disable'),
      true: getColor('switch_track_enable')
    }
  }, props));
}
//# sourceMappingURL=CommonSwitch.js.map