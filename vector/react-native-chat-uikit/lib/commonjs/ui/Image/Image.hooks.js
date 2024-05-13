"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIconSource = void 0;
var _assets = require("../../assets");
const getIconSource = (name, resolution) => {
  if (typeof name === 'number') {
    return name;
  } else {
    if (name === undefined || name === null) {
      return undefined;
    }
    return _assets.ICON_ASSETS[name](resolution ?? '3x');
  }
};
exports.getIconSource = getIconSource;
//# sourceMappingURL=Image.hooks.js.map