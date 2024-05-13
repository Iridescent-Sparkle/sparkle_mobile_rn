import { CreateStringSet, LanguageCode, StringSet } from '../i18n';
import { CornerRadiusPaletteType, Palette, Theme } from '../theme';
import type { ReleaseArea } from '../types';
import type { ContainerProps } from './types';
export declare const getLanguagePackage: (language: LanguageCode, callback?: ((language: LanguageCode, defaultSet: StringSet) => CreateStringSet | StringSet) | undefined) => StringSet | CreateStringSet;
export declare const getI18nLanguage: (language?: LanguageCode) => LanguageCode;
export declare const getTranslateLanguage: (language?: LanguageCode) => LanguageCode;
export declare const getReleaseArea: (releaseArea?: ReleaseArea) => ReleaseArea;
export declare const getAvatarRadiusStyle: (params: {
    releaseArea?: ReleaseArea;
}) => CornerRadiusPaletteType;
export declare const getInputRadiusStyle: (params: {
    releaseArea?: ReleaseArea;
}) => CornerRadiusPaletteType;
export declare const getAlertRadiusStyle: (params: {
    releaseArea?: ReleaseArea;
}) => CornerRadiusPaletteType;
export declare const getBubbleRadiusStyle: (params: {
    releaseArea?: ReleaseArea;
}) => CornerRadiusPaletteType[];
export declare const useGetTheme: (params: {
    palette: Palette;
    theme?: Theme;
    releaseArea?: ReleaseArea;
    avatar?: {
        borderRadiusStyle?: CornerRadiusPaletteType;
    };
    input?: {
        borderRadiusStyle?: CornerRadiusPaletteType;
    };
    alert?: {
        borderRadiusStyle?: CornerRadiusPaletteType;
    };
    bubble?: {
        borderRadiusStyle?: CornerRadiusPaletteType[];
    };
}) => Theme;
export declare const useInitServices: (props: ContainerProps) => void;
//# sourceMappingURL=Container.hook.d.ts.map