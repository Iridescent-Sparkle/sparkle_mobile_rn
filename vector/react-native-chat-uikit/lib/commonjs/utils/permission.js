"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkCameraPermission = checkCameraPermission;
exports.checkPermission = checkPermission;
exports.checkPermissions = checkPermissions;
exports.checkRecordPermission = checkRecordPermission;
exports.checkStoragePermission = checkStoragePermission;
exports.requestCameraPermission = requestCameraPermission;
exports.requestPermission = requestPermission;
exports.requestPermissions = requestPermissions;
exports.requestRecordPermission = requestRecordPermission;
exports.requestStoragePermission = requestStoragePermission;
var _reactNative = require("react-native");
async function requestCameraPermission() {
  return requestPermission('android.permission.CAMERA');
}
function requestRecordPermission() {
  return requestPermission('android.permission.RECORD_AUDIO');
}
async function requestStoragePermission() {
  const ret = await _reactNative.PermissionsAndroid.requestMultiple(['android.permission.READ_EXTERNAL_STORAGE', 'android.permission.WRITE_EXTERNAL_STORAGE']);
  return ret['android.permission.READ_EXTERNAL_STORAGE'] === 'granted' && ret['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted';
}
async function requestPermission(permission) {
  const ret = await _reactNative.PermissionsAndroid.request(permission);
  return ret === 'granted';
}
async function requestPermissions() {
  const ret = await _reactNative.PermissionsAndroid.requestMultiple(['android.permission.READ_EXTERNAL_STORAGE', 'android.permission.WRITE_EXTERNAL_STORAGE', 'android.permission.CAMERA', 'android.permission.RECORD_AUDIO']);
  return ret['android.permission.READ_EXTERNAL_STORAGE'] === 'granted' && ret['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted' && ret['android.permission.CAMERA'] === 'granted' && ret['android.permission.RECORD_AUDIO'] === 'granted';
}
async function checkPermission(permission) {
  return await _reactNative.PermissionsAndroid.check(permission);
}
async function checkPermissions() {
  const ret = await checkPermission('android.permission.READ_EXTERNAL_STORAGE');
  const ret2 = await checkPermission('android.permission.WRITE_EXTERNAL_STORAGE');
  const ret3 = await checkPermission('android.permission.CAMERA');
  const ret4 = await checkPermission('android.permission.RECORD_AUDIO');
  return ret === true && ret2 === true && ret3 === true && ret4 === true;
}
async function checkCameraPermission() {
  return await checkPermission('android.permission.CAMERA');
}
async function checkRecordPermission() {
  return await checkPermission('android.permission.RECORD_AUDIO');
}
async function checkStoragePermission() {
  const ret = await checkPermission('android.permission.READ_EXTERNAL_STORAGE');
  const ret2 = await checkPermission('android.permission.WRITE_EXTERNAL_STORAGE');
  return ret === true && ret2 === true;
}
//# sourceMappingURL=permission.js.map