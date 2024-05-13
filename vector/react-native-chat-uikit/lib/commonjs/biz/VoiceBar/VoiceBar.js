"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VoiceBar = VoiceBar;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _hook = require("../../hook");
var _i18n = require("../../i18n");
var _theme = require("../../theme");
var _Button = require("../../ui/Button");
var _Image = require("../../ui/Image");
var _Ripple = require("../../ui/Ripple");
var _Text = require("../../ui/Text");
var _const = require("../const");
var _VoiceBar = require("./VoiceBar.hooks");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Component for recording and playing speech.
 */
function VoiceBar(props) {
  const {
    height
  } = props;
  const {
    tr
  } = (0, _i18n.useI18nContext)();
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
    text: {
      light: colors.neutral[1],
      dark: colors.neutral[98]
    },
    disable: {
      light: colors.neutral[7],
      dark: colors.neutral[3]
    },
    enable: {
      light: colors.primary[5],
      dark: colors.primary[6]
    },
    trash: {
      light: colors.neutral[5],
      dark: colors.neutral[6]
    },
    trash_bg: {
      light: colors.neutral[9],
      dark: colors.neutral[7]
    }
  });
  const {
    state,
    onClickedClearButton,
    onClickedRecordButton,
    onClickedSendButton,
    contentTimerRef,
    playRipple,
    onContentTimeChanged,
    currentTime
  } = (0, _VoiceBar.useVoiceBar)(props);
  const getTextTip = () => {
    switch (state) {
      case 'idle':
        return tr('voice_bar_tip_click_record');
      case 'recording':
        return tr('voice_bar_tip_recording');
      case 'playing':
        return tr('voice_bar_tip_playing');
      case 'stopping':
        return tr('voice_bar_tip_click_play');
    }
  };
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      height: height !== undefined ? height : _const.gVoiceBarHeight,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {}
  }), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      height: 70
    }
  }), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center'
    }
  }, state === 'playing' || state === 'stopping' ? /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      backgroundColor: getColor('trash_bg'),
      borderRadius: 36,
      height: 36,
      width: 36,
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(_Button.IconButton, {
    iconName: 'trash',
    style: {
      height: 20,
      width: 20,
      tintColor: getColor('trash')
    },
    onPress: onClickedClearButton
  })) : null, /*#__PURE__*/React.createElement(_Ripple.Ripple, {
    containerStyle: {
      height: 58,
      width: 90
    },
    childrenStyle: {
      borderRadius: 24,
      height: 48,
      width: 80
    },
    rippleStyle: {
      height: 58,
      width: 90,
      backgroundColor: getColor('enable')
    },
    playAnimated: playRipple,
    rippleStartOpacity: 0.1
  }, /*#__PURE__*/React.createElement(_reactNative.Pressable, {
    style: {
      height: 48,
      width: 80,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: getColor('enable'),
      borderRadius: 24
    },
    onPress: onClickedRecordButton
  }, /*#__PURE__*/React.createElement(_reactNative.View, null, /*#__PURE__*/React.createElement(_Image.Icon, {
    name: 'mic_on',
    style: {
      width: 24,
      height: 24,
      tintColor: getColor('bg'),
      display: state === 'idle' ? 'flex' : 'none'
    }
  }), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      flexDirection: 'row',
      display: state === 'idle' ? 'none' : 'flex'
    }
  }, /*#__PURE__*/React.createElement(_Text.TimerText, {
    textStyle: {
      textType: 'small',
      paletteType: 'headline',
      style: {
        color: getColor('bg')
      }
    },
    isIncrease: true,
    startValue: 0,
    stopValue: 60,
    onChanged: onContentTimeChanged,
    propsRef: contentTimerRef
  }), /*#__PURE__*/React.createElement(_Text.Text, {
    textType: 'small',
    paletteType: 'headline',
    style: {
      color: getColor('bg')
    }
  }, 's'))))), state === 'playing' || state === 'stopping' ? /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      backgroundColor: getColor('enable'),
      borderRadius: 36,
      height: 36,
      width: 36,
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(_Button.IconButton, {
    iconName: 'airplane',
    style: {
      height: 20,
      width: 20,
      tintColor: getColor('bg')
    },
    onPress: onClickedSendButton
  })) : null), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      flexGrow: 1,
      alignSelf: 'center',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(_Text.Text, {
    textType: 'medium',
    paletteType: 'label',
    style: {
      color: getColor('trash'),
      marginTop: 16
    }
  }, getTextTip()), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      flexDirection: 'row',
      marginTop: 8,
      display: currentTime > 50 ? 'flex' : 'none'
    }
  }, /*#__PURE__*/React.createElement(_Text.Text, {
    textType: 'small',
    paletteType: 'body',
    style: {
      color: getColor('trash')
    }
  }, tr('voice_bar_remain', 60 - currentTime)))));
}
//# sourceMappingURL=VoiceBar.js.map