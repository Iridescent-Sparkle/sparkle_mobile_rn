import type { Callback } from '../utils';
/**
 * delayed call. If multiple identical calls are made in a short period of time, they will be merged into one call.
 *
 * @example
 *
 * ```tsx
 * const { delayExecTask: _deferSearch } = useDelayExecTask(
 *   1000,
 *   () => {
 *     // ...
 *   }
 * );
 * ```
 */
export declare function useDelayExecTask<F extends Callback>(delay: number, f: F): {
    delayExecTask: F;
};
//# sourceMappingURL=useDelayExecTask.d.ts.map