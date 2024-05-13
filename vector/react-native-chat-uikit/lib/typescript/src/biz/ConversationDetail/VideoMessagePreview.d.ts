import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Video, { LoadError } from 'react-native-video';
import type { PropsWithBack } from '../types';
/**
 * Video Message Preview Component properties.
 */
export type VideoMessagePreviewProps = PropsWithBack & {
    /**
     * Message id.
     */
    msgId: string;
    /**
     * local message id.
     */
    localMsgId: string;
    /**
     * Container style for the file preview component.
     */
    containerStyle?: StyleProp<ViewStyle>;
};
/**
 * Video Message Preview Component.
 */
export declare function VideoMessagePreview(props: VideoMessagePreviewProps): JSX.Element;
type ImageSize = {
    width: number;
    height: number;
};
export declare function useVideoMessagePreview(props: VideoMessagePreviewProps): {
    url: string | undefined;
    size: ImageSize;
    videoRef: React.RefObject<Video>;
    onVideoError: (error: LoadError) => void;
    onClickedVideo: () => void;
    showLoading: boolean;
    thumbnailUrl: string | undefined;
    onEnd: () => void;
    pause: boolean;
};
export {};
//# sourceMappingURL=VideoMessagePreview.d.ts.map