import * as React from 'react';
import type { createPaletteParams, Palette } from './types';
/**
 * Context of the Palette.
 */
export declare const PaletteContext: React.Context<Palette | undefined>;
/**
 * Properties of the Palette context.
 */
type PaletteContextProps = React.PropsWithChildren<{
    value: Palette;
}>;
/**
 * The Palette context's provider.
 */
export declare function PaletteContextProvider({ value, children, }: PaletteContextProps): JSX.Element;
/**
 * Get the Palette context's value.
 * @returns The Palette context's value.
 */
export declare function usePaletteContext(): Palette;
/**
 * Create a Palette.
 *
 * Create a default Palette. {@link createPresetPalette}
 *
 * @param params - The parameters to create a Palette. {@link createPaletteParams}
 * @returns The Palette.
 */
export declare function createPalette(params: createPaletteParams): Palette;
/**
 * Create a Palette' hook.
 *
 * Create a default Palette. see {@link usePresetPalette}
 *
 * Cache the `createPalette` function.
 *
 * @param params - The parameters to create a Palette. {@link createPaletteParams}
 * @returns The `createPalette` function.
 */
export declare function useCreatePalette(params: createPaletteParams): {
    createPalette: () => Palette;
};
export {};
//# sourceMappingURL=palette.d.ts.map