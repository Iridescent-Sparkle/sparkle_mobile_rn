import type { ErrorCode } from './code';
import type { ErrorDescription } from './desc';
/**
 * Error Object.
 *
 * The object can be returned to the user through a callback method or by throwing.
 */
export declare class UIKitError extends Error {
    code: ErrorCode;
    tag?: string;
    desc: ErrorDescription | string;
    /**
     * Constructor of UIKitError.
     * @params
     * - code: {@link ErrorCode}
     * - desc: {@link ErrorDescription}
     * - extra: string
     * - options: {@link ErrorOptions}
     */
    constructor(params: {
        code: ErrorCode;
        tag?: string;
        desc?: string;
        extra?: string;
        options?: ErrorOptions;
    });
    /**
     * Format `UIKitError` object.
     * @returns `UIKitError` of type string.
     */
    toString(): string;
}
//# sourceMappingURL=error.d.ts.map