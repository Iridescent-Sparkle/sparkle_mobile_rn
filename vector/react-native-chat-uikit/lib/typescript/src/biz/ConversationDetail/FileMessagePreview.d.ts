/// <reference types="react" />
import { StyleProp, ViewStyle } from 'react-native';
import type { PropsWithBack, PropsWithChildren } from '../types';
/**
 * File Message Preview Component properties.
 */
export type FileMessagePreviewProps = PropsWithBack & PropsWithChildren & {
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
    /**
     * File download callback notification.
     *
     * @param progress [0, 100]
     * @returns void
     */
    onProgress?: (progress: number) => void;
};
/**
 * File Message Preview Component.
 */
export declare function FileMessagePreview(props: FileMessagePreviewProps): JSX.Element;
//# sourceMappingURL=FileMessagePreview.d.ts.map