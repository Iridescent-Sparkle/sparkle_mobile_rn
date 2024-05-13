/// <reference types="react" />
import { ImageSourcePropType, ImageStyle, StyleProp, ViewStyle } from 'react-native';
export type ImagePreviewProps = {
    source: ImageSourcePropType;
    containerStyle?: ViewStyle;
    onClicked?: () => void;
    onDupClicked?: () => void;
    onLongPress?: () => void;
    imageStyle?: StyleProp<ImageStyle>;
};
/**
 * Image preview component.
 *
 * ** Under the android platform, scaling is not possible. **
 */
export declare function ImagePreview(props: ImagePreviewProps): JSX.Element;
/**
 * Image preview component.
 */
export declare function ImagePreview2(props: ImagePreviewProps): JSX.Element;
//# sourceMappingURL=ImagePreview.d.ts.map