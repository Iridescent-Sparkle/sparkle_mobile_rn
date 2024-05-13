"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gCountPerRow = exports.gAspectRatio = exports.FACE_ASSETS_UTF16 = void 0;
var _twemoji = _interopRequireDefault(require("twemoji"));
var _assets = require("../../assets");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const gAspectRatio = 300 / 390;
exports.gAspectRatio = gAspectRatio;
const gCountPerRow = 7;
exports.gCountPerRow = gCountPerRow;
const FACE_ASSETS_UTF16 = _assets.FACE_ASSETS.map(v => {
  return _twemoji.default.convert.fromCodePoint(v.substring(2));
});
exports.FACE_ASSETS_UTF16 = FACE_ASSETS_UTF16;
//# sourceMappingURL=EmojiList.const.js.map