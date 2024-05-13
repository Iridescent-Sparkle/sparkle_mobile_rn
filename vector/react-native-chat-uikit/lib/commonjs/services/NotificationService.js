"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotificationServiceImplement = void 0;
var _reactNative = require("react-native");
class NotificationServiceImplement {
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
      if (_reactNative.Platform.OS === 'android') handler(token);
    });
  }
}
exports.NotificationServiceImplement = NotificationServiceImplement;
//# sourceMappingURL=NotificationService.js.map