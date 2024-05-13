/// <reference types="react" />
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import type { IconNameType } from '../../assets';
import { IconResolutionType } from '../../ui/Image';
type ButtonInitState = 'enabled' | 'disabled' | 'warned';
export type BottomSheetMenuItemProps = {
    /**
     * suggestion: seqId('_bsm').toString()
     */
    id: string;
    initState: ButtonInitState;
    text: string;
    iconName?: IconNameType;
    onPress?: () => void;
    preventHighFrequencyClicks?: boolean;
    frequencyInterval?: number;
    iconResolution?: IconResolutionType;
    containerStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
};
export declare function BottomSheetMenuItem(props: BottomSheetMenuItemProps): JSX.Element;
export {};
//# sourceMappingURL=BottomSheetMenu.item.d.ts.map