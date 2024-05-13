/// <reference types="react" />
import type { IconNameType } from '../../assets';
import { type ButtonProps } from './Button';
export type CmnButtonProps = Omit<ButtonProps, 'buttonStyle'>;
export declare function CmnButton(props: CmnButtonProps): JSX.Element;
export type CmnIconButtonProps = Omit<CmnButtonProps, 'contentType' | 'icon'> & {
    icon: IconNameType;
};
export declare function CmnIconButton(props: CmnIconButtonProps): JSX.Element;
//# sourceMappingURL=CmnButton.d.ts.map