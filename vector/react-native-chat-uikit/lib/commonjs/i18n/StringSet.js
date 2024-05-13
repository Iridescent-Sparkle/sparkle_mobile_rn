"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDefaultStringSet = createDefaultStringSet;
var _StringSet = require("./StringSet.cn");
var _StringSet2 = require("./StringSet.en");
function createDefaultStringSet(type) {
  switch (type) {
    case 'en':
      return (0, _StringSet2.createStringSetEn)();
    case 'zh-Hans':
      return (0, _StringSet.createStringSetCn)();
    default:
      return (0, _StringSet2.createStringSetEn)();
  }
}
//# sourceMappingURL=StringSet.js.map