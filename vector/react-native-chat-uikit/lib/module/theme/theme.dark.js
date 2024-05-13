import * as React from 'react';
import { createTheme, useCreateTheme } from './theme';
/**
 * Create a dark Theme.
 * @param palette - The palette of the Theme. {@link Palette}
 * @returns The dark Theme.
 */
export function createDarkTheme(palette, releaseArea) {
  return createTheme({
    palette,
    themeType: 'dark',
    releaseArea
  });
}

/**
 * Create a dark Theme.
 * @param palette - The palette of the Theme. {@link Palette}
 * @returns The dark Theme.
 */
export function useDarkTheme(palette, releaseArea) {
  const params = React.useMemo(() => {
    return {
      palette,
      themeType: 'dark',
      releaseArea
    };
  }, [palette, releaseArea]);
  const {
    createTheme
  } = useCreateTheme(params);
  return createTheme();
}
//# sourceMappingURL=theme.dark.js.map