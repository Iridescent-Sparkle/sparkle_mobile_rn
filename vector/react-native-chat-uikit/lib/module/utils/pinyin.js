import { pinyin } from 'pinyin-pro';
export function getPinyinFirsLetter(str, def) {
  if (str === undefined || str === null) {
    return def ?? '#';
  }
  return pinyin(str, {
    toneType: 'none',
    pattern: 'first',
    v: true
  });
}
export function containsChinese(str) {
  const reg = /[\u4e00-\u9fa5]/;
  return reg.test(str);
}
//# sourceMappingURL=pinyin.js.map