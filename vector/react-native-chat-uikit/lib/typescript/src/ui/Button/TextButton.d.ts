/// <reference types="react" />
import type { IconNameType } from '../../assets';
import { type ButtonProps } from './Button';
export type Text1ButtonProps = Omit<ButtonProps, 'buttonStyle'>;
export declare function Text1Button(props: Text1ButtonProps): JSX.Element;
export type Text2ButtonProps = Omit<ButtonProps, 'buttonStyle'>;
export declare function Text2Button(props: Text2ButtonProps): JSX.Element;
export type Text1IconButtonProps = Omit<Text1ButtonProps, 'contentType' | 'icon'> & {
    icon: IconNameType;
};
export declare function Text1IconButton(props: Text1IconButtonProps): JSX.Element;
export type Text2IconButtonProps = Omit<Text2ButtonProps, 'contentType' | 'icon'> & {
    icon: IconNameType;
};
export declare function Text2IconButton(props: Text2IconButtonProps): JSX.Element;
//# sourceMappingURL=TextButton.d.ts.map