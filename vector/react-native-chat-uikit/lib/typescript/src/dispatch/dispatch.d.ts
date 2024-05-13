import * as React from 'react';
import type { DispatchApi, DispatchInit } from './types';
/**
 * Context of the dispatch.
 */
export declare const DispatchContext: React.Context<DispatchApi | undefined>;
/**
 * Properties of the dispatch context.
 */
type DispatchContextProps = React.PropsWithChildren<{
    value?: DispatchInit;
}>;
/**
 * The dispatch context's provider.
 * @param param0 {@link DispatchContextProps}
 * @returns The Dispatch Provider
 */
export declare function DispatchContextProvider({ children }: DispatchContextProps): JSX.Element;
/**
 * The dispatch context's hook.
 * @returns dispatch {@link DispatchApi}
 */
export declare function useDispatchContext(): DispatchApi;
export {};
//# sourceMappingURL=dispatch.d.ts.map