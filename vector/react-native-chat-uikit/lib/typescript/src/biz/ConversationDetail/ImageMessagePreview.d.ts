/// <reference types="react" />
import { StyleProp, ViewStyle } from 'react-native';
import type { PropsWithBack, PropsWithError } from '../types';
/**
 * Image Message Preview Component properties.
 */
export type ImageMessagePreviewProps = PropsWithBack & PropsWithError & {
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
 * Image Message Preview Component.
 */
export declare function ImageMessagePreview(props: ImageMessagePreviewProps): JSX.Element;
type ImageSize = {
    width: number;
    height: number;
};
export declare function useImageMessagePreview(props: ImageMessagePreviewProps): {
    url: string | undefined;
    size: ImageSize;
};
export {};
//# sourceMappingURL=ImageMessagePreview.d.ts.map