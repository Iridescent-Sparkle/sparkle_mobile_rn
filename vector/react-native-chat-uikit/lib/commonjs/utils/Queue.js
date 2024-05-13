"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Queue = void 0;
/**
 * ref: https://juejin.cn/post/7095608521110061064
 */
class Queue {
  constructor() {
    this.items = [];
  }
  enqueue(element) {
    this.items.push(element);
  }
  dequeue() {
    return this.items.shift();
  }
  front() {
    return this.items[0];
  }
  isEmpty() {
    return this.items.length === 0;
  }
  size() {
    return this.items.length;
  }
  toString() {
    let ret = '';
    for (const item of this.items) {
      var _i$toString;
      const i = item;
      ret += i === null || i === void 0 ? void 0 : (_i$toString = i.toString) === null || _i$toString === void 0 ? void 0 : _i$toString.call(i);
    }
    return ret;
  }
}
exports.Queue = Queue;
//# sourceMappingURL=Queue.js.map