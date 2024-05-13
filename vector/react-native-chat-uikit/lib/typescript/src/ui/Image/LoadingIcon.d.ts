/// <reference types="react" />
import type { IconNameType } from '../../assets';
import type { ImageProps } from './Image';
export type LoadingIconResolutionType = '' | '2x' | '3x';
export type LoadingIconProps = Omit<ImageProps, 'source' | 'failedSource'> & {
    name?: IconNameType | number;
    resolution?: LoadingIconResolutionType;
    isStop?: boolean;
};
export declare function LoadingIcon(props: LoadingIconProps): JSX.Element;
//# sourceMappingURL=LoadingIcon.d.ts.map