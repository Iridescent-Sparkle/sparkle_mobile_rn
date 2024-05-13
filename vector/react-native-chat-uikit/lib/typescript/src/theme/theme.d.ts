import * as React from 'react';
import type { createThemeParams, Theme } from './types';
/**
 * Context of the Theme.
 */
export declare const ThemeContext: React.Context<Theme | undefined>;
/**
 * Properties of the Theme context.
 */
type ThemeContextProps = React.PropsWithChildren<{
    value: Theme;
}>;
/**
 * The Theme context's provider.
 */
export declare function ThemeContextProvider({ value, children }: ThemeContextProps): JSX.Element;
/**
 * Get the Theme context's value.
 * @returns The Theme context's value.
 */
export declare function useThemeContext(): Theme;
/**
 * Create a Theme.
 *
 * For a shortcut to create a `dark` theme, see `createDarkTheme`.
 *
 * For a shortcut to create a `light` theme, see `createLightTheme`.
 *
 * @param params - The parameters to create a Theme. {@link createThemeParams}
 * @returns The Theme.
 */
export declare function createTheme(params: createThemeParams): Theme;
/**
 * Create a Theme' hook.
 *
 * Cache the `createTheme` function.
 *
 * @param params - The parameters to create a Theme. {@link createThemeParams}
 * @returns The `createTheme` function.
 */
export declare function useCreateTheme(params: createThemeParams): {
    createTheme: () => Theme;
};
export {};
//# sourceMappingURL=theme.d.ts.map