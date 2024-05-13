"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.containsChinese = containsChinese;
exports.getPinyinFirsLetter = getPinyinFirsLetter;
var _pinyinPro = require("pinyin-pro");
function getPinyinFirsLetter(str, def) {
  if (str === undefined || str === null) {
    return def ?? '#';
  }
  return (0, _pinyinPro.pinyin)(str, {
    toneType: 'none',
    pattern: 'first',
    v: true
  });
}
function containsChinese(str) {
  const reg = /[\u4e00-\u9fa5]/;
  return reg.test(str);
}
//# sourceMappingURL=pinyin.js.map