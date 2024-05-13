import * as React from 'react';
import { ImageStyle, StyleProp, ViewStyle } from 'react-native';
import type { IconNameType } from '../../assets';
type EmojiListFloatButtonProps = {
    isVisible: boolean;
    onClicked: () => void;
    iconName: IconNameType;
    style?: StyleProp<ImageStyle>;
    containerStyle?: StyleProp<ViewStyle>;
};
export declare function EmojiListFloatButton(params: EmojiListFloatButtonProps): JSX.Element;
export declare const EmojiListFloatButtonMemo: React.MemoExoticComponent<typeof EmojiListFloatButton>;
export {};
//# sourceMappingURL=EmojiListFloatButton.d.ts.map