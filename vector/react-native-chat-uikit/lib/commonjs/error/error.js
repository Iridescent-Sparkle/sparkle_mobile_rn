"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UIKitError = void 0;
var _error = require("./error.impl");
/**
 * Error Object.
 *
 * The object can be returned to the user through a callback method or by throwing.
 */
class UIKitError extends Error {
  /**
   * Constructor of UIKitError.
   * @params
   * - code: {@link ErrorCode}
   * - desc: {@link ErrorDescription}
   * - extra: string
   * - options: {@link ErrorOptions}
   */
  constructor(params) {
    super(params.extra, params.options);
    this.code = params.code;
    this.tag = params.tag;
    this.desc = params.desc ?? (0, _error.getDescription)(this.code);

    // if (Error.captureStackTrace) {
    //   Error.captureStackTrace(this, UIKitError);
    // } else {
    //   this.stack = new Error(this.toString()).stack;
    // }
    // console.log(this.stack);
  }

  /**
   * Format `UIKitError` object.
   * @returns `UIKitError` of type string.
   */
  toString() {
    return `code: ${this.code}\n
    tag: ${this.tag}\n
    desc: ${this.desc}\n
    extra: ${this.message}`;
  }
}
exports.UIKitError = UIKitError;
//# sourceMappingURL=error.js.map