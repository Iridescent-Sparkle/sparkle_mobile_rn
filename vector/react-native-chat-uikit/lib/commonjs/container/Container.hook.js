"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useInitServices = exports.useGetTheme = exports.getTranslateLanguage = exports.getReleaseArea = exports.getLanguagePackage = exports.getInputRadiusStyle = exports.getI18nLanguage = exports.getBubbleRadiusStyle = exports.getAvatarRadiusStyle = exports.getAlertRadiusStyle = void 0;
var _cameraRoll = require("@react-native-camera-roll/camera-roll");
var _clipboard = _interopRequireDefault(require("@react-native-clipboard/clipboard"));
var _messaging = _interopRequireDefault(require("@react-native-firebase/messaging"));
var Audio = _interopRequireWildcard(require("react-native-audio-recorder-player"));
var DocumentPicker = _interopRequireWildcard(require("react-native-document-picker"));
var FileAccess = _interopRequireWildcard(require("react-native-file-access"));
var ImagePicker = _interopRequireWildcard(require("react-native-image-picker"));
var Permissions = _interopRequireWildcard(require("react-native-permissions"));
var _reactNativeVideo = _interopRequireDefault(require("react-native-video"));
var _i18n = require("../i18n");
var _StringSet = require("../i18n/StringSet");
var _services = require("../services");
var _theme = require("../theme");
var _utils = require("../utils");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// import CreateThumbnail from '@easemob/react-native-create-thumbnail';

const getDefaultLanguage = () => {
  let ret;
  const systemLanguage = (0, _utils.getSystemLanguage)();
  if (systemLanguage !== null && systemLanguage !== void 0 && systemLanguage.startsWith('zh')) {
    ret = 'zh-Hans';
  } else if (systemLanguage !== null && systemLanguage !== void 0 && systemLanguage.startsWith('en')) {
    ret = 'en';
  } else {
    ret = require('../config.local').language;
  }
  return ret;
};
const getLanguagePackage = (language, callback) => {
  let ret;
  if (callback) {
    ret = callback(language, (0, _StringSet.createDefaultStringSet)(language));
  } else {
    ret = (0, _StringSet.createDefaultStringSet)(language);
  }
  return ret;
};
exports.getLanguagePackage = getLanguagePackage;
const getI18nLanguage = language => {
  let ret = language;
  if (language) {
    const isExisted = _i18n.languageCodes.includes(language);
    if (isExisted === true) {
      ret = language;
    } else {
      ret = require('../config.local').language;
    }
  } else {
    ret = getDefaultLanguage();
  }
  console.log('dev:language:i18n:', ret);
  return ret;
};
exports.getI18nLanguage = getI18nLanguage;
const getTranslateLanguage = language => {
  let ret = language;
  if (language) {
    ret = language;
  } else {
    ret = getDefaultLanguage();
  }
  console.log('dev:language:tl:', ret);
  return ret;
};
exports.getTranslateLanguage = getTranslateLanguage;
const getReleaseArea = releaseArea => {
  if (releaseArea) {
    return releaseArea;
  }
  let ret = require('../config.local').release_area;
  if (ret !== 'global' && ret !== 'china') {
    ret = 'global';
  }
  console.log('dev:releaseArea:', ret);
  return ret;
};
exports.getReleaseArea = getReleaseArea;
const getAvatarRadiusStyle = params => {
  if (params.releaseArea === 'china') {
    return 'extraSmall';
  } else {
    return 'extraLarge';
  }
};
exports.getAvatarRadiusStyle = getAvatarRadiusStyle;
const getInputRadiusStyle = params => {
  if (params.releaseArea === 'china') {
    return 'extraSmall';
  } else {
    return 'extraLarge';
  }
};
exports.getInputRadiusStyle = getInputRadiusStyle;
const getAlertRadiusStyle = params => {
  if (params.releaseArea === 'china') {
    return 'extraSmall';
  } else {
    return 'large';
  }
};
exports.getAlertRadiusStyle = getAlertRadiusStyle;
const getBubbleRadiusStyle = params => {
  if (params.releaseArea === 'china') {
    return ['extraSmall'];
  } else {
    return ['extraSmall', 'medium', 'large'];
  }
};
exports.getBubbleRadiusStyle = getBubbleRadiusStyle;
const useGetTheme = params => {
  const {
    palette,
    theme,
    releaseArea,
    avatar,
    input,
    alert,
    bubble
  } = params;
  const light = (0, _theme.useLightTheme)(palette, releaseArea);
  if (theme) {
    theme.cornerRadius.avatar = (avatar === null || avatar === void 0 ? void 0 : avatar.borderRadiusStyle) ?? getAvatarRadiusStyle({
      releaseArea
    });
    theme.cornerRadius.input = (input === null || input === void 0 ? void 0 : input.borderRadiusStyle) ?? getInputRadiusStyle({
      releaseArea
    });
    theme.cornerRadius.alert = (alert === null || alert === void 0 ? void 0 : alert.borderRadiusStyle) ?? getAlertRadiusStyle({
      releaseArea
    });
    theme.cornerRadius.bubble = (bubble === null || bubble === void 0 ? void 0 : bubble.borderRadiusStyle) ?? getBubbleRadiusStyle({
      releaseArea
    });
    return theme;
  } else {
    light.cornerRadius.avatar = (avatar === null || avatar === void 0 ? void 0 : avatar.borderRadiusStyle) ?? getAvatarRadiusStyle({
      releaseArea
    });
    light.cornerRadius.input = (input === null || input === void 0 ? void 0 : input.borderRadiusStyle) ?? getInputRadiusStyle({
      releaseArea
    });
    light.cornerRadius.alert = (alert === null || alert === void 0 ? void 0 : alert.borderRadiusStyle) ?? getAlertRadiusStyle({
      releaseArea
    });
    light.cornerRadius.bubble = (bubble === null || bubble === void 0 ? void 0 : bubble.borderRadiusStyle) ?? getBubbleRadiusStyle({
      releaseArea
    });
    return light;
  }
};
exports.useGetTheme = useGetTheme;
const useInitServices = props => {
  const {} = props;
  if (_services.Services.cbs === undefined) {
    _services.Services.createClipboardService({
      clipboard: _clipboard.default
    });
  }
  if (_services.Services.ls === undefined) {
    _services.Services.createLocalStorageService();
  }
  if (_services.Services.ps === undefined) {
    _services.Services.createPermissionService({
      permissions: Permissions,
      firebaseMessage: _messaging.default
    });
  }
  if (_services.Services.ms === undefined) {
    _services.Services.createMediaService({
      videoModule: _reactNativeVideo.default,
      videoThumbnail: {},
      imagePickerModule: ImagePicker,
      documentPickerModule: DocumentPicker,
      mediaLibraryModule: _cameraRoll.CameraRoll,
      fsModule: FileAccess,
      audioModule: Audio,
      permission: _services.Services.ps
    });
  }
  if (_services.Services.ns === undefined) {
    _services.Services.createNotificationService({
      firebaseMessage: _messaging.default,
      permission: _services.Services.ps
    });
  }
  if (_services.Services.dcs === undefined) {
    _services.Services.createDirCacheService({
      media: _services.Services.ms
    });
  }
};
exports.useInitServices = useInitServices;
//# sourceMappingURL=Container.hook.js.map