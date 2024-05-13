"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClipboardServiceImplement = void 0;
class ClipboardServiceImplement {
  constructor(option) {
    this.option = option;
  }
  setString(text) {
    this.option.clipboard.setString(text);
  }
  getString() {
    return this.option.clipboard.getString();
  }
}
exports.ClipboardServiceImplement = ClipboardServiceImplement;
//# sourceMappingURL=ClipboardService.js.map