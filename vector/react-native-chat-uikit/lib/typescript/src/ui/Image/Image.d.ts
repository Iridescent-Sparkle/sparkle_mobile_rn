import * as React from 'react';
import { ImageProps as RNImageProps, ImageSourcePropType } from 'react-native';
export type ImageProps = Omit<RNImageProps, 'source'> & {
    source: ImageSourcePropType;
    failedSource?: ImageSourcePropType;
};
/**
 * It mainly adds the function of native component `RNImage` to use the default image after loading failure.
 *
 * !!! If your image source (source attribute) is null or invalid, onError may not be called. You should ensure that your image source is a valid URL or a local image obtained through the require function.
 */
export declare function Image(props: ImageProps): JSX.Element;
export declare const ImageMemo: React.MemoExoticComponent<typeof Image>;
//# sourceMappingURL=Image.d.ts.map