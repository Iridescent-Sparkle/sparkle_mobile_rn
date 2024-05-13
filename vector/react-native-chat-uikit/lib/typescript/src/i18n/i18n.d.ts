import * as React from 'react';
import type { I18nInit, I18nTr } from './types';
/**
 * Context of the I18n.
 */
export declare const I18nContext: React.Context<I18nTr | undefined>;
/**
 * Properties of the I18n context.
 */
type I18nContextProps = React.PropsWithChildren<{
    value: I18nInit;
}>;
/**
 * The I18n context's provider.
 */
export declare function I18nContextProvider({ value, children }: I18nContextProps): JSX.Element;
/**
 * Get the I18n context's value.
 * @returns The I18n context's value.
 */
export declare function useI18nContext(): I18nTr;
export {};
//# sourceMappingURL=i18n.d.ts.map