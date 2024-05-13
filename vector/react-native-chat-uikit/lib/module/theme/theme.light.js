import * as React from 'react';
import { createTheme, useCreateTheme } from './theme';
/**
 * Create a light Theme.
 * @param palette - The palette of the Theme. {@link Palette}
 * @returns The light Theme.
 */
export function createLightTheme(palette, releaseArea) {
  return createTheme({
    palette,
    themeType: 'light',
    releaseArea
  });
}

/**
 * Create a light Theme.
 * @param palette - The palette of the Theme. {@link Palette}
 * @returns The light Theme.
 */
export function useLightTheme(palette, releaseArea) {
  const params = React.useMemo(() => {
    return {
      palette,
      themeType: 'light',
      releaseArea
    };
  }, [palette, releaseArea]);
  const {
    createTheme
  } = useCreateTheme(params);
  return createTheme();
}
//# sourceMappingURL=theme.light.js.map