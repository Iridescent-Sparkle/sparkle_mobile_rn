"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPresetPalette = createPresetPalette;
exports.usePresetPalette = usePresetPalette;
var React = _interopRequireWildcard(require("react"));
var _palette = require("./palette");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Preset parameters of the palette.
 */
const presetParams = {
  colors: {
    primary: 203,
    secondary: 155,
    error: 350,
    neutral: 203,
    neutralSpecial: 220
  }
};

/**
 * Create a palette object.
 *
 * primary.6: 'hsla(203, 100%, 60%, 1)'
 * primary.2: 'hsla(203, 100%, 20%, 1)'
 * secondary.6: 'hsla(155, 100%, 60%, 1)'
 * error.6: 'hsla(350, 100%, 60%, 1)'
 * neutral.0: 'hsla(0, 0%, 0%, 1)'
 * neutral.1: 'hsla(203, 8%, 10%, 1)'
 * neutral.2: 'hsla(203, 8%, 20%, 1)'
 * neutral.3: 'hsla(203, 8%, 30%, 1)'
 * neutral.98: 'hsla(203, 8%, 98%, 1)'
 * neutral.8: 'hsla(203, 8%, 80%, 1)'
 * neutralSpecial.6: 'hsla(220, 36%, 60%, 1)'
 * neutral.4: 'hsla(203, 8%, 40%, 1)'
 *
 * primary.6: 'hsla(203, 100%, 60%, 1)'
 * primary.95: 'hsla(203, 100%, 95%, 1)'
 * secondary.4: 'hsla(155, 100%, 40%, 1)'
 * error.5: 'hsla(350, 100%, 50%, 1)'
 * neutral.100: 'hsla(0, 0%, 100%, 1)'
 * neutral.98: 'hsla(203, 8%, 98%, 1)'
 * neutral.95: 'hsla(203, 8%, 95%, 1)'
 * neutral.9: 'hsla(203, 8%, 90%, 1)'
 * neutral.1: 'hsla(203, 8%, 10%, 1)'
 * neutral.3: 'hsla(203, 8%, 30%, 1)'
 * neutralSpecial.5: 'hsla(220, 36%, 50%, 1)'
 * neutral.7: 'hsla(203, 8%, 70%, 1)'
 * neutral.8: 'hsla(203, 8%, 80%, 1)'
 *
 * @returns The palette object.
 */
function createPresetPalette() {
  return (0, _palette.createPalette)(presetParams);
}

/**
 * Create a `Palette` object through the cache's `createPalette` method.
 * @returns The preset Palette.
 */
function usePresetPalette() {
  const params = React.useMemo(() => presetParams, []);
  const {
    createPalette
  } = (0, _palette.useCreatePalette)(params);
  return createPalette();
}
//# sourceMappingURL=palette.preset.js.map