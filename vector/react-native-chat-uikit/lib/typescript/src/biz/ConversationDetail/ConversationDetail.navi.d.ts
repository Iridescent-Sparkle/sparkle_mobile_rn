/// <reference types="react" />
/// <reference types="react" />
import { TopNavigationBarElementType } from '../TopNavigationBar';
type _ConversationDetailNavigationBarProps<LeftProps, RightProps> = {
    convId: string;
    convName?: string;
    convAvatar?: string;
    onBack?: (data?: any) => void;
    onClickedAvatar?: () => void;
    NavigationBar?: TopNavigationBarElementType<LeftProps, RightProps>;
    doNotDisturb?: boolean;
};
export declare const ConversationDetailNavigationBar: <LeftProps, RightProps>(props: _ConversationDetailNavigationBarProps<LeftProps, RightProps>) => JSX.Element;
export {};
//# sourceMappingURL=ConversationDetail.navi.d.ts.map