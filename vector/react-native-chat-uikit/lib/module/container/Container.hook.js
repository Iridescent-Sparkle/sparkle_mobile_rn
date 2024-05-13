// import CreateThumbnail from '@easemob/react-native-create-thumbnail';
import { CameraRoll as MediaLibrary } from '@react-native-camera-roll/camera-roll';
import Clipboard from '@react-native-clipboard/clipboard';
import FirebaseMessage from '@react-native-firebase/messaging';
import * as Audio from 'react-native-audio-recorder-player';
import * as DocumentPicker from 'react-native-document-picker';
import * as FileAccess from 'react-native-file-access';
import * as ImagePicker from 'react-native-image-picker';
import * as Permissions from 'react-native-permissions';
import VideoComponent from 'react-native-video';
import { languageCodes } from '../i18n';
import { createDefaultStringSet } from '../i18n/StringSet';
import { Services } from '../services';
import { useLightTheme } from '../theme';
import { getSystemLanguage } from '../utils';
const getDefaultLanguage = () => {
  let ret;
  const systemLanguage = getSystemLanguage();
  if (systemLanguage !== null && systemLanguage !== void 0 && systemLanguage.startsWith('zh')) {
    ret = 'zh-Hans';
  } else if (systemLanguage !== null && systemLanguage !== void 0 && systemLanguage.startsWith('en')) {
    ret = 'en';
  } else {
    ret = require('../config.local').language;
  }
  return ret;
};
export const getLanguagePackage = (language, callback) => {
  let ret;
  if (callback) {
    ret = callback(language, createDefaultStringSet(language));
  } else {
    ret = createDefaultStringSet(language);
  }
  return ret;
};
export const getI18nLanguage = language => {
  let ret = language;
  if (language) {
    const isExisted = languageCodes.includes(language);
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
export const getTranslateLanguage = language => {
  let ret = language;
  if (language) {
    ret = language;
  } else {
    ret = getDefaultLanguage();
  }
  console.log('dev:language:tl:', ret);
  return ret;
};
export const getReleaseArea = releaseArea => {
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
export const getAvatarRadiusStyle = params => {
  if (params.releaseArea === 'china') {
    return 'extraSmall';
  } else {
    return 'extraLarge';
  }
};
export const getInputRadiusStyle = params => {
  if (params.releaseArea === 'china') {
    return 'extraSmall';
  } else {
    return 'extraLarge';
  }
};
export const getAlertRadiusStyle = params => {
  if (params.releaseArea === 'china') {
    return 'extraSmall';
  } else {
    return 'large';
  }
};
export const getBubbleRadiusStyle = params => {
  if (params.releaseArea === 'china') {
    return ['extraSmall'];
  } else {
    return ['extraSmall', 'medium', 'large'];
  }
};
export const useGetTheme = params => {
  const {
    palette,
    theme,
    releaseArea,
    avatar,
    input,
    alert,
    bubble
  } = params;
  const light = useLightTheme(palette, releaseArea);
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
export const useInitServices = props => {
  const {} = props;
  if (Services.cbs === undefined) {
    Services.createClipboardService({
      clipboard: Clipboard
    });
  }
  if (Services.ls === undefined) {
    Services.createLocalStorageService();
  }
  if (Services.ps === undefined) {
    Services.createPermissionService({
      permissions: Permissions,
      firebaseMessage: FirebaseMessage
    });
  }
  if (Services.ms === undefined) {
    Services.createMediaService({
      videoModule: VideoComponent,
      videoThumbnail: {},
      imagePickerModule: ImagePicker,
      documentPickerModule: DocumentPicker,
      mediaLibraryModule: MediaLibrary,
      fsModule: FileAccess,
      audioModule: Audio,
      permission: Services.ps
    });
  }
  if (Services.ns === undefined) {
    Services.createNotificationService({
      firebaseMessage: FirebaseMessage,
      permission: Services.ps
    });
  }
  if (Services.dcs === undefined) {
    Services.createDirCacheService({
      media: Services.ms
    });
  }
};
//# sourceMappingURL=Container.hook.js.map