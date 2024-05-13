import * as React from 'react';
import { Image as RNImage, ImageSourcePropType } from 'react-native';
import type { ImageProps } from './Image';
type ClassImageState = {
    _source: ImageSourcePropType;
};
export declare class ClassImage extends React.PureComponent<ImageProps, ClassImageState> {
    ref: React.RefObject<RNImage>;
    constructor(props: ImageProps);
    render(): React.ReactNode;
}
export {};
//# sourceMappingURL=Image.class.d.ts.map