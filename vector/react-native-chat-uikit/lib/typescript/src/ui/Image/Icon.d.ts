/// <reference types="react" />
import type { IconNameType } from '../../assets';
import { type ImageProps } from './Image';
import type { IconResolutionType } from './types';
export type IconProps = Omit<ImageProps, 'source' | 'failedSource'> & {
    name: IconNameType | number;
    resolution?: IconResolutionType;
};
export declare function Icon(props: IconProps): JSX.Element;
//# sourceMappingURL=Icon.d.ts.map