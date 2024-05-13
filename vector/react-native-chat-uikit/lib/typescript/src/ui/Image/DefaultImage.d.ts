/// <reference types="react" />
import { ImageSourcePropType, ImageStyle, ImageURISource, StyleProp, ViewStyle } from 'react-native';
import { ImageProps } from './Image';
export type DefaultImageProps = Omit<ImageProps, 'source' | 'defaultSource'> & {
    defaultSource: ImageSourcePropType;
    source: ImageURISource;
    defaultStyle?: StyleProp<ImageStyle>;
    defaultContainerStyle?: StyleProp<ViewStyle>;
    containerStyle?: StyleProp<ViewStyle>;
};
/**
 * It mainly adds the function of native component `Image` and preloading the default image.
 */
export declare function DefaultImage(props: DefaultImageProps): JSX.Element;
export type DefaultImageProps2 = Omit<ImageProps, 'source'> & {
    source: ImageURISource;
};
/**
 * The Android platform cannot display default images properly.
 */
export declare function DefaultImage2(props: DefaultImageProps2): JSX.Element;
//# sourceMappingURL=DefaultImage.d.ts.map