export class ClipboardServiceImplement {
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
//# sourceMappingURL=ClipboardService.js.map