export const imageExtRegex = /jpeg|jpg|png|webp|gif/i;
export const audioExtRegex = /3gp|aac|aax|act|aiff|flac|gsm|m4a|m4b|m4p|tta|wma|mp3|webm|wav/i;
export const videoExtRegex = /mov|vod|mp4|avi/i;
export const getFileType = extOrType => {
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
export function getFileExtension(filePath) {
  const idx = filePath.lastIndexOf('.');
  if (idx === -1) return '';
  return filePath.slice(idx - filePath.length).toLowerCase();
}
export function getFileDirectory(filePath) {
  const idx = filePath.lastIndexOf('/');
  if (idx === -1) return '';
  return filePath.substring(0, idx);
}
export function generateFileName(fileName, extension) {
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
export function passwordRuleCheck() {
  return false;
}
export function idRuleCheck() {
  return false;
}
export function urlIsValid(url) {
  if (!url) return false;
  const regex = /^(http|https):\/\/[^ "]+$/;
  return regex.test(url);
}
export function pathIsInvalid(url) {
  return url === undefined || url === null || url.trim().length === 0 || url.startsWith('http') === false && url.startsWith('file://') === false;
}
//# sourceMappingURL=file.js.map