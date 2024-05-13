import { Platform } from 'react-native';
export class NotificationServiceImplement {
  constructor(option) {
    this.option = option;
  }
  async getAPNSToken() {
    const hasPermission = await this.option.permission.hasNotificationPermission();
    if (!hasPermission) {
      const granted = await this.option.permission.requestNotificationPermission();
      if (!granted) throw new Error('Permission not granted');
    }
    const s = this.option.firebaseMessage();
    return s.getAPNSToken();
  }
  async getFCMToken() {
    const hasPermission = await this.option.permission.hasNotificationPermission();
    if (!hasPermission) {
      const granted = await this.option.permission.requestNotificationPermission();
      if (!granted) throw new Error('Permission not granted');
    }
    const s = this.option.firebaseMessage();
    return s.getToken();
  }
  onTokenRefresh(handler) {
    const s = this.option.firebaseMessage();
    return s.onTokenRefresh(token => {
      if (Platform.OS === 'android') handler(token);
    });
  }
}
//# sourceMappingURL=NotificationService.js.map