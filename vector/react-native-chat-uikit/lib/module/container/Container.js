import * as React from 'react';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ChatContextProvider } from '../chat';
import { ConfigContextProvider } from '../config';
import { DispatchContextProvider } from '../dispatch';
import { I18nContextProvider } from '../i18n';
import { PaletteContextProvider, ThemeContextProvider, usePresetPalette } from '../theme';
import { mergeObjects } from '../utils';
import { getI18nLanguage, getLanguagePackage, getReleaseArea, getTranslateLanguage, useGetTheme, useInitServices } from './Container.hook';
/**
 * Entry to the UIKit component library. It will complete initialization, configure custom parameters and other preparations.
 *
 * **Note** IM will be initialized here. If other UIKit is integrated at the same time, the parameters initialized first shall prevail.
 * For example: if `chat uikit sdk` and `chat uikit sdk` are integrated at the same time, then the parameter initialized first will prevail.
 *
 * @param props {@link ContainerProps}
 */
export function Container(props) {
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
  useInitServices(props);
  const _palette = usePresetPalette();
  const _guessLanguage = getI18nLanguage(language);
  const _languagePackage = getLanguagePackage(_guessLanguage, onInitLanguageSet === null || onInitLanguageSet === void 0 ? void 0 : onInitLanguageSet());
  const _releaseArea = getReleaseArea();
  const _theme = useGetTheme({
    theme: theme,
    palette: palette ?? _palette,
    releaseArea: _releaseArea,
    avatar,
    input,
    alert
  });
  React.useEffect(() => {
    if (Platform.OS === 'ios') {
      const id = DeviceInfo.getBundleId();
      console.log('dev:getBundleId', id);
    } else if (Platform.OS === 'android') {
      const id = DeviceInfo.getBundleId();
      console.log('dev:getBundleId', id);
    }
  }, []);
  return /*#__PURE__*/React.createElement(DispatchContextProvider, null, /*#__PURE__*/React.createElement(PaletteContextProvider, {
    value: palette ?? _palette
  }, /*#__PURE__*/React.createElement(ThemeContextProvider, {
    value: _theme
  }, /*#__PURE__*/React.createElement(I18nContextProvider, {
    value: {
      languageCode: _guessLanguage,
      assets: _languagePackage
    }
  }, /*#__PURE__*/React.createElement(ChatContextProvider, {
    value: {
      options: options,
      onRequestMultiData: onRequestMultiData,
      onInitialized: onInitialized
    }
  }, /*#__PURE__*/React.createElement(ConfigContextProvider, {
    value: {
      isDevMode: options.debugModel ?? false,
      enableCompare: false,
      enableCheckType: false,
      languageCode: getTranslateLanguage(_guessLanguage),
      fontFamily: fontFamily,
      formatTime: formatTime,
      recallTimeout: recallTimeout,
      conversationDetail: mergeObjects(conversationDetail, {
        bubble: {
          radiusStyle: 'small'
        }
      }),
      group: mergeObjects({
        ...group
      }, {
        createGroupMemberLimit: 1000
      }),
      personAvatar: avatar === null || avatar === void 0 ? void 0 : avatar.personAvatar,
      groupAvatar: avatar === null || avatar === void 0 ? void 0 : avatar.groupAvatar
    }
  }, /*#__PURE__*/React.createElement(SafeAreaProvider, null, children)))))));
}
//# sourceMappingURL=Container.js.map