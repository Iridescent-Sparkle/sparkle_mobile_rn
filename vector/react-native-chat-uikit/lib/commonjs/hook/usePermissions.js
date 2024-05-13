"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePermissions = usePermissions;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _utils = require("../utils");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function usePermissions() {
  const checkAndRequestPermissions = React.useCallback(async params => {
    const {
      onResult
    } = params;
    if (_reactNative.Platform.OS === 'ios') {
      onResult(true);
    } else if (_reactNative.Platform.OS === 'android') {
      let ret = await (0, _utils.checkRecordPermission)();
      if (ret !== true) {
        ret = await (0, _utils.requestRecordPermission)();
        if (ret !== true) {
          onResult(false);
          return;
        }
      }
      ret = await (0, _utils.checkCameraPermission)();
      if (ret !== true) {
        ret = await (0, _utils.requestCameraPermission)();
        if (ret !== true) {
          onResult(false);
          return;
        }
      }
      ret = await (0, _utils.checkStoragePermission)();
      if (ret !== true) {
        ret = await (0, _utils.requestStoragePermission)();
        if (ret !== true) {
          onResult(false);
          return;
        }
      }
      onResult(true);
    } else {
      onResult(false);
    }
  }, []);
  return {
    getPermission: checkAndRequestPermissions
  };
}
//# sourceMappingURL=usePermissions.js.map