import * as React from 'react';
import { generateBarrageColor, generateNeutralColor, generateNeutralSpecialColor, generatePrimaryColor } from './generate.color';
import { generateExtraSmallCornerRadius, generateLargeCornerRadius, generateMediumCornerRadius, generateSmallCornerRadius } from './generate.cr';
import { generateBodyFont, generateHeadlineFont, generateLabelFont, generateTitleFont } from './generate.font';
import { generateLineGradientPoint } from './generate.gradient';
/**
 * Context of the Palette.
 */
export const PaletteContext = /*#__PURE__*/React.createContext(undefined);
PaletteContext.displayName = 'UIKitPaletteContextContext';

/**
 * Properties of the Palette context.
 */

/**
 * The Palette context's provider.
 */
export function PaletteContextProvider(_ref) {
  let {
    value,
    children
  } = _ref;
  return /*#__PURE__*/React.createElement(PaletteContext.Provider, {
    value: value
  }, children);
}

/**
 * Get the Palette context's value.
 * @returns The Palette context's value.
 */
export function usePaletteContext() {
  const palette = React.useContext(PaletteContext);
  if (!palette) throw Error(`${PaletteContext.displayName} is not provided`);
  return palette;
}

/**
 * Create a Palette.
 *
 * Create a default Palette. {@link createPresetPalette}
 *
 * @param params - The parameters to create a Palette. {@link createPaletteParams}
 * @returns The Palette.
 */
export function createPalette(params) {
  const {
    colors
  } = params;
  return {
    colors: {
      primary: generatePrimaryColor(colors.primary),
      secondary: generatePrimaryColor(colors.secondary),
      error: generatePrimaryColor(colors.error),
      neutral: generateNeutralColor(colors.neutral),
      neutralSpecial: generateNeutralSpecialColor(colors.neutralSpecial),
      barrage: {
        onLight: generateBarrageColor('light'),
        onDark: generateBarrageColor('dark')
      }
    },
    fonts: {
      headline: generateHeadlineFont(),
      title: generateTitleFont(),
      label: generateLabelFont(),
      body: generateBodyFont()
    },
    lineGradient: {
      topToBottom: generateLineGradientPoint('topToBottom'),
      bottomToTop: generateLineGradientPoint('bottomToTop'),
      leftToRight: generateLineGradientPoint('leftToRight'),
      rightToLeft: generateLineGradientPoint('rightToLeft'),
      leftTopToRightBottom: generateLineGradientPoint('leftTopToRightBottom'),
      leftBottomToRightTop: generateLineGradientPoint('leftBottomToRightTop'),
      rightTopToLeftBottom: generateLineGradientPoint('rightTopToLeftBottom'),
      rightBottomToLeftTop: generateLineGradientPoint('rightBottomToLeftTop')
    },
    cornerRadius: {
      extraSmall: generateExtraSmallCornerRadius(),
      small: generateSmallCornerRadius(),
      medium: generateMediumCornerRadius(),
      large: generateLargeCornerRadius()
    }
  };
}

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
export function useCreatePalette(params) {
  const palette = React.useMemo(() => createPalette(params), [params]);
  return {
    createPalette: () => palette
  };
}
//# sourceMappingURL=palette.js.map