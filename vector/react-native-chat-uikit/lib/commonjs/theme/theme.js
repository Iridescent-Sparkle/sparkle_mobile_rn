"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThemeContext = void 0;
exports.ThemeContextProvider = ThemeContextProvider;
exports.createTheme = createTheme;
exports.useCreateTheme = useCreateTheme;
exports.useThemeContext = useThemeContext;
var React = _interopRequireWildcard(require("react"));
var _generate = require("./generate.button");
var _generate2 = require("./generate.shadow");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Context of the Theme.
 */
const ThemeContext = /*#__PURE__*/React.createContext(undefined);
exports.ThemeContext = ThemeContext;
ThemeContext.displayName = 'UIKitThemeContext';

/**
 * Properties of the Theme context.
 */

/**
 * The Theme context's provider.
 */
function ThemeContextProvider(_ref) {
  let {
    value,
    children
  } = _ref;
  return /*#__PURE__*/React.createElement(ThemeContext.Provider, {
    value: value
  }, children);
}

/**
 * Get the Theme context's value.
 * @returns The Theme context's value.
 */
function useThemeContext() {
  const theme = React.useContext(ThemeContext);
  if (!theme) throw Error(`${ThemeContext.displayName} is not provided`);
  return theme;
}

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
function createTheme(params) {
  const {
    palette,
    themeType,
    releaseArea
  } = params;
  return {
    style: themeType,
    button: (0, _generate.generateButton)({
      palette: palette,
      themeType: themeType
    }),
    shadow: (0, _generate2.generateShadow)({
      palette: palette,
      themeType: themeType
    }),
    cornerRadius: {
      avatar: releaseArea === 'china' ? 'extraSmall' : 'extraLarge',
      alert: releaseArea === 'china' ? 'extraSmall' : 'large',
      input: releaseArea === 'china' ? 'extraSmall' : 'extraLarge',
      bubble: releaseArea === 'china' ? ['extraSmall'] : ['extraSmall', 'medium', 'extraLarge']
    }
  };
}

/**
 * Create a Theme' hook.
 *
 * Cache the `createTheme` function.
 *
 * @param params - The parameters to create a Theme. {@link createThemeParams}
 * @returns The `createTheme` function.
 */
function useCreateTheme(params) {
  const theme = React.useMemo(() => createTheme(params), [params]);
  return {
    createTheme: () => theme
  };
}
//# sourceMappingURL=theme.js.map