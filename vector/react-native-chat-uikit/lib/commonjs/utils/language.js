"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSystemLanguage = getSystemLanguage;
var _reactNative = require("react-native");
/**
 * Get system current language.
 *
 * see {@url https://github.com/facebook/react-native/issues/26540}
 * see {@url https://docs.expo.dev/versions/latest/sdk/localization/}
 *
 * @returns {string} system current language
 */
function getSystemLanguage() {
  if (_reactNative.Platform.OS === 'ios') {
    console.log('dev:getSystemLanguage', _reactNative.NativeModules.SettingsManager.settings);
    // https://github.com/facebook/react-native/issues/26540
    let locale = _reactNative.NativeModules.SettingsManager.settings.AppleLocale;
    if (locale === undefined) {
      // iOS 13 workaround, take first of AppleLanguages array  ["en", "en-NZ"]
      locale = _reactNative.NativeModules.SettingsManager.settings.AppleLanguages[0];
      if (locale === undefined) {
        return 'en'; // default language
      }
    }

    return locale;
  } else if (_reactNative.Platform.OS === 'android') {
    console.log('dev:getSystemLanguage', _reactNative.NativeModules.I18nManager);
    // ["en_US", "zh_CN_#Hans"]
    return _reactNative.NativeModules.I18nManager.localeIdentifier;
  }
  return '';
}
//# sourceMappingURL=language.js.map