"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaletteContext = void 0;
exports.PaletteContextProvider = PaletteContextProvider;
exports.createPalette = createPalette;
exports.useCreatePalette = useCreatePalette;
exports.usePaletteContext = usePaletteContext;
var React = _interopRequireWildcard(require("react"));
var _generate = require("./generate.color");
var _generate2 = require("./generate.cr");
var _generate3 = require("./generate.font");
var _generate4 = require("./generate.gradient");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Context of the Palette.
 */
const PaletteContext = /*#__PURE__*/React.createContext(undefined);
exports.PaletteContext = PaletteContext;
PaletteContext.displayName = 'UIKitPaletteContextContext';

/**
 * Properties of the Palette context.
 */

/**
 * The Palette context's provider.
 */
function PaletteContextProvider(_ref) {
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
function usePaletteContext() {
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
function createPalette(params) {
  const {
    colors
  } = params;
  return {
    colors: {
      primary: (0, _generate.generatePrimaryColor)(colors.primary),
      secondary: (0, _generate.generatePrimaryColor)(colors.secondary),
      error: (0, _generate.generatePrimaryColor)(colors.error),
      neutral: (0, _generate.generateNeutralColor)(colors.neutral),
      neutralSpecial: (0, _generate.generateNeutralSpecialColor)(colors.neutralSpecial),
      barrage: {
        onLight: (0, _generate.generateBarrageColor)('light'),
        onDark: (0, _generate.generateBarrageColor)('dark')
      }
    },
    fonts: {
      headline: (0, _generate3.generateHeadlineFont)(),
      title: (0, _generate3.generateTitleFont)(),
      label: (0, _generate3.generateLabelFont)(),
      body: (0, _generate3.generateBodyFont)()
    },
    lineGradient: {
      topToBottom: (0, _generate4.generateLineGradientPoint)('topToBottom'),
      bottomToTop: (0, _generate4.generateLineGradientPoint)('bottomToTop'),
      leftToRight: (0, _generate4.generateLineGradientPoint)('leftToRight'),
      rightToLeft: (0, _generate4.generateLineGradientPoint)('rightToLeft'),
      leftTopToRightBottom: (0, _generate4.generateLineGradientPoint)('leftTopToRightBottom'),
      leftBottomToRightTop: (0, _generate4.generateLineGradientPoint)('leftBottomToRightTop'),
      rightTopToLeftBottom: (0, _generate4.generateLineGradientPoint)('rightTopToLeftBottom'),
      rightBottomToLeftTop: (0, _generate4.generateLineGradientPoint)('rightBottomToLeftTop')
    },
    cornerRadius: {
      extraSmall: (0, _generate2.generateExtraSmallCornerRadius)(),
      small: (0, _generate2.generateSmallCornerRadius)(),
      medium: (0, _generate2.generateMediumCornerRadius)(),
      large: (0, _generate2.generateLargeCornerRadius)()
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
function useCreatePalette(params) {
  const palette = React.useMemo(() => createPalette(params), [params]);
  return {
    createPalette: () => palette
  };
}
//# sourceMappingURL=palette.js.map