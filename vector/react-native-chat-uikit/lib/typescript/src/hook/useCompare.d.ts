/**
 * Compare whether the objects before and after rendering are the same.
 *
 * @example
 *
 * ```tsx
 * const cb = React.useCallback(() => {
 *   // ...
 * }, []);
 * useCompare(cb);
 * ```
 */
export declare function useCompare(object: any, others?: {
    callerName?: string;
    objectName?: string;
    enabled?: boolean;
}): void;
//# sourceMappingURL=useCompare.d.ts.map