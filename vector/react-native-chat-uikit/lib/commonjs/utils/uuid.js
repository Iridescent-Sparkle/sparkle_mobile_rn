"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uuid = uuid;
var _pureUuid = _interopRequireDefault(require("pure-uuid"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function uuid() {
  return new _pureUuid.default(4).format();
}
//# sourceMappingURL=uuid.js.map