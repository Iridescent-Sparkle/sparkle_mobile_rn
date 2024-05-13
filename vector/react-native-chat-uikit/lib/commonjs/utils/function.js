"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.callbackToAsync = exports.asyncTask = exports.arraySort = void 0;
exports.getCurTs = getCurTs;
exports.hashCode = hashCode;
exports.once = once;
exports.once2 = once2;
exports.onceT = onceT;
exports.wait = exports.versionToArray = exports.timeoutTask = exports.queueTask = void 0;
/* eslint-disable no-bitwise */
const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};
exports.wait = wait;
const asyncTask = function (f) {
  try {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    setImmediate(f, args);
  } catch (error) {
    console.warn('asyncTask:', error);
  }
};
exports.asyncTask = asyncTask;
const timeoutTask = function (timeout, f) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    args[_key2 - 2] = arguments[_key2];
  }
  try {
    setTimeout(() => f(args), timeout);
  } catch (error) {
    console.warn('queueTask:', error);
  }
};
exports.timeoutTask = timeoutTask;
const queueTask = function (f) {
  for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }
  try {
    queueMicrotask(() => f(args));
  } catch (error) {
    console.warn('queueTask:', error);
  }
};
exports.queueTask = queueTask;
const arraySort = list => {
  list.sort((a, b) => {
    if (a.key > b.key) {
      return 1;
    } else if (a.key < b.key) {
      return -1;
    }
    return 0;
  });
};

// from: https://www.cnblogs.com/Wayou/p/typescript_infer.html
// type PromiseType<T> = (...args: any[]) => Promise<T>;
// type UnPromisify<T> = T extends PromiseType<infer U> ? U : never;
// const s = async function sss() {
//   return '';
// };
// export let sss: UnPromisify<typeof s>;

/**
 * Example:
 * ```typescript
 * callbackToAsync(
 *   alphabetListRef.current.measure,
 *   (
 *     x: number,
 *     y: number,
 *     width: number,
 *     height: number,
 *     pageX: number,
 *     pageY: number
 *   ) => {
 *     console.log('measure:', x, y, width, height, pageX, pageY);
 *     listYRef.current = pageY;
 *   }
 * );
 * ```
 * @param f any sync function.
 * @param args It can be any parameter, including callback parameters.
 * @returns callback result.
 */
exports.arraySort = arraySort;
const callbackToAsync = function (f, cb) {
  for (var _len4 = arguments.length, args = new Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
    args[_key4 - 2] = arguments[_key4];
  }
  const r = new Promise((success, fail) => {
    try {
      const r = f(cb, ...args);
      success(r);
    } catch (e) {
      fail(e);
    }
  });
  return r;
};
exports.callbackToAsync = callbackToAsync;
const versionToArray = version => {
  return version.split('.').map(v => parseInt(v, 10));
};

/**
 * Creates a throttled function that only invokes `fn` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `fn` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `fn`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `fn` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `fn` invocation.
 *
 * ref: [here](../../../../.yarn/releases/yarn-1.22.19.cjs)
 *
 * Examples: [here](../../../../example/src/__dev__/test_util.tsx)
 *
 * function once (fn) {
 *   var f = function () {
 *     if (f.called) return f.value
 *     f.called = true
 *     return f.value = fn.apply(this, arguments)
 *   }
 *   f.called = false
 *   return f
 * }
 *
 * @param fn any function
 * @param args any arguments
 * @returns Returns the result of the function call.
 */
exports.versionToArray = versionToArray;
function once(fn) {
  for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    args[_key5 - 1] = arguments[_key5];
  }
  let f = function () {
    if (f.called) return f.value;
    f.called = true;
    return f.value = fn.apply(f, args);
  };
  f.called = false;
  return f;
}
function once2(fn) {
  let f = function () {
    if (f.called) return f.value;
    f.called = true;
    for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      args[_key6] = arguments[_key6];
    }
    return f.value = fn.apply(f, args);
  };
  f.called = false;
  return f;
}
function onceT(fn) {
  let f = function () {
    if (f.called) return f.value;
    f.called = true;
    for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
      args[_key7] = arguments[_key7];
    }
    return f.value = fn.apply(f, args);
  };
  f.called = false;
  return f;
}

/**
 * Returns the hash value of a string.
 *
 * @param str The string content.
 * @returns The hash value.
 */
function hashCode(str) {
  let hash = 0,
    i,
    chr;
  if (str === undefined || str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }

  return hash;
}

/**
 * Get the current timestamp.
 * @param type Returns a timestamp in milliseconds or seconds. Returns a timestamp in milliseconds by default.
 * @returns The current timestamp.
 */
function getCurTs(type) {
  return Math.round(type === 's' ? new Date().getTime() / 1000 : new Date().getTime());
}
//# sourceMappingURL=function.js.map