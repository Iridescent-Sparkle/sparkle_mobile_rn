import * as React from 'react';
export declare const BottomVoiceBar: React.ForwardRefExoticComponent<import("../types").PropsWithError & import("../types").PropsWithTest & {
    height?: number | undefined;
    onClickedRecordButton?: ((state: import("./types").VoiceBarState) => void) | undefined;
    onClickedClearButton?: (() => void) | undefined;
    onClickedSendButton?: ((voice: import("../ConversationDetail").SendVoiceProps) => void) | undefined;
    onFailed?: ((error: {
        reason: string;
        error: any;
    }) => void) | undefined;
    onState?: ((state: import("./types").VoiceBarState) => void) | undefined;
} & Pick<import("../../ui/Modal").SlideModalProps, "onRequestModalClose"> & React.RefAttributes<import("../../ui/Modal").ModalRef>>;
//# sourceMappingURL=BottomVoiceBar.d.ts.map