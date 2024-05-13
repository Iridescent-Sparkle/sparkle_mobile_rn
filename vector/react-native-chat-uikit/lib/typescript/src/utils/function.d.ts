import type { Callback } from './types';
export declare const wait: (timeout: number) => Promise<unknown>;
export declare const asyncTask: (f: Callback, ...args: any[]) => void;
export declare const timeoutTask: (timeout: number, f: Callback, ...args: any[]) => void;
export declare const queueTask: (f: Callback, ...args: any[]) => void;
export declare const arraySort: <T extends {
    key: string;
}>(list: T[]) => void;
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
export declare const callbackToAsync: (f: Callback, cb: Callback, ...args: any[]) => Promise<unknown>;
export declare const versionToArray: (version: string) => number[];
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
export declare function once(fn: Callback, ...args: any[]): any;
export declare function once2(fn: Callback): any;
export declare function onceT<Callback extends (...args: any[]) => any>(fn: Callback): Callback;
/**
 * Returns the hash value of a string.
 *
 * @param str The string content.
 * @returns The hash value.
 */
export declare function hashCode(str?: string): number;
/**
 * Get the current timestamp.
 * @param type Returns a timestamp in milliseconds or seconds. Returns a timestamp in milliseconds by default.
 * @returns The current timestamp.
 */
export declare function getCurTs(type?: 'ms' | 's'): number;
//# sourceMappingURL=function.d.ts.map