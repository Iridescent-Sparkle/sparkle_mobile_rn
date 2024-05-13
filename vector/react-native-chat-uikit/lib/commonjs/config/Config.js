"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigContext = void 0;
exports.ConfigContextProvider = ConfigContextProvider;
exports.useConfigContext = useConfigContext;
var React = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Context of the config.
 */
const ConfigContext = /*#__PURE__*/React.createContext(undefined);
exports.ConfigContext = ConfigContext;
ConfigContext.displayName = 'UIKitConfigContext';

/**
 * Properties of the config context.
 */

/**
 * The config context's provider.
 *
 * @param props {@link ConfigContextProps}
 * @returns
 */
function ConfigContextProvider(props) {
  const {
    children,
    value
  } = props;
  return /*#__PURE__*/React.createElement(ConfigContext.Provider, {
    value: value
  }, children);
}

/**
 * The config context's hook.
 *
 * @returns Config {@link Config}
 */
function useConfigContext() {
  const config = React.useContext(ConfigContext);
  if (!config) throw Error(`${ConfigContext.displayName} is not provided`);
  return config;
}
//# sourceMappingURL=Config.js.map