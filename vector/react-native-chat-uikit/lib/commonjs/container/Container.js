"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Container = Container;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeDeviceInfo = _interopRequireDefault(require("react-native-device-info"));
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _chat = require("../chat");
var _config = require("../config");
var _dispatch = require("../dispatch");
var _i18n = require("../i18n");
var _theme2 = require("../theme");
var _utils = require("../utils");
var _Container = require("./Container.hook");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Entry to the UIKit component library. It will complete initialization, configure custom parameters and other preparations.
 *
 * **Note** IM will be initialized here. If other UIKit is integrated at the same time, the parameters initialized first shall prevail.
 * For example: if `chat uikit sdk` and `chat uikit sdk` are integrated at the same time, then the parameter initialized first will prevail.
 *
 * @param props {@link ContainerProps}
 */
function Container(props) {
  const {
    options,
    children,
    language,
    palette,
    theme,
    fontFamily,
    onInitialized,
    conversationDetail,
    group,
    avatar,
    input,
    alert,
    formatTime,
    recallTimeout,
    onInitLanguageSet,
    onRequestMultiData
  } = props;
  (0, _Container.useInitServices)(props);
  const _palette = (0, _theme2.usePresetPalette)();
  const _guessLanguage = (0, _Container.getI18nLanguage)(language);
  const _languagePackage = (0, _Container.getLanguagePackage)(_guessLanguage, onInitLanguageSet === null || onInitLanguageSet === void 0 ? void 0 : onInitLanguageSet());
  const _releaseArea = (0, _Container.getReleaseArea)();
  const _theme = (0, _Container.useGetTheme)({
    theme: theme,
    palette: palette ?? _palette,
    releaseArea: _releaseArea,
    avatar,
    input,
    alert
  });
  React.useEffect(() => {
    if (_reactNative.Platform.OS === 'ios') {
      const id = _reactNativeDeviceInfo.default.getBundleId();
      console.log('dev:getBundleId', id);
    } else if (_reactNative.Platform.OS === 'android') {
      const id = _reactNativeDeviceInfo.default.getBundleId();
      console.log('dev:getBundleId', id);
    }
  }, []);
  return /*#__PURE__*/React.createElement(_dispatch.DispatchContextProvider, null, /*#__PURE__*/React.createElement(_theme2.PaletteContextProvider, {
    value: palette ?? _palette
  }, /*#__PURE__*/React.createElement(_theme2.ThemeContextProvider, {
    value: _theme
  }, /*#__PURE__*/React.createElement(_i18n.I18nContextProvider, {
    value: {
      languageCode: _guessLanguage,
      assets: _languagePackage
    }
  }, /*#__PURE__*/React.createElement(_chat.ChatContextProvider, {
    value: {
      options: options,
      onRequestMultiData: onRequestMultiData,
      onInitialized: onInitialized
    }
  }, /*#__PURE__*/React.createElement(_config.ConfigContextProvider, {
    value: {
      isDevMode: options.debugModel ?? false,
      enableCompare: false,
      enableCheckType: false,
      languageCode: (0, _Container.getTranslateLanguage)(_guessLanguage),
      fontFamily: fontFamily,
      formatTime: formatTime,
      recallTimeout: recallTimeout,
      conversationDetail: (0, _utils.mergeObjects)(conversationDetail, {
        bubble: {
          radiusStyle: 'small'
        }
      }),
      group: (0, _utils.mergeObjects)({
        ...group
      }, {
        createGroupMemberLimit: 1000
      }),
      personAvatar: avatar === null || avatar === void 0 ? void 0 : avatar.personAvatar,
      groupAvatar: avatar === null || avatar === void 0 ? void 0 : avatar.groupAvatar
    }
  }, /*#__PURE__*/React.createElement(_reactNativeSafeAreaContext.SafeAreaProvider, null, children)))))));
}
//# sourceMappingURL=Container.js.map