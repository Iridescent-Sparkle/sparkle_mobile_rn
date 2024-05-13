import * as React from 'react';
import type { Config } from './types';
/**
 * Context of the config.
 */
export declare const ConfigContext: React.Context<Config | undefined>;
/**
 * Properties of the config context.
 */
type ConfigContextProps = React.PropsWithChildren<{
    value: Config;
}>;
/**
 * The config context's provider.
 *
 * @param props {@link ConfigContextProps}
 * @returns
 */
export declare function ConfigContextProvider(props: ConfigContextProps): JSX.Element;
/**
 * The config context's hook.
 *
 * @returns Config {@link Config}
 */
export declare function useConfigContext(): Config;
export {};
//# sourceMappingURL=Config.d.ts.map