"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.I18nContext = void 0;
exports.I18nContextProvider = I18nContextProvider;
exports.useI18nContext = useI18nContext;
var React = _interopRequireWildcard(require("react"));
var _StringSet = require("./StringSet");
var _Translate = require("./Translate");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Context of the I18n.
 */
const I18nContext = /*#__PURE__*/React.createContext(undefined);
exports.I18nContext = I18nContext;
I18nContext.displayName = 'UIKitI18nContext';

/**
 * Properties of the I18n context.
 */

/**
 * The I18n context's provider.
 */
function I18nContextProvider(_ref) {
  let {
    value,
    children
  } = _ref;
  const {
    assets,
    languageCode
  } = value;
  const t = new _Translate.TranslateImpl({
    assets: assets ?? _StringSet.createDefaultStringSet,
    type: languageCode
  });
  return /*#__PURE__*/React.createElement(I18nContext.Provider, {
    value: {
      tr: t.tr.bind(t),
      currentLanguage: t.currentLanguage.bind(t)
    }
  }, children);
}

/**
 * Get the I18n context's value.
 * @returns The I18n context's value.
 */
function useI18nContext() {
  const i18n = React.useContext(I18nContext);
  if (!i18n) throw Error(`${I18nContext.displayName} is not provided`);
  return i18n;
}
//# sourceMappingURL=i18n.js.map