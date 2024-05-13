import * as React from 'react';
import type { IconNameType } from '../../assets';
import { type ImageProps } from './Image';
import type { IconResolutionType } from './types';
export declare const gFrameInterval = 330;
export type DynamicIconRef = {
    startPlay: () => void;
    stopPlay: () => void;
};
export type DynamicIconProps = Omit<ImageProps, 'source' | 'failedSource'> & {
    propsRef?: React.RefObject<DynamicIconRef>;
    names: (IconNameType | number)[];
    resolution?: IconResolutionType;
    /**
     * Animation playback interval, in milliseconds.
     */
    frameInterval?: number;
    /**
     * Whether to loop playback, default is -1.
     */
    loopCount?: number;
    /**
     * The index of the initial playback frame, the default is 0.
     */
    initialIndex?: number;
    onPlayStart?: () => void;
    onPlayFinished?: () => void;
};
export declare function DynamicIcon(props: DynamicIconProps): JSX.Element;
//# sourceMappingURL=DynamicIcon.d.ts.map