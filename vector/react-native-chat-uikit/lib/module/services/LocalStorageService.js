import { default as storage } from '@react-native-async-storage/async-storage';
export class LocalStorageServiceImplement {
  getAllKeys() {
    return storage.getAllKeys();
  }
  getItem(key) {
    return storage.getItem(key);
  }
  setItem(key, value) {
    return storage.setItem(key, value);
  }
  removeItem(key) {
    return storage.removeItem(key);
  }
}
//# sourceMappingURL=LocalStorageService.js.map