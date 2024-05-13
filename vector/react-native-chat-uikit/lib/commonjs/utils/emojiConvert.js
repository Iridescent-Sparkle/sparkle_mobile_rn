"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emoji = void 0;
var _twemoji = _interopRequireDefault(require("twemoji"));
var _assets = require("../assets");
var _EmojiList = require("../biz/EmojiList/EmojiList.const");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Convert text into emoji text.
 *
 * @param text Text with original symbols.
 * @returns Text with emoji symbols.
 *
 * @example
 *
 * input: U+1F644U+1F910U+1F644U+1F62DU+1F610U+1F610U+1F62DU+1F610U+1F62DU+1F610U+1F62DU+1F641U+1F641U+1F62DU+1F641U+1F62DU+1F62DU+1F610iknbbvvjbff
 *
 * output: 🙄🤐🙄😭😐😐😭😐😭😐😭🙁🙁😭🙁😭😭😐iknbbvvjbff
 */
function toCodePointText(text) {
  let tmp = text;
  for (const key of gEmojiList) {
    // tmp.replaceAll(key, _emoji.convert.fromCodePoint(key.substring(2)));
    const keyTmp = key.replace('+', '\\+');
    tmp = tmp.replace(new RegExp(keyTmp, 'g'), _twemoji.default.convert.fromCodePoint(key.substring(2)));
  }
  return tmp;
}

/**
 * Convert emoji text into text. Just the opposite of `toCodePointText`.
 * @param text Text with emoji symbols.
 * @returns Text with original symbols.
 *
 * @example
 *
 * input: 🙄🤐🙄😭😐😐😭😐😭😐😭🙁🙁😭🙁😭😭😐iknbbvvjbff
 *
 * output: U+1F644U+1F910U+1F644U+1F62DU+1F610U+1F610U+1F62DU+1F610U+1F62DU+1F610U+1F62DU+1F641U+1F641U+1F62DU+1F641U+1F62DU+1F62DU+1F610iknbbvvjbff
 */
function fromCodePointText(text) {
  let tmp = text;
  for (const key of gEmojiListUTF16) {
    tmp = tmp.replace(new RegExp(key, 'g'), 'U+' + _twemoji.default.convert.toCodePoint(key).toUpperCase());
  }
  return tmp;
}
let gEmojiList = _assets.FACE_ASSETS;
let gEmojiListUTF16 = _EmojiList.FACE_ASSETS_UTF16;

/**
 * If you want to use a custom emoticon, calling this method will replace the built-in default emoticon list.
 *
 * @param list The list of emoji expressions. {@link FACE_ASSETS}
 */
function setEmojiList(list) {
  gEmojiList = list;
  gEmojiListUTF16 = gEmojiList.map(v => {
    return _twemoji.default.convert.fromCodePoint(v.substring(2));
  });
}
const emoji = {
  toCodePointText: toCodePointText,
  fromCodePointText: fromCodePointText,
  setEmojiList: setEmojiList
};
exports.emoji = emoji;
//# sourceMappingURL=emojiConvert.js.map