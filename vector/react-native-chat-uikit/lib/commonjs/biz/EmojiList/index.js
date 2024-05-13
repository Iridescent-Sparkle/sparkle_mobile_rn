"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  FACE_ASSETS_UTF16: true
};
Object.defineProperty(exports, "FACE_ASSETS_UTF16", {
  enumerable: true,
  get: function () {
    return _EmojiList2.FACE_ASSETS_UTF16;
  }
});
var _EmojiList = require("./EmojiList");
Object.keys(_EmojiList).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _EmojiList[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _EmojiList[key];
    }
  });
});
var _EmojiList2 = require("./EmojiList.const");
var _EmojiListFloatButton = require("./EmojiListFloatButton");
Object.keys(_EmojiListFloatButton).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _EmojiListFloatButton[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _EmojiListFloatButton[key];
    }
  });
});
//# sourceMappingURL=index.js.map