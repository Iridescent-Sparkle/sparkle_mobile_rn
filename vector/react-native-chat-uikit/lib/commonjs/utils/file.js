"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.audioExtRegex = void 0;
exports.generateFileName = generateFileName;
exports.getFileDirectory = getFileDirectory;
exports.getFileExtension = getFileExtension;
exports.getFileType = void 0;
exports.idRuleCheck = idRuleCheck;
exports.imageExtRegex = void 0;
exports.passwordRuleCheck = passwordRuleCheck;
exports.pathIsInvalid = pathIsInvalid;
exports.urlIsValid = urlIsValid;
exports.videoExtRegex = void 0;
const imageExtRegex = /jpeg|jpg|png|webp|gif/i;
exports.imageExtRegex = imageExtRegex;
const audioExtRegex = /3gp|aac|aax|act|aiff|flac|gsm|m4a|m4b|m4p|tta|wma|mp3|webm|wav/i;
exports.audioExtRegex = audioExtRegex;
const videoExtRegex = /mov|vod|mp4|avi/i;
exports.videoExtRegex = videoExtRegex;
const getFileType = extOrType => {
  if (extOrType.indexOf('/') > -1) {
    const type = extOrType.split('/')[0];
    if (type === 'video') return 'video';
    if (type === 'audio') return 'audio';
    if (type === 'image') return 'image';
    return 'file';
  }
  if (extOrType.match(imageExtRegex)) return 'image';
  if (extOrType.match(audioExtRegex)) return 'audio';
  if (extOrType.match(videoExtRegex)) return 'video';
  return 'file';
};
exports.getFileType = getFileType;
function getFileExtension(filePath) {
  const idx = filePath.lastIndexOf('.');
  if (idx === -1) return '';
  return filePath.slice(idx - filePath.length).toLowerCase();
}
function getFileDirectory(filePath) {
  const idx = filePath.lastIndexOf('/');
  if (idx === -1) return '';
  return filePath.substring(0, idx);
}
function generateFileName(fileName, extension) {
  if (fileName.indexOf(extension) > -1) {
    return fileName;
  } else {
    if (extension.indexOf('.') === 0) {
      return `${fileName}${extension}`;
    } else {
      return `${fileName}.${extension}`;
    }
  }
}
function passwordRuleCheck() {
  return false;
}
function idRuleCheck() {
  return false;
}
function urlIsValid(url) {
  if (!url) return false;
  const regex = /^(http|https):\/\/[^ "]+$/;
  return regex.test(url);
}
function pathIsInvalid(url) {
  return url === undefined || url === null || url.trim().length === 0 || url.startsWith('http') === false && url.startsWith('file://') === false;
}
//# sourceMappingURL=file.js.map