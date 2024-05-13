"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConversationDetailNavigationBar = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _hook = require("../../hook");
var _i18n = require("../../i18n");
var _theme = require("../../theme");
var _Button = require("../../ui/Button");
var _Image = require("../../ui/Image");
var _Text = require("../../ui/Text");
var _Avatar = require("../Avatar");
var _TopNavigationBar = require("../TopNavigationBar");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const ConversationDetailNavigationBar = props => {
  const {
    onBack,
    onClickedAvatar,
    convAvatar,
    convName,
    convId,
    NavigationBar,
    doNotDisturb
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
    text: {
      light: colors.neutral[1],
      dark: colors.neutral[98]
    },
    text_disable: {
      light: colors.neutral[7],
      dark: colors.neutral[3]
    },
    text_enable: {
      light: colors.primary[5],
      dark: colors.primary[6]
    },
    icon: {
      light: colors.neutral[3],
      dark: colors.neutral[95]
    },
    t3: {
      light: colors.neutral[7],
      dark: colors.neutral[5]
    }
  });
  if (NavigationBar) {
    // return { NavigationBar };
    return /*#__PURE__*/React.createElement(React.Fragment, null, NavigationBar);
  }
  return /*#__PURE__*/React.createElement(_TopNavigationBar.TopNavigationBar, {
    Left: /*#__PURE__*/React.createElement(_reactNative.View, {
      style: {
        flexDirection: 'row',
        alignItems: 'center',
        maxWidth: _reactNative.Platform.select({
          ios: '70%',
          android: '80%'
        })
      }
    }, /*#__PURE__*/React.createElement(_Button.IconButton, {
      iconName: 'chevron_left',
      style: {
        width: 24,
        height: 24,
        tintColor: getColor('icon')
      },
      onPress: onBack
    }), /*#__PURE__*/React.createElement(_reactNative.Pressable, {
      onPress: onClickedAvatar
    }, /*#__PURE__*/React.createElement(_Avatar.Avatar, {
      url: convAvatar,
      size: 32
    })), /*#__PURE__*/React.createElement(_reactNative.View, {
      style: {
        marginLeft: 10,
        maxWidth: _reactNative.Dimensions.get('window').width - 200
      }
    }, /*#__PURE__*/React.createElement(_reactNative.View, {
      style: {
        flexDirection: 'row',
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement(_Text.SingleLineText, {
      textType: 'medium',
      paletteType: 'title',
      style: {
        color: getColor('text')
      }
    }, convName ?? convId), doNotDisturb === true ? /*#__PURE__*/React.createElement(_Image.Icon, {
      name: 'bell_slash',
      style: {
        height: 20,
        width: 20,
        tintColor: getColor('t3')
      }
    }) : null), /*#__PURE__*/React.createElement(_Text.Text, {
      textType: 'extraSmall',
      paletteType: 'label',
      style: {
        color: getColor('text_enable')
      }
    }, tr('state')))),
    Right: _TopNavigationBar.TopNavigationBarRightList,
    RightProps: {
      onClickedList: [() => {
        // todo: click phone_pick
      }, () => {
        // todo: click video_camera
      }],
      iconNameList: [
        // 'phone_pick',
        // 'video_camera'
      ]
    }
  });
};
exports.ConversationDetailNavigationBar = ConversationDetailNavigationBar;
//# sourceMappingURL=ConversationDetail.navi.js.map