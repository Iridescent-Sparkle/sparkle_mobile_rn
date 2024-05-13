import * as React from 'react';
import type { ImageStyle, PressableProps, StyleProp, ViewStyle } from 'react-native';
import type { IconNameType } from '../../assets';
import { ButtonStateColor } from '../../theme';
import type { PartialDeep } from '../../types';
import { IconResolutionType } from '../Image';
export type IconButtonProps = Pick<PressableProps, 'onPress' | 'disabled'> & {
    style?: StyleProp<ImageStyle> | undefined;
    containerStyle?: StyleProp<ViewStyle> | undefined;
    iconName: IconNameType;
    preventHighFrequencyClicks?: boolean;
    frequencyInterval?: number;
    buttonStateColors?: PartialDeep<ButtonStateColor>;
    iconResolution?: IconResolutionType;
};
export declare function IconButton(props: IconButtonProps): JSX.Element;
export declare const IconButtonMemo: React.MemoExoticComponent<typeof IconButton>;
//# sourceMappingURL=IconButton.d.ts.map