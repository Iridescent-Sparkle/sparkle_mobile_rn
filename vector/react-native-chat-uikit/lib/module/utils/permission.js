import { PermissionsAndroid } from 'react-native';
export async function requestCameraPermission() {
  return requestPermission('android.permission.CAMERA');
}
export function requestRecordPermission() {
  return requestPermission('android.permission.RECORD_AUDIO');
}
export async function requestStoragePermission() {
  const ret = await PermissionsAndroid.requestMultiple(['android.permission.READ_EXTERNAL_STORAGE', 'android.permission.WRITE_EXTERNAL_STORAGE']);
  return ret['android.permission.READ_EXTERNAL_STORAGE'] === 'granted' && ret['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted';
}
export async function requestPermission(permission) {
  const ret = await PermissionsAndroid.request(permission);
  return ret === 'granted';
}
export async function requestPermissions() {
  const ret = await PermissionsAndroid.requestMultiple(['android.permission.READ_EXTERNAL_STORAGE', 'android.permission.WRITE_EXTERNAL_STORAGE', 'android.permission.CAMERA', 'android.permission.RECORD_AUDIO']);
  return ret['android.permission.READ_EXTERNAL_STORAGE'] === 'granted' && ret['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted' && ret['android.permission.CAMERA'] === 'granted' && ret['android.permission.RECORD_AUDIO'] === 'granted';
}
export async function checkPermission(permission) {
  return await PermissionsAndroid.check(permission);
}
export async function checkPermissions() {
  const ret = await checkPermission('android.permission.READ_EXTERNAL_STORAGE');
  const ret2 = await checkPermission('android.permission.WRITE_EXTERNAL_STORAGE');
  const ret3 = await checkPermission('android.permission.CAMERA');
  const ret4 = await checkPermission('android.permission.RECORD_AUDIO');
  return ret === true && ret2 === true && ret3 === true && ret4 === true;
}
export async function checkCameraPermission() {
  return await checkPermission('android.permission.CAMERA');
}
export async function checkRecordPermission() {
  return await checkPermission('android.permission.RECORD_AUDIO');
}
export async function checkStoragePermission() {
  const ret = await checkPermission('android.permission.READ_EXTERNAL_STORAGE');
  const ret2 = await checkPermission('android.permission.WRITE_EXTERNAL_STORAGE');
  return ret === true && ret2 === true;
}
//# sourceMappingURL=permission.js.map