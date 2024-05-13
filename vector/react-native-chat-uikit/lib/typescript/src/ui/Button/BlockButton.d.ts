import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import type { IconNameType } from '../../assets';
export type BlockButtonProps = {
    onPress?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    iconName: IconNameType;
    text: string;
    preventHighFrequencyClicks?: boolean;
    frequencyInterval?: number;
};
export declare function BlockButton(props: BlockButtonProps): JSX.Element;
export type BlockButtonComponentType = React.ComponentType<BlockButtonProps> | React.ExoticComponent<BlockButtonProps>;
//# sourceMappingURL=BlockButton.d.ts.map