"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocalStorageServiceImplement = void 0;
var _asyncStorage = _interopRequireDefault(require("@react-native-async-storage/async-storage"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class LocalStorageServiceImplement {
  getAllKeys() {
    return _asyncStorage.default.getAllKeys();
  }
  getItem(key) {
    return _asyncStorage.default.getItem(key);
  }
  setItem(key, value) {
    return _asyncStorage.default.setItem(key, value);
  }
  removeItem(key) {
    return _asyncStorage.default.removeItem(key);
  }
}
exports.LocalStorageServiceImplement = LocalStorageServiceImplement;
//# sourceMappingURL=LocalStorageService.js.map