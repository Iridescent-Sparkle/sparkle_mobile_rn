import * as React from 'react';
/**
 * Context of the config.
 */
export const ConfigContext = /*#__PURE__*/React.createContext(undefined);
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
export function ConfigContextProvider(props) {
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
export function useConfigContext() {
  const config = React.useContext(ConfigContext);
  if (!config) throw Error(`${ConfigContext.displayName} is not provided`);
  return config;
}
//# sourceMappingURL=Config.js.map