import { Platform } from 'react-native';
export class PermissionServiceImplement {
  constructor(option) {
    this.option = option;
  }
  resultReduction(stats, limitedCallback) {
    return Object.values(stats).every(result => {
      if (result === 'granted') return true;
      if (result === 'limited') {
        limitedCallback === null || limitedCallback === void 0 ? void 0 : limitedCallback();
        return true;
      }
      return false;
    });
  }
  getAndroidMediaPermissions(permission) {
    if (Platform.OS !== 'android') return [];
    if (Platform.Version > 32) {
      return [permission.PERMISSIONS.ANDROID.READ_MEDIA_AUDIO, permission.PERMISSIONS.ANDROID.READ_MEDIA_IMAGES, permission.PERMISSIONS.ANDROID.READ_MEDIA_VIDEO];
    }
    if (Platform.Version > 28) {
      return [permission.PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE];
    }
    return [permission.PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE, permission.PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE];
  }
  async cameraAndMic(check) {
    const s = this.option.permissions;
    const cameraPermissions = Platform.select({
      ios: [s.PERMISSIONS.IOS.CAMERA, s.PERMISSIONS.IOS.MICROPHONE],
      android: [s.PERMISSIONS.ANDROID.CAMERA, s.PERMISSIONS.ANDROID.RECORD_AUDIO],
      default: []
    });
    return this.resultReduction(await check(cameraPermissions), () => {});
  }
  async location(check) {
    const s = this.option.permissions;
    const locationPermissions = Platform.select({
      ios: [s.PERMISSIONS.IOS.LOCATION_WHEN_IN_USE],
      android: [s.PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION],
      default: []
    });
    return this.resultReduction(await check(locationPermissions), () => {});
  }
  async media(check) {
    const s = this.option.permissions;
    const locationPermissions = Platform.select({
      ios: [s.PERMISSIONS.IOS.PHOTO_LIBRARY],
      android: this.getAndroidMediaPermissions(this.option.permissions),
      default: []
    });
    return this.resultReduction(await check(locationPermissions), () => {});
  }
  async hasCameraAndMicPermission() {
    return this.cameraAndMic(this.option.permissions.checkMultiple);
  }
  async requestCameraAndMicPermission() {
    return this.cameraAndMic(this.option.permissions.requestMultiple);
  }
  hasLocationPermission() {
    return this.location(this.option.permissions.checkMultiple);
  }
  requestLocationPermission() {
    return this.location(this.option.permissions.requestMultiple);
  }
  hasMediaLibraryPermission() {
    return this.media(this.option.permissions.checkMultiple);
  }
  requestMediaLibraryPermission() {
    return this.media(this.option.permissions.requestMultiple);
  }
  async hasNotificationPermission() {
    if (Platform.OS === 'android') {
      const s = await this.option.permissions.checkNotifications();
      return s.status === 'granted';
    } else if (Platform.OS === 'ios') {
      const s = this.option.firebaseMessage();
      const status = await s.hasPermission();
      const authorizedStatus = [this.option.firebaseMessage.AuthorizationStatus.AUTHORIZED, this.option.firebaseMessage.AuthorizationStatus.PROVISIONAL];
      return authorizedStatus.includes(status);
    }
    return false;
  }
  async requestNotificationPermission() {
    if (Platform.OS === 'android') {
      const s = await this.option.permissions.requestNotifications(['alert', 'badge', 'sound', 'criticalAlert', 'provisional', 'providesAppSettings', 'carPlay']);
      return s.status === 'granted';
    } else if (Platform.OS === 'ios') {
      const s = this.option.firebaseMessage();
      const status = await s.requestPermission();
      const authorizedStatus = [this.option.firebaseMessage.AuthorizationStatus.AUTHORIZED, this.option.firebaseMessage.AuthorizationStatus.PROVISIONAL];
      return authorizedStatus.includes(status);
    }
    return false;
  }
}
//# sourceMappingURL=PermissionService.js.map