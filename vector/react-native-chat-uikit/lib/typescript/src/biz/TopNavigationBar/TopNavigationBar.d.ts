/// <reference types="react" />
import type { IconNameType } from '../../assets';
import type { TopNavigationBarProps } from './types';
/**
 * Top Navigation Bar Component.
 *
 * This component is usually displayed at the top of the page-level component, with a left-center-right layout. It generally provides a return button on the left, a title in the middle, and an expand button on the right.
 */
export declare function TopNavigationBar<LeftProps = any, RightProps = any>(props: TopNavigationBarProps<LeftProps, RightProps>): JSX.Element;
/**
 * The component on the right side of the navigation bar.
 */
export declare function TopNavigationBarRight({ onClicked, iconName, }: {
    onClicked?: () => void;
    iconName: IconNameType;
}): JSX.Element;
export declare function TopNavigationBarRightList({ onClickedList, iconNameList, }: {
    onClickedList: (() => void)[];
    iconNameList: IconNameType[];
}): JSX.Element;
/**
 * The component on the middle side of the navigation bar.
 */
export declare function TopNavigationBarTitle({ text }: {
    text: string;
}): JSX.Element;
//# sourceMappingURL=TopNavigationBar.d.ts.map