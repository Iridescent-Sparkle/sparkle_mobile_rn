import * as React from 'react';
import type { ViewStyle } from 'react-native';
import type { StyleProp } from 'react-native';
export type ScalableProps = React.PropsWithChildren<{
    containerStyle?: StyleProp<ViewStyle>;
    onDoubleClicked?: () => void;
    onOneClicked?: () => void;
}>;
export declare function Scalable(props: ScalableProps): JSX.Element;
//# sourceMappingURL=Scalable.d.ts.map