"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sequence = void 0;
exports.seqId = seqId;
class Sequence {
  static aa = new Map();
  static sequenceId(key) {
    const r = Sequence.aa.get(key);
    let c = 0;
    if (r === undefined) {
      c = 1;
    } else {
      c = r + 1;
      if (c > 65535) {
        c = 1;
      }
    }
    Sequence.aa.set(key, c);
    return c;
  }
}

/**
 * Generate a sequence id.
 * @ref https://beta.reactjs.org/apis/react/useId#useid
 * @returns id
 */
exports.Sequence = Sequence;
function seqId() {
  let key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '_global';
  return Sequence.sequenceId(key);
}
//# sourceMappingURL=Sequence.js.map