"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createLightTheme = createLightTheme;
exports.useLightTheme = useLightTheme;
var React = _interopRequireWildcard(require("react"));
var _theme = require("./theme");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Create a light Theme.
 * @param palette - The palette of the Theme. {@link Palette}
 * @returns The light Theme.
 */
function createLightTheme(palette, releaseArea) {
  return (0, _theme.createTheme)({
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
function useLightTheme(palette, releaseArea) {
  const params = React.useMemo(() => {
    return {
      palette,
      themeType: 'light',
      releaseArea
    };
  }, [palette, releaseArea]);
  const {
    createTheme
  } = (0, _theme.useCreateTheme)(params);
  return createTheme();
}
//# sourceMappingURL=theme.light.js.map